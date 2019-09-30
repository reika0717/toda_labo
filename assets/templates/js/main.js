$(function() {
  var pageType = $("html").attr("data-page-type");

  // spメニュートグル
  $(".menu_for_sp").on("click", () => {
    $("#left").addClass("on");
    $(".sp_nav_bg").addClass("on");
  });
  $(".sp_nav_bg").on("click", () => {
    $("#left").removeClass("on");
    $(".sp_nav_bg").removeClass("on");
  });

  // 言語設定のリンク
  var CurUrl = location.href;
  if (CurUrl.indexOf("toda_labo/en/") !== -1) {
    $(".main_language").attr(
      "href",
      CurUrl.replace("toda_labo/en/", "toda_labo/")
    );
  } else {
    $(".main_language").attr(
      "href",
      CurUrl.replace("toda_labo/", "toda_labo/en/")
    );
  }

  // グローバルナビゲーション
  $(`.gloval_nav, .${pageType}`).addClass("active");
  if (pageType === "study" || pageType === "project" || pageType === "member") {
    let child_page = `.${pageType}_children`;
    $(child_page).addClass("active");
  }

  function analytics(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  }
  analytics(
    window,
    document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
  );
  ga("create", "UA-58221482-1", "auto");
  ga("send", "pageview");

  var script = document.createElement("meta");
  script.setAttribute("name", "viewport");
  script.setAttribute("content", "width=device-width, initial-scale=1.0");
  document.head.appendChild(script);

  var script_fontawesome = document.createElement("script");
  script_fontawesome.setAttribute(
    "src",
    "https://kit.fontawesome.com/04e6437977.js"
  );
  document.head.appendChild(script_fontawesome);

  var initialize = {
    index: function() {
      //トップスライダー
      var mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        pagination: {
          el: ".swiper-pagination"
        },
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1.2,
        loop: true,
        breakpoints: {
          1000: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        }
      });
      setInterval(function() {
        mySwiper.slideNext(800, true);
      }, 8000);

      // facebook
      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src =
          "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.10&appId=1452992854921239";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
      window.fbAsyncInit = function() {
        FB.init({
          appId: "1452992854921239",
          xfbml: true,
          version: "v2.2"
        });
      };

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
              let single_news = `<tr><th>${news_array[i].date}</th><td>${content_modified}</td></tr>`;
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
              let single_news = `<tr><th>${news_array[i].date}</th><td>${content_modified}</td></tr>`;
              $("#topics").append(single_news);
            }
          }
        });

        //【英語→日本語】日本語ページと英語ページの入れ替えを作るURL作成スクリプト
        CurUrl = location.href;
        NewUrl = CurUrl.replace("/en/", "/");
        $("#ja a").attr("href", NewUrl);
      }
    },
    news: function() {
      if (location.pathname === "/toda_labo/news.html") {
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
              let single_news = `<tr><th>${news_array[i].date}</th><td>${content_modified}</td></tr>`;
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
              let single_news = `<tr><th>${news_array[i].date}</th><td>${content_modified}</td></tr>`;
              $("#topics").append(single_news);
            }
          }
        });
      }
    },
    intro: function() {},
    achievement: function() {
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
              obj.title = entries[i + 1].content.$t.replace(
                /\*\*([^\*\*]+)\*\*/g,
                '<span class="italic">' + "$1" + "</span>"
              );
            }
            if (entries[i + 3] !== undefined) {
              obj.link = entries[i + 2].content.$t;
            }
            if (entries[i + 4] !== undefined) {
              obj.article = entries[i + 3].content.$t.replace(
                /\*\*([^\*\*]+)\*\*/g,
                '<span class="italic">' + "$1" + "</span>"
              );
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
                `<li><a name="Othman${year}"></a>${article.author}<br /><div class="article"><a href='${article.link}' target='_blank'>${article.title}</a><br />${article.article}</div></li>`
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
              obj.title = entries[i + 1].content.$t.replace(
                /\*\*([^\*\*]+)\*\*/g,
                '<span class="italic">' + "$1" + "</span>"
              );
            }
            if (entries[i + 3] !== undefined) {
              obj.association = entries[i + 2].content.$t;
            }
            article_array.push(obj);
          }
          article_array.forEach(article => {
            $(".international_conference_wrapper").append(
              `<li>${article.author}<br /><div class="article">${article.title}<br />${article.association}</div></li>`
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
              `<li>${article.author}<br /><div class="article">${article.title}<br />${article.place}</div></li>`
            );
          });
        }
      });
    },
    study: function() {
      $("img").each(function(index, elm) {
        let imgsrc = $(elm).attr("src");
        $(elm).wrap(`<a href="${imgsrc}" rel="lightbox"></a>`);
      });
    },
    project: function() {}
  };
  console.log(pageType);
  initialize[pageType]();
});
