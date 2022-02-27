import { Flight } from "../models/flight.js";

function index(req, res) {
  Flight.find({}, (error, flights)=>{
    res.render("flights/index", {
      error: error,
      flights: flights
    });
  });
}

function newFlight(req, res) {
  res.render("flights/new");
}

function create(req, res) {
  console.log(Flight);
}

export {
  index,
  newFlight as new,
  create
}