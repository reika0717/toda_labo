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

  var script = document.createElement("meta");
  script.setAttribute("name", "viewport");
  script.setAttribute("content", "width=device-width, initial-scale=1.0");
  document.head.appendChild(script);
  if (
    location.pathname === "/toda_labo/index.html" ||
    location.pathname === "/toda_labo/"
  ) {
    //ニュース
    $.ajax({
      url:
        "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/oi9egak/public/values?alt=json",
      dataType: "json",
      async: true,
      success: function(data) {
        let entries = data.feed.entry;
        let news_array = [];
        for (let i = 2; i < entries.length; i = i + 2) {
          let obj = {
            date: entries[i].content.$t,
            content: entries[i + 1].content.$t
          };
          news_array.push(obj);
        }
        for (let i = 0; i < 5; i++) {
          //リンクをタグに変換
          let reg = new RegExp(
            /\[(.+)\]\((https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)\)/
          );
          let content_modified = news_array[i].content.replace(
            reg,
            `<a href="$2">$1</a>`
          );
          let single_news = `<tr><th>${
            news_array[i].date
          }</th><td>${content_modified}</td></tr>`;
          $("#topics").append(single_news);
        }
      }
    });
  } else if (
    location.pathname === "/toda_labo/en/index.html" ||
    location.pathname === "/toda_labo/en/"
  ) {
    //ニュース
    $.ajax({
      url:
        "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/oupqnq2/public/values?alt=json",
      dataType: "json",
      async: true,
      success: function(data) {
        let entries = data.feed.entry;
        let news_array = [];
        for (let i = 2; i < entries.length; i = i + 2) {
          let obj = {
            date: entries[i].content.$t,
            content: entries[i + 1].content.$t
          };
          news_array.push(obj);
        }
        for (let i = 0; i < 5; i++) {
          //リンクをタグに変換
          let reg = new RegExp(
            /\[(.+)\]\((https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)\)/
          );
          let content_modified = news_array[i].content.replace(
            reg,
            `<a href="$2">$1</a>`
          );
          let single_news = `<tr><th>${
            news_array[i].date
          }</th><td>${content_modified}</td></tr>`;
          $("#topics").append(single_news);
        }
      }
    });
  } else if (location.pathname === "/toda_labo/news.html") {
    $.ajax({
      url:
        "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/oi9egak/public/values?alt=json",
      dataType: "json",
      async: true,
      success: function(data) {
        let entries = data.feed.entry;
        let news_array = [];
        for (let i = 2; i < entries.length; i = i + 2) {
          let obj = {
            date: entries[i].content.$t,
            content: entries[i + 1].content.$t
          };
          news_array.push(obj);
        }
        for (let i = 0; i < news_array.length; i++) {
          //リンクをタグに変換
          // let reg = new RegExp(/\[(.+)\]\((https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)\)/)
          let reg = new RegExp(
            /\[(.[^\]]+)\]\((https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)\)/g
          );
          let content_modified = news_array[i].content.replace(
            reg,
            `<a href="$2">$1</a>`
          );
          let single_news = `<tr><th>${
            news_array[i].date
          }</th><td>${content_modified}</td></tr>`;
          $("#topics").append(single_news);
        }
      }
    });
  } else if (location.pathname === "/toda_labo/en/news.html") {
    $.ajax({
      url:
        "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/oupqnq2/public/values?alt=json",
      dataType: "json",
      async: true,
      success: function(data) {
        let entries = data.feed.entry;
        let news_array = [];
        for (let i = 2; i < entries.length; i = i + 2) {
          let obj = {
            date: entries[i].content.$t,
            content: entries[i + 1].content.$t
          };
          news_array.push(obj);
        }
        for (let i = 0; i < news_array.length; i++) {
          //リンクをタグに変換
          // let reg = new RegExp(/\[(.+)\]\((https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)\)/)
          let reg = new RegExp(
            /\[(.[^\]]+)\]\((https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)\)/g
          );
          let content_modified = news_array[i].content.replace(
            reg,
            `<a href="$2">$1</a>`
          );
          let single_news = `<tr><th>${
            news_array[i].date
          }</th><td>${content_modified}</td></tr>`;
          $("#topics").append(single_news);
        }
      }
    });
  } else if (
    location.pathname === "/toda_labo/achievement.html" ||
    location.pathname === "/toda_labo/en/achievement.html"
  ) {
    //学術論文
    $.ajax({
      url:
        "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/od6/public/values?alt=json",
      dataType: "json",
      async: true,
      success: function(data, order) {
        let entries = data.feed.entry;
        let article_array = {};
        for (let i = 4; i < entries.length; i = i + 4) {
          article_array[entries[i].content.$t.substr(-5, 4)] = [];
        }
        for (let i = 4; i < entries.length; i = i + 4) {
          let obj = {
            author: "",
            title: "",
            link: "",
            article: ""
          };
          if (entries[i] !== undefined) {
            obj.author = entries[i].content.$t.replace(
              "T. Toda",
              '<span class="prof">T. Toda</span>'
            );
          }
          if (entries[i + 2] !== undefined) {
            obj.title = entries[i + 1].content.$t;
          }
          if (entries[i + 3] !== undefined) {
            obj.link = entries[i + 2].content.$t;
          }
          if (entries[i + 4] !== undefined) {
            obj.article = entries[i + 3].content.$t;
          }
          article_array[entries[i].content.$t.substr(-5, 4)].push(obj);
        }
        let year_array = Object.keys(article_array).reverse();
        $(".academic_paper_wrapper").append(`<ol class="year_list"></ol>`);
        year_array.forEach(year => {
          $(`.year_list`).append(
            `<h5 class="YearDiv"><a name="Journal${year}"></a>${year}</h5></ol>`
          );
          article_array[year].forEach(article => {
            $(`.year_list`).append(
              `<li><a name="Othman${year}"></a>${
                article.author
              }<br /><div class="article"><a href='${
                article.link
              }' target='_blank'>${article.title}</a><br />${
                article.article
              }</div></li>`
            );
          });
        });
      }
    });

    //国際会議
    $.ajax({
      url:
        "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/ot9j46w/public/values?alt=json",
      dataType: "json",
      async: true,
      success: function(data, order) {
        let entries = data.feed.entry;
        let article_array = [];
        for (let i = 3; i < entries.length; i = i + 3) {
          let obj = {
            author: "",
            title: "",
            association: ""
          };
          if (entries[i] !== undefined) {
            obj.author = entries[i].content.$t.replace(
              "T. Toda",
              '<span class="prof">T. Toda</span>'
            );
          }
          if (entries[i + 2] !== undefined) {
            obj.title = entries[i + 1].content.$t;
          }
          if (entries[i + 3] !== undefined) {
            obj.association = entries[i + 2].content.$t;
          }
          article_array.push(obj);
        }
        article_array.forEach(article => {
          $(".international_conference_wrapper").append(
            `<li>${article.author}<br /><div class="article">${
              article.title
            }<br />${article.association}</div></li>`
          );
        });
      }
    });

    //国内学会
    $.ajax({
      url:
        "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/ojan6bf/public/values?alt=json",
      dataType: "json",
      async: true,
      success: function(data, order) {
        let entries = data.feed.entry;
        let article_array = [];
        for (let i = 3; i < entries.length; i = i + 3) {
          let obj = {
            author: "",
            title: "",
            place: ""
          };
          if (entries[i] !== undefined) {
            obj.author = entries[i].content.$t.replace(
              "T. Toda",
              '<span class="prof">T. Toda</span>'
            );
          }
          if (entries[i + 2] !== undefined) {
            obj.title = entries[i + 1].content.$t;
          }
          if (entries[i + 3] !== undefined) {
            obj.place = entries[i + 2].content.$t;
          }
          article_array.push(obj);
        }
        article_array.forEach(article => {
          $(".domestic_conference_wrapper").append(
            `<li>${article.author}<br /><div class="article">${
              article.title
            }<br />${article.place}</div></li>`
          );
        });
      }
    });
  }
});
