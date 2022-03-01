import { Flight } from "../models/flight.js";

function index(req, res) {
  Flight.find({}, (error, flights)=>{
    res.render("flights/index", {
      error: error,
      flights: flights,
      title: "All Flights"
    });
  }).sort({
    departs: 'asc', 
    test: -1
  });
}

function newFlight(req, res) {
  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', {
    departsDate,
    title: "Add Flight"
  });
}

function create(req, res) {
  // 2022-05-19T19:00
  // 
  req.body.departs = req.body.departs.replace('T', ' ');

  const flight = new Flight(req.body);

  flight.save(error => {
    if(error){
      return res.redirect('/flights/new');
    }
    res.redirect('/flights');
  });
}

function createTicket(req, res){
  Flight.findById(req.params.id, (error, flight)=>{
    flight.tickets.push(req.body);
    flight.save(error=>{
      res.redirect(`/flights/${flight._id}`);
    });
  });
}

function show(req, res) {
  Flight.findById(req.params.id, (error, flight)=>{
    res.render("flights/show", {
      error: error,
      flight: flight,
      title: "Flight Details"
    });
  });
}

export {
  index,
  newFlight as new,
  create,
  createTicket,
  show
}