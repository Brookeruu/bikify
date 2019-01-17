class HarvardSearch {

  getHarvardImages(bikeSize, bikeArray) {
    return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.harvardartmuseums.org/image?page=1&size=${bikeSize}&apikey=${process.env.HARVARD_API_KEY}`;

    request.onload = function() {
      if (this.status === 200) {
        resolve([request.response, bikeArray]);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
  }
}

export { HarvardSearch };
