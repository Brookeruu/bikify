import { BikeSearch } from './bikesearch';
import missingBike from '../images/bike-image.png';
import { HarvardSearch } from './harvardsearch';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function cardClickListener() {
  $('.card').on("click", "p", function() {
    console.log(this.id);
  })
}

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


      return harvardSearch.getHarvardImages(bikeSize, body.bikes);
    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    })
    .then(function(response) {
      let body = JSON.parse(response[0]);
      let harvardRecords = body.records;
      let bikeArray = response[1];
      console.log(body);
      console.log(body.records);
      console.log(bikeArray);

      let imageBikeArray = [];

      for(let i = 0; i < harvardRecords.length; i++) {
        imageBikeArray.push([harvardRecords[i], bikeArray[i]]);
      }

      for(let j = 0; j < imageBikeArray.length; j++) {
        let bikeImage;
        if(imageBikeArray[j][1].thumb === null) {
          bikeImage = missingBike;
        } else {
          bikeImage = imageBikeArray[j][1].thumb;
        }

        $('#showResults').append(`
          <div class="card d-inline-flex" id="${imageBikeArray[j][1].id}">
            <img src="${bikeImage}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${imageBikeArray[j][1].title}</h5>
              <ul>
                <li> ID: ${imageBikeArray[j][1].id}</li>
                <li> Manufacturer: ${imageBikeArray[j][1].manufacturer}</li>
                <li>Year: ${imageBikeArray[j][1].year}</li>
              </ul>

              <a href="https://bikeindex.org/bikes/${imageBikeArray[j][1].id}" class="btn btn-primary" id="${imageBikeArray[j][1].id}" target='blank'>View</a>
              <p>Flip Card</p>
            </div>
          </div>

          <div class="card d-inline-flex harvard" id="${imageBikeArray[j][0].imageid}">
            <div class="card-body">
              <img src="${imageBikeArray[j][0].baseimageurl}" alt="Card image cap" class="havardImage">
              <p>Flip Card</p>
            </div>
          </div>

          `);
      }


    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });

  });
});
