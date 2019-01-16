import { BikeSearch } from './bikesearch';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $('#search').submit(function(event) {
    event.preventDefault();
    let searchTerm = $('#bike').val();

    let bikeSearch = new BikeSearch();
    let promise = bikeSearch.getAllBikes(searchTerm);

    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
      console.log(body.bikes[0].title);
      $('#theseBikes').empty();
      body.bikes.forEach(function(bike) {
        $('#theseBikes').append(`<li>${bike.title} ID: ${bike.id} Type: ${bike.title} Manufacturer: ${bike.manufacturer} Year: ${bike.year}</li>`);
      });

    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
