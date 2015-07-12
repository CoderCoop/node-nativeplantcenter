"use strict"
var util = require('util');
var YQL = require('yql');
var debug=false;
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;

// create main function object
function npc (){}

// define function method for keyword search
npc.prototype.keyword = function(keyword, callback) {

  var url = "http://www.nativeplantcenter.net/?q=database&count=-1&keyword=";
  var xpath = '//div[contains(@class,"database_entry  matrix_entry")]'
  var template = "select * from html where url='%s%s' and xpath='%s'"
  var query = util.format(template,url,keyword,xpath);

  new YQL.exec(query, function (response) {
    if (response.error) {
      console.log("Error: " + response.error.description);
    }
    else {
      if (response.query.results == null) {
        console.log("Error: no search results");
      }
      else {
//        console.log(JSON.stringify(response.query.results,null,"  ")); // debug
        // call the callback with the processed search data
//        callback(npc.prototype.processSearchData(response.query.results));
        
//    callback(response.query.results);
       
    var xml = parser.toXml(response.query.results);
    var doc = new dom().parseFromString(xml)
    callback(doc);
    
    
 /*
    var xml = "<book><title>Harry Potter</title></book>"
    var doc = new dom().parseFromString(xml)
    var nodes = xpath.select("//title", doc)
        */
      }
    }
  });
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
