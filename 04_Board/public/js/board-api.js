function getData(id) {
  let url = "/api/get";
  if (id) url += `/${id}`;
  $.ajax({
    url: url, // node can type just url because node supports ES6
    type: "GET",
    dataType: "json",
    success: function(res) {
      if (id) makeList(res);
      else viewList(res);
    },
    error: function(xhr) { // xml http response
      console.log(xhr);
    }
  });
}

function makeList(res) {

}

function viewList(res) {

}

getData();
