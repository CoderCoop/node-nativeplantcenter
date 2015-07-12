"use strict"
var util = require('util');
var request = require('request');
var jp = require('jsonpath');
var debug=false;
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser		


// create main function object
function npc (){}

// define function method for keyword search
npc.prototype.keyword = function(keyword, callback) {

  // build yql & nativeplantcenter query
  var url_template = 'http://query.yahooapis.com/v1/public/yql?q=%s&format=xml';
  var yql_template = 'select * from html where url="http://www.nativeplantcenter.net/?q=database&count=-1&keyword=%s" and xpath=\'%s\'';
  var myxpath = '//div[contains(@class,"database_entry  matrix_entry")]';
  
 
  var yql = util.format(yql_template,keyword,myxpath);
  var url = util.format(url_template,encodeURIComponent(yql));

//console.log(url);

  request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {


      var doc = new dom().parseFromString(body);
   
   
      var nodes = xpath.select('//div[@class="matrix_entry_title"]/a/text()', doc);

//      console.log(nodes);
      console.log(nodes[0].toString());

//      callback(nodes);


/*
var xml = "<book><title>Harry Potter</title></book>";
var doc = new dom().parseFromString(xml);
var nodes = xpath.select("//title", doc);


callback(nodes[0].localName);

console.log(nodes[0].localName + ": " + nodes[0].firstChild.data)
console.log("node: " + nodes[0].toString())
*/

       
       
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
