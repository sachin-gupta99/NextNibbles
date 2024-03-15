import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

const getAllMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
};

const getMealItem = (slug) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
};

const saveMeal = (meal) => {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const stmt = db.prepare(
    "INSERT INTO meals (slug, title, summary, instructions, image) VALUES (?, ?, ?, ?, ?)"
  );
  stmt.run(
    slug,
    xss(meal.title),
    xss(meal.summary),
    xss(meal.instructions),
    xss(meal.image)
  );
}

export { getAllMeals, getMealItem, saveMeal };
