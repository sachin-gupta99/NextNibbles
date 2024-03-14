import React from "react";
import classes from "./loading.module.css";

const loadingMealsPage = () => {
  return <p className={classes["loading"]}>Loading the meals...</p>;
};

export default loadingMealsPage;
