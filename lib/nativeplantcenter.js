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

  // handle case of only 1 result
  if (typeof data.div[0] === 'undefined') {  
    data.div = new Array(data.div); // stuff div into an array
  }

  // iterate through each result
  data.div.map(function (div) {
    
    // build entry values from div data
    var entry = {
      "url" : jp.query(div, '$..div[?(@.class=="database_entry_title")].a.href')[0],
      "thumb" : jp.query(div, '$..div[?(@.class=="database_entry_image")].a.img.src')[0], //thumbnail image
      "species" : jp.query(div, '$..div[?(@.class=="database_entry_title")].a.content')[0], //scientific name
      "name" : jp.query(div, '$..div[?(@.class=="matrix_entry_subtitle")].content')[0], //common name
      "commonNames" : jp.query(div, '$..div[?(@.span=="Common Name")].a.content')[0], // all common names
      "plantTypes" : jp.query(div, '$..div[?(@.span=="Plant Type")].content')[0], // plant types
      "sunExposure" : jp.query(div, '$..div[?(@.span=="Sun Exposure")].content')[0], // sun exposure
      "soilTexture" : jp.query(div, '$..div[?(@.span=="Soil Texture")].content')[0], // soil texture
      "soilMoisture" : jp.query(div, '$..div[?(@.span=="Soil Moisture")].content')[0], // soil moisture
      "region" : jp.query(div, '$..div[?(@.span=="Region")].content')[0], // region
    };
    
//    console.log(entry); // debug

    // full size image
    entry.img = entry.thumb.replace("thumbs/","");

    // extract numeric plant id from url
    var plantid = entry.url.split("/").pop(); 
    var entryFix = {};

    // remove leading punctuation
    Object.keys(entry).forEach(function (key) {
      entry[key]=entry[key].replace(":  , ","");
      entry[key]=entry[key].replace(": ","");
    });

    // save entry into outputData array
    outputData[plantid]=entry;
  });
  
  if (debug){jsondebug(outputData);}
  return outputData;
};

function jsondebug (v) {
  console.log(JSON.stringify(v,null,"  "));
}

module.exports = npc;

// exports.keyword = keywordSearch;
