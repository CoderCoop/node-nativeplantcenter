"use strict"
var util = require('util');
var request = require('request');
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


/*
example url:
http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.nativeplantcenter.net%2F%3Fq%3Ddatabase%26count%3D-1%26keyword%3Ddivaricatus%22%20and%20xpath%3D'%2F%2Fdiv%5Bcontains(%40class%2C%22database_entry%20%20matrix_entry%22)%5D'&format=xml
*/
//console.log(url);

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(npc.prototype.processSearchData(body));  
    }
  })

};

// define method for processing search data
npc.prototype.processSearchData = function(data) {

    var doc = new dom().parseFromString(data);
    var nodes = xpath.select('//results/div[contains(@class,"database_entry")]', doc);    
//    console.log(nodes.length);

    var output = {};
    
    var prefix = '//results/div[contains(@class,"database_entry")][%s]';
    
    var xpaths_template = {
      'url' : '%s/div/div/div[@class="database_entry_title"]/a/@href',
      'thumb' : '%s/div[@class="database_entry_image"]/a/img/@src',
      'species' : '%s/div[@class="matrix_entry_title"]/a/text()',
      'name' : '%s/div[@class="matrix_entry_subtitle"]/text()',
      'commonNames' : '%s/div[@class="database_entry_info"]/div/div[@class="database_entry_property"]/span/text()[contains(.,"Common Name")]/../..',
//      'commonNames' : '%s/div[@class="database_entry_info"]/div/div[@class="database_entry_property"]/span/text()[contains(.,"Common Name")]/../../text() | %s/div[@class="database_entry_info"]/div/div[@class="database_entry_property"]/span/text()[contains(.,"Common Name")]/../../descendant::*/text()',
      'plantTypes' : '%s/div[@class="database_entry_info"]/div/div[@class="database_entry_property"]/span/text()[contains(.,"Plant Type")]/../../text()',
      'sunExposure' : '%s/div[@class="database_entry_info"]/div/div[@class="database_entry_property"]/span/text()[contains(.,"Sun Exposure")]/../../text()',
      'soilTexture' : '%s/div[@class="database_entry_info"]/div/div[@class="database_entry_property"]/span/text()[contains(.,"Soil Texture")]/../../text()',
      'soilMoisture' : '%s/div[@class="database_entry_info"]/div/div[@class="database_entry_property"]/span/text()[contains(.,"Soil Moisture")]/../../text()',      
      'region' : '%s/div[@class="database_entry_info"]/div/div[@class="database_entry_property"]/span/text()[contains(.,"Region")]/../../text()',       

    };

      for (var template in xpaths_template) {
//         xpaths_template[template] = util.format(xpaths_template[template],prefix);
         xpaths_template[template] = xpaths_template[template].replace(/%s/g,prefix);
      }

      
    nodes.map(function(current, index, array) {
      var div_index = index + 1;
      var xpaths = {};
     
      for (var template in xpaths_template) {
//         xpaths[template] = util.format(xpaths_template[template],div_index);
         xpaths[template] = xpaths_template[template].replace(/%s/g,div_index);
         
//         console.log(xpaths[template]);
      }

      var xpath_value;
      var entry = {};
      
      for (var myxpath in xpaths) {
        var result = xpath.select(xpaths[myxpath], doc)[0];
        if(result.value){
          xpath_value = result.value;
        }
        else {
          xpath_value = result.toString();
        }
        entry[myxpath]=xpath_value;
      }
      
      // get full image from thumbnail
      entry.img=entry.img.replace('thumbs/','');
      
      // remove leading punctuation
      Object.keys(entry).forEach(function (key) {
        entry[key]=entry[key].replace(':  , ','');
        entry[key]=entry[key].replace(': ','');
      });   
      
      // cleanup Common Names
      entry.commonNames = entry.commonNames.replace(/<[^>]+>/g,'');
      entry.commonNames = entry.commonNames.replace('Common Names',''); 
      entry.commonNames = entry.commonNames.replace('Common Name','');
      entry.commonNames = entry.commonNames.replace(/ , /g,', '); 
   
   
      var plantid = entry.url.split("/").pop();
      output[plantid] = entry;
      
    });

    return output;
    
}

module.exports = npc;

// exports.keyword = keywordSearch;
