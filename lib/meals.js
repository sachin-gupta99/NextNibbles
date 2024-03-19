import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const db = sql("meals.db");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const getImageURL = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
};

const getAllMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const dd = db.prepare("SELECT * FROM meals").all();

  for (let i = 0; i < dd.length; i++) {
    dd[i].image = await getImageURL(dd[i].image);
  }
  return dd;
};

const getMealItem = async (slug) => {
  const dd = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
  dd.image = await getImageURL(dd.image);
  return dd;
};

const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();

  const uploadImageToS3 = async (bufferedImage, fileName) => {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `meal-images/${fileName}`,
      Body: bufferedImage,
      ContentType: `image/${extension}`,
    });

    await s3Client.send(command);
  };

  await uploadImageToS3(Buffer.from(bufferedImage), fileName);
  meal.image = `meal-images/${fileName}`;

  db.prepare(
    `INSERT INTO meals (slug, title, summary, instructions, image, creator, creator_email) VALUES (
      @slug,
      @title,
      @summary,
      @instructions,
      @image,
      @creator,
      @creator_email
    )`
  ).run(meal);
};

export { getAllMeals, getMealItem, saveMeal };
