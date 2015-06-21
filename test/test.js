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


var goodResult = {
  "237": {
    "url": "http://www.nativeplantcenter.net/?q=plants/237",
    "thumb": "http://www.nativeplantcenter.net/images/plants/vines/thumbs/Celastrus_scandens_1_PLANTS_TGB.jpg",
    "species": "Celastrus scandens",
    "name": "American Bittersweet",
    "commonNames": "American Bittersweet",
    "plantTypes": "Vine",
    "sunExposure": "Full Sun, Partial Sun, Shade",
    "soilTexture": "Clay, Loamy, Sandy",
    "soilMoisture": "Dry, Moist",
    "region": "Mountain, Piedmont, Coastal Plain",
    "img": "http://www.nativeplantcenter.net/images/plants/vines/Celastrus_scandens_1_PLANTS_TGB.jpg"
  }
};


