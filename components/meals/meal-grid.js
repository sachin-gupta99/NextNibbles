import React from "react";

import classes from "./meal-grid.module.css";
import MealItem from "./meal-item";

const MealGrid = ({ meals }) => {
  return (
    <ul className={classes["meals"]}>
      {meals.map((meal) => (
        <li key={meal.id} className={classes["meal"]}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};

export default MealGrid;
