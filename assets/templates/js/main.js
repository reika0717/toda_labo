$(function() {
  var re = /([a-zA-Z\-]+.html)/;
  var CurUrl = location.href;
  CurUrl.replace(re, "$1");
  var NewUrl = "";
  if (RegExp.$1.indexOf("study-") === -1) {
    NewUrl = CurUrl.replace(RegExp.$1, "en/" + RegExp.$1);
  } else {
    NewUrl = CurUrl.replace("studies", "en/studies");
  }
  $("#eng a").attr("href", NewUrl);
});
