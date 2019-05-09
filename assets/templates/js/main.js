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

  // https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/od6/public/values?alt=json //学術論文
  // https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/oi9egak/public/values?alt=json　//ニュース
  // https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/ot9j46w/public/values?alt=json //国際会議

  // 例
  // $.ajax({
  //   url: "https://spreadsheets.google.com/feeds/cells/1JGvXRqvu5A5IhaYfz40yTblNP7bZZL6GaPGaZl7knHM/od6/public/values?alt=json",
  //   dataType: "json",
  //   async: true,
  //   success: function(data) {
  //     //処理
  //   }
  // })
});
