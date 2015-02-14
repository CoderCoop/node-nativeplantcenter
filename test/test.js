var assert = require("assert"); // node.js core module

var npc = require('../lib/nativeplantcenter');


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


describe('foo', function(){
  describe('#bar()', function(){
    it('do something', function(done){

      var foo = new npc();
      
      foo.keyword("bittersweet",function(result){

        assert.equal(baz, result);

        done();

      });

    });
  });
});

