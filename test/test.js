var assert = require("assert"); // node.js core module

var npc = require('../lib/nativeplantcenter');

var util = require('util');


var foo = new npc();

var baz = {
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


var qux = {
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





describe('blah', function(){
  describe('processSearchData()', function(){
    it('should process data', function(){

      var blerg = foo.processSearchData(qux);

      console.log("\n\n\n baz \n"+util.inspect(baz, { depth: 10 }));

      console.log("\n\n\n blerg \n"+util.inspect(blerg, { depth: 10 }));
        

      assert.equal(baz,blerg);
        
  //    console.log("\n\n baz"+JSON.stringify(baz,null,"  "));
  //    console.log("\n\n blerg"+JSON.stringify(blerg,null,"  "));
  //    assert.equal(JSON.stringify(baz,null,"  "), JSON.stringify(blerg,null,"  "));

  //      assert.equal(5,6);
  //      assert.equal(5,5);

    })
  })
})

/*
describe('foo', function(){
  describe('#bar()', function(){
    it('do something', function(done){
      foo.keyword("bittersweet",function(result){
        assert.equal(baz, result);
        done();
      });
    })
  })
})
*/
