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
  var url_template = 'http://query.yahooapis.com/v1/public/yql?q=%s&format=json';
  var yql_template = 'select * from html where url="http://www.nativeplantcenter.net/?q=database&count=-1&keyword=%s" and xpath=\'%s\'';
  var xpath = '//div[contains(@class,"database_entry  matrix_entry")]';
  
  
  var yql = util.format(yql_template,keyword,xpath);
  var url = util.format(url_template,encodeURIComponent(yql));

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
