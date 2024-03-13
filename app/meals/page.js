import React from "react";
import Link from "next/link";

import classes from "./page.module.css";
import MealGrid from "@/components/meals/meal-grid";

const MealsPage = () => {
  return (
    <>
      <header className={classes["header"]}>
        <h1>Delicious Meals</h1>
        <p>
          Choose your favorite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home.
        </p>
        <p className={classes["cta"]}>
          <Link href="/meals/share">Share your favourite meals</Link>
        </p>
      </header>
      <main className={classes["main"]}>
        <MealGrid meals={[]} />
      </main>
    </>
  );
};

export default MealsPage;
