var assert = require("assert"); // node.js core module
var npc = require('../lib/nativeplantcenter');
var util = require('util');

var myNPC = new npc();

describe('search function', function(){
  describe('keyword()', function(){
    it('keyword "bittersweet"', function(done){
      myNPC.keyword("bittersweet",function(result){
        assert.equal(JSON.stringify(goodResult,null,"  "), JSON.stringify(result,null,"  "));
        done();
      });
    })
  })
})

describe('helper functions', function(){
  describe('processSearchData()', function(){
    it('should process data', function(){
      assert.equal(JSON.stringify(goodResult,null,"  "), JSON.stringify(myNPC.processSearchData(goodInput),null,"  "));
    })
  })
})


var goodResult = {
  "237": {
  "url": "http://www.nativeplantcenter.net/?q=plants/237",
  "thumb": "http://www.nativeplantcenter.net/images/plants/vines/thumbs/Celastrus_scandens_1_PLANTS_TGB.jpg",
  "img": "http://www.nativeplantcenter.net/images/plants/vines/Celastrus_scandens_1_PLANTS_TGB.jpg",
  "species": "Celastrus scandens",
  "name": "American Bittersweet",
  "commonNames": "",
  "plantTypes": "Vine",
  "sunExposure": "Full Sun, Partial Sun, Shade",
  "soilTexture": "Clay, Loamy, Sandy",
  "soilMoisture": "Dry, Moist",
  "region": "Mountain, Piedmont, Coastal Plain"
  }
};


var goodInput = {
  "div": {
    "class": "database_entry matrix_entry",
    "div": [
      {
        "class": "database_entry_image",
        "a": {
          "href": "http://www.nativeplantcenter.net/?q=plants/237",
          "img": {
            "src": "http://www.nativeplantcenter.net/images/plants/vines/thumbs/Celastrus_scandens_1_PLANTS_TGB.jpg"
          }
        }
      },
      {
        "class": "matrix_entry_title",
        "style": "display:block;",
        "a": {
          "href": "http://www.nativeplantcenter.net/?q=plants/237",
          "content": "Celastrus scandens"
        }
      },
      {
        "class": "matrix_entry_subtitle",
        "style": "display:block;",
        "p": "American Bittersweet"
      },
      {
        "class": "database_entry_info",
        "style": "display:none;",
        "div": {
          "div": [
            {
              "class": "database_entry_title",
              "a": {
                "href": "http://www.nativeplantcenter.net/?q=plants/237",
                "content": "Celastrus Scandens"
              }
            },
            {
              "class": "database_entry_property",
              "span": "Common Name",
              "p": {
                "a": {
                  "href": "http://www.nativeplantcenter.net/?q=plants/237",
                  "content": "American Bittersweet"
                },
                "content": ": "
              }
            },
            {
              "class": "database_entry_property",
              "span": "Plant Type",
              "p": ": Vine"
            },
            {
              "class": "database_entry_property",
              "span": "Sun Exposure",
              "p": ": Full Sun, Partial Sun, Shade"
            },
            {
              "class": "database_entry_property",
              "span": "Soil Texture",
              "p": ": Clay, Loamy, Sandy"
            },
            {
              "class": "database_entry_property",
              "span": "Soil Moisture",
              "p": ": Dry, Moist"
            },
            {
              "class": "database_entry_property",
              "span": "Region",
              "p": ": Mountain, Piedmont, Coastal Plain"
            }
          ]
        }
      }
    ]
  }
};

