import { Flight } from "../models/flight.js";

function index(req, res) {
  res.render("flights/index");
}

function newFlight(req, res) {
  res.render("flights/new");
}

export {
  index,
  newFlight as new
}