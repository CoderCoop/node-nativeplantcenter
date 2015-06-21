"use strict"
var util = require('util');
var YQL = require('yql');
var jp = require('jsonpath');
var debug=false;

function npc (){}

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
//        console.log(JSON.stringify(response.query.results,null,"  "));
        
        callback(npc.prototype.processSearchData(response.query.results));
      }
    }
  });
};

npc.prototype.processSearchData = function(data) {

//console.log(JSON.stringify(data));

  var outputData = {}; //initialize object

  // handle case of only 1 result
  if (typeof data.div[0] === 'undefined') {  
    data.div = new Array(data.div); // stuff div into an array
  }

  //iterate through each result          
  data.div.map(function (div) {
    
    // create object to hold result data
    // assign values from json
//    var entry = jp.query(div, '$..div[?(@.class="database_entry_info")]');
//    var entry = jp.query(div, '$..a.href');
//var entry = jp.query(div, '$..div[0].a.href');

// jp.query(div, '$..div[?(@.class=="database_entry_image")]')
var entry = {

  "url" : jp.query(div, '$..div[?(@.class=="database_entry_title")].a.href')[0],
  "commonNames" : jp.query(div, '$..div[?(@.span=="Common Name")].a.content')[0],


/*
      "url" : div.div[3].div.div[0].a.href, //plant url
      "thumb" : div.div[0].a.img.src, //thumbnail image
      "img" : div.div[0].a.img.src.replace("thumbs/",""), //full size image
      "species" : div.div[1].a.content, //scientific name
      "name" : div.div[2].p, //common name  
      "commonNames" : div.div[3].div.div[1].p.content, // all common names
      "plantTypes" : div.div[3].div.div[2].p, // plant types
      "sunExposure" : div.div[3].div.div[3].p, // sun exposure
      "soilTexture" : div.div[3].div.div[4].p, // soil texture
      "soilMoisture" : div.div[3].div.div[5].p, // soil moisture
      "region" : div.div[3].div.div[6].p, // region
     */ 
    };
    
    
    console.log(entry);

    // extract numeric plant id from url
    var plantid = entry.url.split("/").pop(); 
    var entryFix = {};

    //remove leading punctuation
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
