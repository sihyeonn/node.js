// front with jquery
// IE can not understand backtick template
$("#btUpdate").click(function(){
  location.href = "/board/update/" + $(this).data("id");
});
$("#btDelete").click(function(){
  if (confirm("Are you sure?")) {
    location.href = "/board/delete/" + $(this).data("id");
  }
});
$("#btList").click(function(){
  location.href = "/board/list";
});
