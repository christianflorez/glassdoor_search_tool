const express = require('express');
const ip = require('ip');
const Glassdoor = require('../models/glassdoor.js');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (JSON.stringify(req.query) === "{}"){
    res.render('index');
  } else {
    let pageNumber = req.query.pageNumber || 1;
    let nextPage = parseInt(pageNumber) + 1;
    let prevPage = pageNumber === 1 ? 1 : parseInt(pageNumber) - 1;
    let userIP = ip.address();
    let useragent = req.headers["user-agent"];
    let zipcode = req.query.zipCode;
    let glassdoor = new Glassdoor(userIP, useragent);

    glassdoor.getEmployersByZip(zipcode, pageNumber, (data) => {
      results = [];
      data.employers.forEach((employer) => {
        if (employer.numberOfRatings >= 100 && employer.overallRating >= 4.0) {
          results.push(employer);
        }
      });
      console.log(data.employers[0]);
      res.render('zipcode', {
        pageNumber: pageNumber,
        nextPage: nextPage,
        prevPage: prevPage,
        zipcode: zipcode,
        employers: results
      });
    });
  }
});

module.exports = router;
