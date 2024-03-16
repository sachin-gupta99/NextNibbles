import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "fs";

const db = sql("meals.db");

const getAllMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
};

const getMealItem = (slug) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
};

const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      console.error(error);
    }
    // stream.end();
  });

  meal.image = `/images/${fileName}`;

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
}

export { getAllMeals, getMealItem, saveMeal };
