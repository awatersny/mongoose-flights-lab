import { Meal } from "../models/meal.js"

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
  Meal.create(req.body, (error, meal)=>{
    res.redirect("/meals/new");
  });
}

export {
  newMeal as new,
  create
}