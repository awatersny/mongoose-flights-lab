import { Meal } from "../models/meals.js"

function newMeal(req, res){
  res.render("meals/new", {
    title: "Add Meal"
  });
}

export {
  newMeal as new
}