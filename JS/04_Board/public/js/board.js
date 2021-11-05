// front with jquery
// IE can not understand backtick template
$("#btnUpdate").click(function(){
  location.href = "/board/update/" + $(this).data("id");
});
$("#btnDelete").click(function(){
  if (confirm("Are you sure?")) {
    location.href = "/board/delete/" + $(this).data("id");
  }
});
$("#btnList").click(function(){
  location.href = "/board/list";
});
$("#btnReset").click(function(){
  if (confirm("Are you sure?")) {
    location.reload();
  }
});

function upData() {
  var f = document.updateForm;
  if (f.title.value == "") {
    alert("Input title.");
    f.title.focus();
    return false; // for not to submit
  }
  if (f.content.value == "") {
    alert("Input Content.");
    f.content.focus();
    return false; // for not to submit
  }
  return true;
}
