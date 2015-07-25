var npc = require('../nativeplantcenter');
var foo = new npc();

foo.keyword("divaricatus",function(result){
//  console.log("search result: "+JSON.stringify(result,null,"  "));
  
  console.log(result);
})


