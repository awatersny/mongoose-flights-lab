import { Flight } from "../models/flight.js";
import { Meal } from "../models/meal.js"

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

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, (error, flight)=>{
    res.redirect('/flights')
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
  Flight.findById(req.params.id)
    .populate('meals')
    .exec((error, flight)=>{
      Meal.find({_id: {$nin: flight.meals}}, (error, meals)=>{
        console.log(meals)
        res.render("flights/show", {
          title: "Flight Details",
          flight: flight,
          meals: meals
        });
      });
    })
}

function addToMeal(req, res){
  Flight.findById(req.params.id, (error, flight)=>{
    flight.meals.push(req.body.mealId);
    flight.save(error=>{
      res.redirect(`/flights/${flight._id}`);
    });
  })
}

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  createTicket,
  show,
  addToMeal
}