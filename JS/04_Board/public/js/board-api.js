function delList(id) {
  $.ajax({
    url: '/api/delete',
    type: 'DELETE',
    dataType: 'json',
    data: {id: id},
    success: function(res) {
      getData();
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
}

$('#btSave').click(function(){
  var id = document.form1.id.value;
  var type = "POST"; // create
  var url = "/api/post"
  if (id != "") {
    type = "PUT"; // update 
    url = "/api/put";
  }
  console.log(url);
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
    html += "<td onclick='getData("+res.data[i].id+");'>"+res.data[i].title+"</td>";
    html += '<td>'+res.data[i].writer+'</td>';
    html += '<td>'+res.data[i].wDate+'</td>';
    html += '<td>'+res.data[i].rNum+'</td>';
    html += "<td><button class='btn-sm btn-danger' onclick='delList("+res.data[i].id+")'>Delete</button></td>";
    html += '</tr>';
  }
  $("#listTb > tbody").html(html);
}

function viewList(res) {
  var f = document.form1;
  var d = res.data[0];
  console.log(f.id.value);
  f.id.value = d.id;
  f.title.value = d.title;
  f.writer.value = d.writer;
  f.content.value = d.content;
}

getData();
