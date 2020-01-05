function init() {
  var date = getDays().then(function(d){
    console.log(d.getDate());
  });
}

async function async_init() {
  var date = await getDays();
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
