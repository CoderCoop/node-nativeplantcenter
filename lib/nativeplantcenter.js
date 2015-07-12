"use strict"
var util = require('util');
var request = require('request');
var jp = require('jsonpath');
var debug=false;

// create main function object
function npc (){}

// define function method for keyword search
npc.prototype.keyword = function(keyword, callback) {

  // build yql & nativeplantcenter query
  var apitemplate = 'http://query.yahooapis.com/v1/public/yql?q=@yqlquery&format=json';
  var yqlquery = encodeURIComponent('select * from html where url="http://www.nativeplantcenter.net/?q=database&count=-1&keyword='+keyword+'" and xpath=\'//div[contains(@class,"database_entry  matrix_entry")]\'');    
  var url = apitemplate.replace("@yqlquery",yqlquery);

/*
  var url = "http://www.nativeplantcenter.net/?q=database&count=-1&keyword=";
  var xpath = '//div[contains(@class,"database_entry  matrix_entry")]'
  var template = "select * from html where url='%s%s' and xpath='%s'"
  var query = util.format(template,url,keyword,xpath);
*/


request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body)
      callback(data);
    }
})


};

// define method for processing search data
npc.prototype.processSearchData = function(data) {

  var outputData = {}; // initialize object for output

request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body)
      callback(data);
    }
})


}

module.exports = npc;

// exports.keyword = keywordSearch;
