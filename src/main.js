import { BikeSearch } from './bikesearch';
import missingBike from '../images/bike-image.png';
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

      body.bikes.forEach(function(bike) {
        let pic;
        if(bike.thumb === null) {
          pic = missingBike;
        } else {
          pic = bike.thumb;
        }

        $('#showResults').append(`
        <div class="card d-inline-flex">
          <img src="${pic}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${bike.title}</h5>
            <p class="text"></p>
            <ul>
            <li> ID: ${bike.id}</li>
            <li> Manufacturer: ${bike.manufacturer}</li>
            <li>Year: ${bike.year}</li>
            </ul>

            <a href="https://bikeindex.org/bikes/${bike.id}" class="btn btn-primary" id="${bike.id}">Go somewhere</a>
          </div>
        </div>
        `);
      });

    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});

// let pic;
// if(bike.thumb != null) {
//   pic = bike.thumb;
// } else {
//   pic = "img/bike-image.png";
// }
