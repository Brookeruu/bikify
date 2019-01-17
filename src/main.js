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
        let pic;
        if(bike.thumb != null) {
          pic = bike.thumb;
        }

        $('#showResults').append(`
        <div class="card d-inline-flex">
          <img src="${bike.thumb}" alt="Card image cap">
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


// $('#theseBikes').append(`<li>${bike.title} ID: ${bike.id} Type: ${bike.title} Manufacturer: ${bike.manufacturer} Year: ${bike.year}</li>`)

// <div class="card">
//   <img src="${bike.thumb}" alt="Card image cap">
//   <div class="card-body">
//     <h5 class="card-title">${bike.title}</h5>
//     <p class="card-text">
//     <ul>
//     <li> ID: ${bike.id}</li>
//     <li> Manufacturer: ${bike.manufacturer}</li>
//     <li>Year: ${bike.year}</li>
//     </ul>
//     </p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>
