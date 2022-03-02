import { Meal } from "../models/meals.js"

function newMeal(req, res){
  Meal.find({}, (error, meals)=>{
    console.log(meals);
    res.render("meals/new", {
      title: "Add Meal",
      meals
    });
  });
}

function create(req, res){
  console.log(1);
}

export {
  newMeal as new,
  create
}