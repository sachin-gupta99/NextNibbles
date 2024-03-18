import React from "react";
import classes from "./page.module.css";
import Image from "next/image";
import { getMealItem } from "@/lib/meals";
import { notFound } from "next/navigation";

export const generateMetadata = async ({params}) => {
  const meal = await getMealItem(params.slug);
  if (!meal) {
    return notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
};

const MealItemPage = async ({ params }) => {
  const meal = await getMealItem(params.slug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes["header"]}>
        <div className={classes["image"]}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes["headerText"]}>
          <h1>{meal.title}</h1>
          <p className={classes["creator"]}>
            by{" "}
            <a href={`mailto: ${meal.creator_email}`} target="_blank">
              {meal.creator}
            </a>
          </p>
          <p className={classes["summary"]}>{meal.summary}</p>
        </div>
      </header>
      <main className={classes["main"]}>
        <p
          className={classes["instructions"]}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
};

export default MealItemPage;
