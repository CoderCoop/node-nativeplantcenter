var npc = require('../lib/nativeplantcenter');
var foo = new npc();

foo.keyword("bittersweet",function(result){
  console.log("foo "+JSON.stringify(result,null,"  "));
})


