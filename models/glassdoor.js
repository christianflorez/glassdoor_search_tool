const request = require('request');

class Glassdoor {
  constructor(ip, useragent) {
    this.baseUri = `http://api.glassdoor.com/api/api.htm?t.p=${process.env.GLASSDOOR_API_PID}&t.k=${process.env.GLASSDOOR_API_KEY}&userip=${ip}&useragent="${useragent}"&format=json&v=1&action=employers`;
  }

  getEmployersByZip(zipcode, pageNumber, callback) {
    var path = this.baseUri + `&l=${zipcode}&pn=${pageNumber}`;
    this._sendRequest(path, callback);
  }

  _sendRequest(path, callback) {
    var url = path;
    console.log(url);
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(JSON.parse(body).response);
      }
    });
  }
}

module.exports = Glassdoor;