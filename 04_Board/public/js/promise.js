function init() {
  var date = getDays().then(function(d){
    console.log(d.getDay());
  });
  console.log('init'); // Promise:: Execute right away after L3
}

// await works only in async function
async function async_init() {
  var date = await getDays();
  console.log('async_init'); // async-await:: Execute after finishing L10
  console.log(date.getDate());
}

function getDays() {
  var d = new Date();
  return new Promise(function(resolve, reject){
    resolve(d); // return
  });
}

init();
async_init();
console.log('here'); // Execute right away after L23
