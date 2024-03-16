"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export const shareMeal = async (formData) => {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  const validate = Object.values(meal).every((value) => {
    return value !== "" || value !== null || value !== undefined;
  });
  
  if(!validate || !meal.image || meal.image.size === 0) {
    return {
        message: "Please fill out all fields and upload an image.",
    }
  }

  await saveMeal(meal);
  redirect("/meals");
};
