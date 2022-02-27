import { Flight } from "../models/flight.js";

function index(req, res) {
  res.render("flights/index");
}

function newFlight(req, res) {
  res.render("flights/new");
}

function create(req, res) {
  console.log(1);
}

export {
  index,
  newFlight as new,
  create
}