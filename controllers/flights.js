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
  const flight = new Flight(req.body);
  console.log(flight);
}

export {
  index,
  newFlight as new,
  create
}