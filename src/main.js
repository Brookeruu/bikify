import { BikeSearch } from './bikesearch';
import missingBike from '../images/bike-image.png';
import { HarvardSearch } from './harvardsearch';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $('#search').submit(function(event) {
    event.preventDefault();

    let searchTerm = $('#bike').val();
    $('#showResults').empty();

    let bikeSearch = new BikeSearch();
    let bikePromise = bikeSearch.getAllBikes(searchTerm);

    let harvardSearch = new HarvardSearch();

    bikePromise.then(function(response) {
      let body = JSON.parse(response);
      let bikeSize = body.bikes.length;

      body.bikes.forEach(function(bike) {
        let pic;
        if(bike.thumb === null) {
          pic = missingBike;
        } else {
          pic = bike.thumb;
        }

        $('#showResults').append(`
        <div class="card d-inline-flex" id="${bike.id}">
          <img src="${pic}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${bike.title}</h5>
            <p class="text"></p>
            <ul>
            <li> ID: ${bike.id}</li>
            <li> Manufacturer: ${bike.manufacturer}</li>
            <li>Year: ${bike.year}</li>
            </ul>

            <a href="https://bikeindex.org/bikes/${bike.id}" class="btn btn-primary" id="${bike.id}" target='blank'>View</a>
          </div>
        </div>
        `);
      });
      return harvardSearch.getHarvardImages(bikeSize);
    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    })
    .then(function(response) {
      let body = JSON.parse(response);

      body.records.forEach(function(record) {
        let pic;
        if(record.baseimageurl === null) {
          pic = missingBike;
        } else {
          pic = record.baseimageurl;
        }

        $('#showResults').append(`
        <div class="card d-inline-flex">
          <div class="card-body">
            <img src="${pic}" alt="Card image cap" class="havardImage">
          </div>
        </div>
        `);
      });
    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });


  });
});
