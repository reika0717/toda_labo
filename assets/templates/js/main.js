$(function () {
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

	if (location.pathname === "/toda_labo/index.html" || location.pathname === "/toda_labo/") {
		//ニュース
		$.ajax({
			url: "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/oi9egak/public/values?alt=json",
			dataType: "json",
			async: true,
			success: function (data) {
				let entries = data.feed.entry
				let news_array = []
				for (let i = 2; i < entries.length; i = i + 2) {
					let obj = {
						date: entries[i].content.$t,
						content: entries[i + 1].content.$t
					}
					news_array.push(obj)
				}
				for (let i = 0; i < 5; i++) {
					//リンクをタグに変換
					let reg = new RegExp(/\[(.+)\]\((https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)\)/)
					let content_modified = news_array[i].content.replace(reg, `<a href="$2">$1</a>`)
					let single_news = `<tr><th>${news_array[i].date}</th><td>${content_modified}</td></tr>`
					$("#topics").append(single_news)
				}
			}
		})
	} else if (location.pathname === "/toda_labo/achievement.html") {
		//学術論文
		$.ajax({
			url: "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/od6/public/values?alt=json",
			dataType: "json",
			async: true,
			success: function (data) {

			}
		})

		//国際会議
		$.ajax({
			url: "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/ot9j46w/public/values?alt=json",
			dataType: "json",
			async: true,
			success: function (data) {
				//処理
			}
		})
	}

});