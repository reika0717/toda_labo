$(function() {
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
    let file_name = window.location.href.split('/').pop().replace('.html', '')
    console.log('file_name', file_name)
    $(`.child_nav`).removeClass('active')
    $(`.child_nav.${file_name}`).addClass('active')
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

  // var script_fontawesome = document.createElement("script");
  // script_fontawesome.setAttribute(
  //   "src",
  //   "https://kit.fontawesome.com/04e6437977.js"
  // );
  // document.head.appendChild(script_fontawesome);

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
                >`
      }

      // ページプラグインを追加する要素
      var facebookWrap = $('.fb-iframe-container');
      var fbBeforeWidth = ''; // 前回変更したときの幅
      var fbWidth = facebookWrap.width(); // 今回変更する幅
      var fbTimer = false;
      $(window).on('load resize', function () {
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
    project: function() {},
    member: function() {
      if (location.pathname === "/toda_labo/active_member.html") {
        $.ajax({
          url:
            "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/ow66bcr/public/values?alt=json",
          dataType: "json",
          async: true,
          success: function (data) {
            let entries = data.feed.entry;
            let key_order = {}
            for (let i = 0; i < entries.length; i++) {
              if (entries[i].gs$cell.row === "2") {
                break;
              }
              key_order[entries[i].gs$cell.$t] = Number(entries[i].gs$cell.col)
            }
            let key_length = Object.keys(key_order).length
            let single_profile = `<ul>`
            for (let i = key_length; i < entries.length; i = i + key_length) {
              let biography_content =
                entries[i + key_order[column_title.biography_title_ja] - 1]
                  .content.$t;
              biography_content = biography_content === '-' ? '' : `<p class="biography">${biography_content}</p>`
              single_profile += `
              <li class="single_profile">
                <img src="./assets/images/members/${
                  entries[i + key_order[column_title.image_title] - 1].content
                    .$t
                }.jpg"/>
                <div>
                  <p class="position">${
                    entries[i + key_order[column_title.position_title_ja] - 1]
                      .content.$t
                  }</p>
                  <p class="name">${
                    entries[i + key_order[column_title.name_title_ja] - 1]
                      .content.$t
                  }</p>
                  ${biography_content}
                  <p class="comment">${
                    entries[i + key_order[column_title.comment_title_ja] - 1]
                      .content.$t
                  }</p>
                </div>
              </li>
            `;
            }
            single_profile += `</ul>`
            $('.member_wrapper').append(single_profile)
          }
        });
      } else if (location.pathname === "/toda_labo/en/active_member.html") {
        $.ajax({
          url:
            "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/ow66bcr/public/values?alt=json",
          dataType: "json",
          async: true,
          success: function (data) {
            let entries = data.feed.entry;
            let key_order = {}
            for (let i = 0; i < entries.length; i++) {
              if (entries[i].gs$cell.row === "2") {
                break;
              }
              key_order[entries[i].gs$cell.$t] = Number(entries[i].gs$cell.col)
            }
            let key_length = Object.keys(key_order).length
            let single_profile = `<ul>`
            for (let i = key_length; i < entries.length; i = i + key_length) {
              let biography_content =
                entries[i + key_order[column_title.biography_title_en] - 1]
                  .content.$t;
              biography_content = biography_content === '-' ? '' : `<p class="biography">${biography_content}</p>`
              single_profile += `
              <li class="single_profile">
                <img src="../assets/images/members/${
                  entries[i + key_order[column_title.image_title] - 1].content
                    .$t
                }.jpg"/>
                <div>
                  <p class="position">${
                    entries[i + key_order[column_title.position_title_en] - 1]
                      .content.$t
                  }</p>
                  <p class="name">${
                    entries[i + key_order[column_title.name_title_en] - 1]
                      .content.$t
                  }</p>
                  ${biography_content}
                  <p class="comment">${
                    entries[i + key_order[column_title.comment_title_en] - 1]
                      .content.$t
                  }</p>
                </div>
              </li>
            `;
            }
            single_profile += `</ul>`
            $('.member_wrapper').append(single_profile)
          }
        });
      } else if (location.pathname === "/toda_labo/obog.html") {
        $.ajax({
          url:
            "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/olry89r/public/values?alt=json",
          dataType: "json",
          async: true,
          success: function (data) {
            // データ整形
            let member_address = []
            let entries = data.feed.entry;
            let key_order = {}
            for (let i = 0; i < entries.length; i++) {
              if (entries[i].gs$cell.row === "2") {
                break;
              }
              key_order[entries[i].gs$cell.$t] = Number(entries[i].gs$cell.col)
            }
            let key_length = Object.keys(key_order).length
            // リスト描画
            let researcher_profile = `<h4>大学・研究所</h4><ul>`
            let officer_profile = `<h4>国家・地方公務員、財団法人</h4><ul>`
            let teacher_profile = `<h4>学校教員（小中高）</h4><ul>`
            let company_profile = `<h4>企業</h4><ul>`
            let interenational_profile = `<h4>国際協力</h4><ul>`
            for (let i = key_length; i < entries.length; i = i + key_length) {
              let plot_content = entries[i + key_order['座標'] - 1].content.$t
              let job_content = entries[i + key_order['職業'] - 1].content.$t
              let biography_content =
                entries[i + key_order[column_title.biography_title_ja] - 1]
                  .content.$t;
              if (plot_content !== '-') {
                let obj = {}
                obj["id"] =
                  entries[
                    i + key_order[column_title.image_title] - 1
                  ].content.$t;
                obj["name"] =
                  entries[
                    i + key_order[column_title.name_title_ja] - 1
                  ].content.$t;
                obj["content"] = job_content;
                plot_content.replace(/lat:(\-?\d+\.+?\d+)\,lng:(\-?\d+\.+?\d+)/, '$1, $2')
                obj['lat'] = Number(RegExp.$1)
                obj['lng'] = Number(RegExp.$2)
                member_address.push(obj)
              }
              biography_content = biography_content === '-' ? '' : `<p class="biography"><span class="title">略歴：</span>${biography_content}</p>`
              job_content =
                job_content === "-"
                  ? ""
                  : `<p class="job">${job_content}</p>`;
              let profile = `
                <li class="single_profile" id="${
                  entries[i + key_order[column_title.image_title] - 1].content.$t
                }">
                  <img src="./assets/images/members/${
                    entries[i + key_order[column_title.image_title] - 1].content.$t
                  }.jpg"/>
                  <div>
                    ${job_content}
                    <p class="name">${
                      entries[i + key_order[column_title.name_title_ja] - 1]
                        .content.$t
                    }</p>
                    ${biography_content}
                  </div>
                </li>
              `;
              switch (entries[i + key_order['カテゴリ'] - 1].content.$t) {
                case "大学・研究所":
                  researcher_profile += profile
                  break;
                case "国家・地方公務員、財団法人":
                  researcher_profile += profile
                  break;
                case "学校教員（小中高）":
                  teacher_profile += profile
                  break;
                case "企業":
                  company_profile += profile
                  break;
                case "国際協力":
                  interenational_profile += profile
                  break;
              }
            }
            researcher_profile += `</ul>`
            teacher_profile += `</ul>`
            company_profile += `</ul>`
            interenational_profile += `</ul>`
            $('.member_wrapper').append(researcher_profile).append(teacher_profile).append(company_profile).append(interenational_profile)

            // Map
            var map;
            var marker = [];
            var infowindow = [];
            var currentInfoWindow = null;
            initMap()
            function initMap() {
              map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 20, lng: 136.881556 },
                zoom: 2
              });

              member_address.forEach(function (val, i) {
                var markerLatLng = { lat: member_address[i]['lat'], lng: member_address[i]['lng'] };

                marker[i] = new google.maps.Marker({
                  position: markerLatLng,
                  map: map,
                  title: member_address[i][column_title.name_title_en],
                });

                // infobox 用の div エレメントを生成
                var infoboxContent = document.createElement('div');
                // infobox に表示するHTML
                infoboxContent.innerHTML = `
                  <div class="infobox">
                    <a class="name" href="#${member_address[i]["id"]}">${
                  member_address[i][column_title.name_title_en]
                }</a>
                    <p class="content">${member_address[i]["content"]}</p>
                  </div >
                `;
                infowindow[i] = new google.maps.InfoWindow({
                  content: infoboxContent
                });

                google.maps.event.addListener(marker[i], 'click', function () {
                  if (currentInfoWindow) {
                    currentInfoWindow.close();
                  }
                  infowindow[i].open(map, marker[i]);
                  currentInfoWindow = infowindow[i]
                });
              });
            }
          }
        });
      } else if(location.pathname === "/toda_labo/en/obog.html") {
        $.ajax({
          url:
            "https://spreadsheets.google.com/feeds/cells/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/olry89r/public/values?alt=json",
          dataType: "json",
          async: true,
          success: function (data) {
            // データ整形
            let member_address = []
            let entries = data.feed.entry;
            let key_order = {}
            for (let i = 0; i < entries.length; i++) {
              if (entries[i].gs$cell.row === "2") {
                break;
              }
              key_order[entries[i].gs$cell.$t] = Number(entries[i].gs$cell.col)
            }
            let key_length = Object.keys(key_order).length
            // リスト描画
            let researcher_profile = `<h4>Researcher</h4><ul>`
            let officer_profile = `<h4>Public office worker</h4><ul>`
            let teacher_profile = `<h4>Teacher</h4><ul>`
            let company_profile = `<h4>Office Worker</h4><ul>`
            let interenational_profile = `<h4>International Organization Worker</h4><ul>`
            for (let i = key_length; i < entries.length; i = i + key_length) {
              let plot_content = entries[i + key_order['座標'] - 1].content.$t
              let job_content = entries[i + key_order['job'] - 1].content.$t
              let biography_content =
                entries[i + key_order[column_title.biography_title_en] - 1]
                  .content.$t;
              if (plot_content !== '-') {
                let obj = {}
                obj['id'] = entries[i + key_order[column_title.image_title] - 1].content.$t
                obj[column_title.name_title_en] =
                  entries[
                    i + key_order[column_title.name_title_en] - 1
                  ].content.$t;
                obj["content"] = job_content;
                plot_content.replace(/lat:(\-?\d+\.+?\d+)\,lng:(\-?\d+\.+?\d+)/, '$1, $2')
                obj['lat'] = Number(RegExp.$1)
                obj['lng'] = Number(RegExp.$2)
                member_address.push(obj)
              }
              biography_content =
                biography_content === "-"
                  ? ""
                  : `<p class="biography"><span class="title">Biography：</span>${biography_content}</p>`;
              job_content =
                job_content === "-"
                  ? ""
                  : `<p class="job">${job_content}</p>`;
              let profile = `
                <li class="single_profile" id="${
                  entries[i + key_order[column_title.image_title] - 1].content.$t
                }">
                  <img src="../assets/images/members/${
                    entries[i + key_order[column_title.image_title] - 1].content.$t
                  }.jpg"/>
                  <div>
                    ${job_content}
                    <p class="name">${
                      entries[i + key_order[column_title.name_title_en] - 1]
                        .content.$t
                    }</p>
                    ${biography_content}
                  </div>
                </li>
              `;
              switch (entries[i + key_order['カテゴリ'] - 1].content.$t) {
                case "大学・研究所":
                  researcher_profile += profile
                  break;
                case "国家・地方公務員、財団法人":
                  officer_profile += profile
                  break;
                case "学校教員（小中高）":
                  teacher_profile += profile
                  break;
                case "企業":
                  company_profile += profile
                  break;
                case "国際協力":
                  interenational_profile += profile
                  break;
              }
            }
            researcher_profile += `</ul>`
            teacher_profile += `</ul>`
            company_profile += `</ul>`
            interenational_profile += `</ul>`
            $('.member_wrapper').append(researcher_profile).append(officer_profile).append(teacher_profile).append(company_profile).append(interenational_profile)

            // Map
            var map;
            var marker = [];
            var infowindow = [];
            var currentInfoWindow = null;
            initMap()
            function initMap() {
              map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 20, lng: 136.881556 },
                zoom: 2
              });

              member_address.forEach(function (val, i) {
                var markerLatLng = { lat: member_address[i]['lat'], lng: member_address[i]['lng'] };

                marker[i] = new google.maps.Marker({
                  position: markerLatLng,
                  map: map,
                  title: member_address[i][column_title.name_title_en],
                });

                // infobox 用の div エレメントを生成
                var infoboxContent = document.createElement('div');
                // infobox に表示するHTML
                infoboxContent.innerHTML = `
                  <div class="infobox">
                    <a class="name" href="#${member_address[i]["id"]}">${
                  member_address[i][column_title.name_title_en]
                }</a>
                    <p class="content">${member_address[i]["content"]}</p>
                  </div >
                `;
                infowindow[i] = new google.maps.InfoWindow({
                  content: infoboxContent
                });

                google.maps.event.addListener(marker[i], 'click', function () {
                  if (currentInfoWindow) {
                    currentInfoWindow.close();
                  }
                  infowindow[i].open(map, marker[i]);
                  currentInfoWindow = infowindow[i]
                });
              });
            }
          }
        });
      }
    }
  };
  console.log(pageType);
  initialize[pageType]();
});
