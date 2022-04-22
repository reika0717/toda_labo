const API_KEY = "AIzaSyDyp7uWrxIBaGxW4mT1fqR1QdbrcnJZShw"; // TODO: 見えないようにする
const SPREADSHEET_ID = "1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk";

$(function () {
  var pageType = $("html").attr("data-page-type");
  const column_title = {
    name_title_ja: "名前",
    name_title_en: "name",
    position_title_ja: "役職",
    position_title_en: "position",
    biography_title_ja: "略歴",
    biography_title_en: "biography",
    comment_title_ja: "一言",
    comment_title_en: "comment",
    image_title: "画像タイトル",
  };

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
    let file_name = window.location.href.split("/").pop().replace(".html", "");
    $(`.child_nav`).removeClass("active");
    $(`.child_nav.${file_name}`).addClass("active");
  }

  $(".scroll_to_top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 });
  });

  function analytics(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function () {
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

  var initialize = {
    index: function () {
      //トップスライダー
      var mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        pagination: {
          el: ".swiper-pagination",
        },
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1.2,
        loop: true,
        breakpoints: {
          1000: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        },
      });
      setInterval(function () {
        mySwiper.slideNext(800, true);
      }, 8000);

      // facebook
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src =
          "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.10&appId=1452992854921239";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
      window.fbAsyncInit = function () {
        FB.init({
          appId: "1452992854921239",
          xfbml: true,
          version: "v2.2",
        });
      };

      // ページプラグインの埋め込みコードを返す。
      function pagePluginCode(w) {
        var h = 700;
        return `<div
                  class="fb-page"
                  data-href="https://www.facebook.com/TodaLab/"
                  data-tabs="timeline"
                  data-width="${w - 30}"
                  data-height="${h}"
                  data-small-header="true"
                  data-adapt-container-width="true"
                  data-hide-cover="false"
                  data-show-facepile="false"
                >`;
      }

      // ページプラグインを追加する要素
      var facebookWrap = $(".fb-iframe-container");
      var fbBeforeWidth = ""; // 前回変更したときの幅
      var fbWidth = facebookWrap.width(); // 今回変更する幅
      var fbTimer = false;
      $(window).on("load resize", function () {
        if (fbTimer !== false) {
          clearTimeout(fbTimer);
        }
        fbTimer = setTimeout(function () {
          fbWidth = facebookWrap.width(); // 変更後の幅を取得
          // 前回の幅から変更があった場合のみ処理
          // スマホだとスクロール時にリサイズが発生することがあるため
          if (fbWidth != fbBeforeWidth) {
            facebookWrap.html(pagePluginCode(fbWidth)); // ページプラグインのコード変更
            window.FB.XFBML.parse(); // ページプラグインの再読み込み
            fbBeforeWidth = fbWidth; // 今回変更分を保存しておく
          }
        }, 200);
      });

      if (
        location.pathname === "/toda_labo/index.html" ||
        location.pathname === "/toda_labo/"
      ) {
        //ニュース
        $.ajax({
          url: `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/お知らせ?key=${API_KEY}`,
          dataType: "json",
          async: true,
          success: function (data) {
            let news_array = data.values.map((val) => {
              return {
                date: val[0],
                content: val[1],
              };
            });
            for (let i = 1; i < 6; i++) {
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
          },
        });
      } else if (
        location.pathname === "/toda_labo/en/index.html" ||
        location.pathname === "/toda_labo/en/"
      ) {
        //ニュース
        $.ajax({
          url: `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/News?key=${API_KEY}`,
          dataType: "json",
          async: true,
          success: function (data) {
            let news_array = data.values.map((val) => {
              return {
                date: val[0],
                content: val[1],
              };
            });
            for (let i = 1; i < 6; i++) {
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
          },
        });

        //【英語→日本語】日本語ページと英語ページの入れ替えを作るURL作成スクリプト
        CurUrl = location.href;
        NewUrl = CurUrl.replace("/en/", "/");
        $("#ja a").attr("href", NewUrl);
      }
    },
    news: function () {
      if (location.pathname === "/toda_labo/news.html") {
        $.ajax({
          url: `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/お知らせ?key=${API_KEY}`,
          dataType: "json",
          async: true,
          success: function (data) {
            let news_array = data.values.map((val) => {
              return {
                date: val[0],
                content: val[1],
              };
            });
            for (let i = 1; i < news_array.length; i++) {
              //リンクをタグに変換
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
          },
        });
      } else if (location.pathname === "/toda_labo/en/news.html") {
        $.ajax({
          url: `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/News?key=${API_KEY}`,
          dataType: "json",
          async: true,
          success: function (data) {
            let news_array = data.values.map((val) => {
              return {
                date: val[0],
                content: val[1],
              };
            });
            for (let i = 1; i < news_array.length; i++) {
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
          },
        });
      }
    },
    intro: function () {},
    achievement: function () {
      //学術論文
      $.ajax({
        url: `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/学術論文?key=${API_KEY}`,
        dataType: "json",
        async: true,
        success: function (data) {
          const head = data.values.shift();
          const articles = {};
          data.values.forEach((val) => {
            const year_index = head.indexOf("year");
            const year = val[year_index];
            const obj = {};
            val.forEach((datam, i) => (obj[head[i]] = datam));
            if (articles[year]) {
              articles[year].push(obj);
            } else {
              articles[year] = [obj];
            }
          });

          let year_array = Object.keys(articles).reverse();

          $(".academic_paper_wrapper").append(`<ol class="year_list"></ol>`);

          year_array.forEach((year) => {
            $(".scientific_papers_years").append(
              `<li><a href="#Journal${year}">${year}</a></li>`
            );

            $(`.year_list`).append(
              `<h5 class="YearDiv"><a name="Journal${year}"></a>${year}</h5></ol>`
            );
            articles[year].forEach((article) => {
              $(`.year_list`).append(
                `<li><a name="Othman${year}"></a>${article.author}<br /><div class="article"><a href='${article.link}' target='_blank'>${article.title}</a><br />${article.article}</div></li>`
              );
            });
          });
        },
      });

      //国際会議
      $.ajax({
        url: `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/学術論文?key=${API_KEY}`,
        dataType: "json",
        async: true,
        success: function (data, order) {
          let head = data.values.shift();
          const article_array = data.values.map((val) => {
            let obj = {};
            val.forEach((datam, i) => (obj[head[i]] = datam));
            return obj;
          });

          article_array.forEach((article) => {
            $(".international_conference_wrapper").append(
              `<li>${article.author}<br /><div class="article">${article.title}<br />${article.association}</div></li>`
            );
          });
        },
      });

      //国内学会
      $.ajax({
        url: `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/国内学会?key=${API_KEY}`,
        dataType: "json",
        async: true,
        success: function (data, order) {
          let head = data.values.shift();
          const article_array = data.values.map((val) => {
            let obj = {};
            val.forEach((datam, i) => (obj[head[i]] = datam));
            return obj;
          });
          article_array.forEach((article) => {
            $(".domestic_conference_wrapper").append(
              `<li>${article.author}<br /><div class="article">${article.title}<br />${article.place}</div></li>`
            );
          });
        },
      });
    },
    study: function () {
      $("img").each(function (index, elm) {
        let imgsrc = $(elm).attr("src");
        $(elm).wrap(`<a href="${imgsrc}" rel="lightbox"></a>`);
      });
    },
    project: function () {
      $("img").each(function (index, elm) {
        let imgsrc = $(elm).attr("src");
        $(elm).wrap(`<a href="${imgsrc}" rel="lightbox"></a>`);
      });
    },
    member: function () {
      if (location.pathname.includes("active_member")) {
        $.ajax({
          url: `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/研究室メンバー?key=${API_KEY}`,
          dataType: "json",
          async: true,
          success: function (data) {
            let head = data.values.shift();
            const members = data.values.map((val) => {
              let obj = {};
              val.forEach((datam, i) => (obj[head[i]] = datam));
              return obj;
            });
            const lang = location.pathname.includes("/en/") ? "en" : "ja";
            let single_profile = `<ul>`;
            members.forEach((member) => {
              single_profile += `
              <li class="single_profile">
                <img src="${lang === "en" ? "../" : ""}assets/images/members/${
                member["画像タイトル"]
              }.jpg"/>
                <div>
                  <p class="position">${
                    member[lang === "ja" ? "役職" : "position"]
                  }</p>
                  <p class="name">${member[lang === "ja" ? "名前" : "name"]}</p>
                  <p class="biography">${
                    member[lang === "ja" ? "略歴" : "biography"]
                  }</p>
                  <p class="comment">${
                    member[lang === "ja" ? "一言" : "comment"]
                  }</p>
                </div>
              </li>
            `;
            });
            single_profile += `</ul>`;
            $(".member_wrapper").append(single_profile);
          },
        });
      } else if (location.pathname.includes("obog.html")) {
        const lang = location.pathname.includes("/en/") ? "en" : "ja";
        $.ajax({
          url: `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/OB・OG?key=${API_KEY}`,
          dataType: "json",
          async: true,
          success: function (data) {
            const head = data.values.shift();
            const members = {};
            data.values.forEach((val) => {
              const category_index = head.indexOf("カテゴリ");
              const category = val[category_index];
              const obj = {};
              val.forEach((datam, i) => (obj[head[i]] = datam));
              if (members[category]) {
                members[category].push(obj);
              } else {
                members[category] = [obj];
              }
            });
            Object.entries(members).forEach(([category, data]) => {
              let members_html = "";
              data.forEach((datam) => {
                members_html += `<li class="single_profile" id="${
                  datam["画像タイトル"]
                }">
                  <img src="${
                    lang === "en" ? "../" : ""
                  }assets/images/members/${datam["画像タイトル"]}.jpg"/>
                  <div>
                    <p class="position">${
                      lang === "ja" ? datam["職業"] : datam["job"]
                    }</p>
                    <p class="name">${
                      lang === "ja" ? datam["名前"] : datam["name"]
                    }</p>
                    <p>${lang === "ja" ? datam["略歴"] : datam["biography"]}</p>
                  </div>
                </li>`;
              });
              $(".member_wrapper").append(
                `<h4>${category}</h4><ul>${members_html}</ul>`
              );
            });

            // Map
            var map;
            var marker = [];
            var infowindow = [];
            var currentInfoWindow = null;
            initMap();
            function initMap() {
              map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 20, lng: 136.881556 },
                zoom: 2,
              });

              Object.values(members).forEach((grouped_members, i) => {
                grouped_members.forEach((member) => {
                  const coodinate = member["座標"];
                  coodinate.replace(
                    /lat\:([\d\.]+)\W+lng\:([\d\.]+)/,
                    "$1, $2"
                  );
                  const lat = Number(RegExp.$1);
                  const lng = Number(RegExp.$2);

                  marker[i] = new google.maps.Marker({
                    position: { lat, lng },
                    map,
                    title: member["name"],
                  });

                  // infobox 用の div エレメントを生成
                  var infoboxContent = document.createElement("div");
                  // infobox に表示するHTML
                  infoboxContent.innerHTML = `
                    <div class="infobox">
                      <a class="name" href="#${member["画像タイトル"]}">${
                    member["name"]
                  }</a>
                      <p class="content">${
                        member[lang === "ja" ? "職業" : "job"]
                      }</p>
                    </div>
                  `;
                  infowindow[i] = new google.maps.InfoWindow({
                    content: infoboxContent,
                  });

                  google.maps.event.addListener(
                    marker[i],
                    "click",
                    function () {
                      if (currentInfoWindow) {
                        currentInfoWindow.close();
                      }
                      infowindow[i].open(map, marker[i]);
                      currentInfoWindow = infowindow[i];
                    }
                  );
                });
              });
            }
          },
        });
      }
    },
  };
  initialize[pageType]();
});
