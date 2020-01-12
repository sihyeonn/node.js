$('#btSave').click(function(){
  var id = document.form1.id.value;
  var type = "POST"; // create
  var url = "/api/post"
  if (id != "") {
    type = "PUT"; // update 
    url = "/api/put";
  }
  $.ajax({
    url: url,
    type: type,
    dataType: "json",
    data: {
      id: id,
      title: document.form1.title.value,
      writer: document.form1.writer.value,
      content: document.form1.content.value
    },
    success: function(res) {
      document.form1.reset();
      if (res.serverStatus == 2) getData();
      else console.log(res);
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
});

function getData(id) {
  let url = "/api/get/";
  if (id) url += id;
  $.ajax({
    url: url, // node can type just url because node supports ES6
    type: "GET",
    dataType: "json",
    success: function(res) {
      if (id) viewList(res);
      else makeList(res);
    },
    error: function(xhr) { // xml http response
      console.log(xhr);
    }
  });
}

function makeList(res) {
  console.log(res);
  $("#title").html(res.title);
  var html = '';
  for (var i in res.data) {
    html += '<tr>';
    html += '<td>'+res.data[i].id+'</td>';
    html += '<td>'+res.data[i].title+'</td>';
    html += '<td>'+res.data[i].writer+'</td>';
    html += '<td>'+res.data[i].wDate+'</td>';
    html += '<td>'+res.data[i].rNum+'</td>';
    html += "<td><button class='btn-sm btn-danger' data-id='"+res.data[i].id+"'>Delete</button></td>";
    html += '</tr>';
  }
  $("#listTb > tbody").html(html);
}

function viewList(res) {
  console.log(res);
}

getData();
