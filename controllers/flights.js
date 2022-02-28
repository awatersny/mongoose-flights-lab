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
  // 2022-05-19T19:00
  // 
  req.body.departs = req.body.departs.replace('T', ' ');

  const flight = new Flight(req.body);
  console.log(flight);

  flight.save(err => {
    if(err){
      return res.redirect('/flights/new');
    }
    res.redirect('/flights');
  });
}

export {
  index,
  newFlight as new,
  create
}