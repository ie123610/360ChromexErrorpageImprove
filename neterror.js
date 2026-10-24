// \u975E 360 \u6D4F\u89C8\u5668\u539F\u751F\u73AF\u5883\uFF08\u5982\u666E\u901A\u6D4F\u89C8\u5668\u9884\u89C8\uFF09\u4E0B\u8865\u4E00\u4E2A\u7A7A\u5B9E\u73B0\uFF0C\u907F\u514D\u811A\u672C\u4E2D\u65AD\u5BFC\u81F4\u767D\u5C4F
var nativeBridge = !!(window.chrome && typeof window.chrome.send === "function");
if (!nativeBridge) {
  window.chrome = window.chrome || {};
  window.chrome.send = function () {};
}

var $ = function (selector) {
    if (selector.substr(0, 1) == "#") {
      return (
        document.getElementById(selector.substr(1, selector.length)) || {
          style: {},
        }
      );
    } else {
      return (
        document.getElementsByTagName(selector) || {
          style: {},
        }
      );
    }
  },
  checkstring = function (str, arr) {
    return str != "" && arr.toString().indexOf(str) > -1;
  },
  make_sug = function (kn, jy) {
    return kn;
    // return '\u53EF\u80FD\u539F\u56E0\uFF1A' + kn + '<br/>\u5EFA\u8BAE\u64CD\u4F5C\uFF1A' + jy;
  },
  setTitle = function () {
    document.title = $("#tips-title").innerHTML;
  },
  showErrorSearchForm = function () {
    // iframeLoadTimeout = true;
    // iframe.style.display = "none";
    // resStatus.style.display = "none";
    // fm.style.display = "inline-block";
    // fm.focus();
  },
  sug_text,
  shownetfixbt = function () {
    $("#suggestion").innerHTML = make_sug(
      sug_text ||
        "\u7F51\u5740\u8FDE\u63A5\u5F02\u5E38\u3001\u9632\u706B\u5899\u6216\u6740\u6BD2\u8F6F\u4EF6\u963B\u6B62\u3001\u5B89\u5168\u95EE\u9898",
      "\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u72B6\u51B5\uFF0C\u6216\u4F7F\u7528360\u65AD\u7F51\u6025\u6551\u7BB1"
    );

    $("#btn-jijiuxiang").style.display = "inline-block";
    $("#btn-jijiuxiang").onclick = function () {
      // \u8C03\u4E24\u6B21\u4F7F\u6025\u6551\u7BB1\u7A97\u53E3\u5728\u6700\u524D\u9762
      chrome.send("startnetfix");
      chrome.send("startnetfix");
    };
  },
  get_domain = function (str) {
    var urlReg =
      /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
    var url = urlReg.exec(str);
    if (url) return url[0];
    else return "";
  },
  is_ip = function (str) {
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
    if (re.test(str)) {
      if (
        RegExp.$1 < 256 &&
        RegExp.$2 < 256 &&
        RegExp.$3 < 256 &&
        RegExp.$4 < 256
      )
        return true;
    }
    return false;
  },
  get_download_site_url = function () {
    var url = "http://baoku.360.cn/soft/show/appid/";
    if (sysinfo_ == "winxp32") {
      return url + "77";
    } else if (sysinfo_ == "winvista32") {
      return url + "105043";
    } else if (sysinfo_ == "winvista64") {
      return url + "105045";
    } else if (sysinfo_ == "win732") {
      return url + "102630048";
    } else if (sysinfo_ == "win764") {
      return url + "102630050";
    } else {
      return "http://baoku.360.cn/soft/search?kw=Internet%20Explorer";
    }
  },
  create_ie_btns = function () {
    var download_site = document.createElement("button");
    download_site.textContent = "\u91CD\u88C5\u7A33\u5B9A\u7248IE";
    download_site.style.display = "inline-block";
    download_site.className = "greenbtn";
    download_site.id = "download_site";
    download_site.onclick = function () {
      chrome.send("navigateToUrl", [
        get_download_site_url(),
        "",
        0,
        false,
        false,
        false,
        false,
      ]);
    };
    var expert_help = document.createElement("button");
    expert_help.textContent = "\u7535\u8111\u4E13\u5BB6\u5E2E\u52A9";
    expert_help.style.display = "inline-block";
    expert_help.className = "graybtn";
    expert_help.id = "expert_help";
    expert_help.onclick = function () {
      chrome.send("navigateToUrl", [
        "http://web.jishi.360.cn/",
        "",
        0,
        false,
        false,
        false,
        false,
      ]);
    };
    var btns_div = document.querySelector(".error-btns");
    btns_div.appendChild(download_site);
    btns_div.appendChild(expert_help);
  },
  // fm = $("#error-search").querySelector('form'),
  // iframe = $("#error-search").querySelector('iframe'),
  // resStatus = $('resStatus'),
  // iframeLoaded = false,
  // iframeLoadTimeout = false,
  // iframeTimer,
  // focus_num = 0,
  showerrorinfo = function (errorcode, lasterrorurl) {
    //var errorcode = $('errorcode').innerHTML, lasterrorurl = $("#lasterrorurl").innerHTML;
    if (lasterrorurl == "") {
      return;
    }

    // iframeLoaded = false;
    // iframeLoadTimeout = false;
    // clearTimeout(iframeTimer);
    //\u521D\u59CB\u5316
    var btnObj = {
      "#btn-refesh": "\u5237\u65B0\u7F51\u9875",
      "#btn-goback": "\u8FD4\u56DE\u4E0A\u4E00\u9875",
      "#btn-gohome": "\u53BB\u8BE5\u7F51\u7AD9\u9996\u9875",
      "#btn-jijiuxiang": "360\u65AD\u7F51\u6025\u6551\u7BB1",
      "#btn-close": "\u5173\u95ED",
    };
    // ,searchFormObj = {
    //   error_search_tip:
    //     "\u60A8\u8FD8\u53EF\u4EE5\u641C\u7D22\u7F51\u9875\u7684\u76F8\u5173\u4FE1\u606F\uFF1A",
    //   "search-q": "\u8BF7\u8F93\u5165\u5173\u952E\u5B57",
    //   error_search_btn: "\u641C\u7D22\u4E00\u4E0B",
    // };
    for (var i in btnObj) {
      $(i).innerHTML = btnObj[i];
    }
    // for (var i in searchFormObj) {
    //   if (i == "search-q") {
    //     $(i).setAttribute("placeholder", searchFormObj[i]);
    //   } else if (i == "error_search_btn") {
    //     $(i).value = searchFormObj[i];
    //   } else {
    //     console.log(9999, i);
    //     $(i).innerHTML = searchFormObj[i];
    //   }
    // }
    $("#btn-refesh").style.display = "none";
    $("#btn-goback").style.display = "none";
    $("#btn-gohome").style.display = "none";
    $("#btn-jijiuxiang").style.display = "none";
    $("#btn-close").style.display = "none";

    // if ($("#download_site")) $("#download_site").remove();
    // if ($("#expert_help")) $("#expert_help").remove();

    //\u9519\u8BEF\u4EE3\u7801\u7EC4\u5408
    var e_dns = [104, 105],
      e_link = [403, 405, 406, 500],
      e_net = [
        118, 106, 324, 138, 109, 130, 331, 346, 349, 350, 107, 128, 117, 129,
        132, 143, 20, 150,
      ];
    // console.log(787, errorcode, e_dns, checkstring(errorcode, e_dns) );
    // console.log(333, errorcode, e_dns, e_net, e_link ,checkstring(errorcode, e_net),checkstring(errorcode, e_link) );

    if (checkstring(errorcode, e_dns) == true) {
      sug_text =
        "\u8BF7\u68C0\u67E5\u57DF\u540D\u62FC\u5199\uFF0C\u53EF\u7528\u201C360\u65AD\u7F51\u6025\u6551\u7BB1\u201D\u68C0\u67E5\u7F51\u7EDC";
      //Dns\u95EE\u9898

      $("#btn-refesh").style.display = "inline-block";
      $("#tips-title").innerHTML = "\u57DF\u540D\u89E3\u6790\u9519\u8BEF";
      setTitle();
      $("#tips-type").innerHTML = "\uFF08DNS\u89E3\u6790\u5931\u8D25\uFF09";
      $("#suggestion").innerHTML = make_sug(sug_text);
      //\u68C0\u67E5\u662F\u5426\u6709\u6025\u6551\u7BB1
      chrome.send("installednetfix");
    } else if (
      checkstring(errorcode, e_net) == true ||
      checkstring(errorcode, e_link) == true
    ) {
      var is_e_link = checkstring(errorcode, e_link) == true;
      sug_text = is_e_link
        ? "\uFF08\u9519\u8BEF\u4EE3\u7801" + errorcode + "\uFF09"
        : "\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8BBE\u7F6E\uFF0C\u53EF\u7528\u201C360\u65AD\u7F51\u6025\u6551\u7BB1\u201D\u68C0\u67E5\u7F51\u7EDC";
      //\u7F51\u7EDC\u95EE\u9898\uFF0C\u4E0D\u663E\u793A\u641C\u7D22
      console.log(888);
      $("#btn-refesh").style.display = "inline-block";
      $("#tips-title").innerHTML = is_e_link
        ? "\u7F51\u9875\u65E0\u6CD5\u8BBF\u95EE"
        : "\u7F51\u7EDC\u8FDE\u63A5\u9519\u8BEF";
      setTitle();
      $("#tips-type").innerHTML = "\uFF08\u7F51\u7EDC\u9519\u8BEF\uFF09";
      $("#suggestion").innerHTML = make_sug(sug_text);
      $("#error-search").style.display = "none";
      //\u68C0\u67E5\u662F\u5426\u6709\u6025\u6551\u7BB1
      chrome.send("installednetfix");
    } else if (errorcode == 404) {
      //404
      $(history.length > 1 ? "#btn-goback" : "#btn-close").style.display =
        "inline-block";
      $("#btn-gohome").style.display = "inline-block";
      $("#tips-title").innerHTML =
        "\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u5220\u9664";
      setTitle();
      $("#tips-type").innerHTML = "\uFF08404\u9519\u8BEF\uFF09";
      $("#suggestion").innerHTML = make_sug(
        "\uFF08\u9519\u8BEF\u4EE3\u7801" + errorcode + "\uFF09",
        "\u68C0\u67E5\u7F51\u5740\u662F\u5426\u6B63\u786E"
      );
    } else if (errorcode == 0x80040154 || errorcode == 0x80040155) {
      $("#tips-title").innerHTML =
        "IE\u6D4F\u89C8\u5668\u51FA\u73B0\u5F02\u5E38";
      setTitle();
      $("#tips-type").innerHTML =
        "\uFF08IE\u5185\u6838\u8C03\u7528\u9519\u8BEF\uFF09";
      var kn =
        "\u60A8\u7684Internet Explorer\u7A0B\u5E8F\u53EF\u80FD\u5DF2\u7ECF\u635F\u574F";
      $("#suggestion").innerHTML =
        "\u53EF\u80FD\u539F\u56E0\uFF1A" +
        kn +
        "<br/>\u5EFA\u8BAE\u5982\u4E0B\u64CD\u4F5C\uFF1A";
      $("#error-search").style.display = "none";
      create_ie_btns();
    } else {
      //\u5176\u4ED6\u95EE\u9898
      $("#btn-refesh").style.display = "inline-block";
      $("#tips-title").innerHTML =
        "\u60A8\u8BBF\u95EE\u7684\u7F51\u9875\u51FA\u9519\u4E86\uFF01";
      setTitle();
      $("#tips-type").innerHTML = "\uFF08\u8FDE\u63A5\u9519\u8BEF\uFF09";
      $("#suggestion").innerHTML = make_sug(
        "\u7F51\u7EDC\u8FDE\u63A5\u5F02\u5E38\u3001\u7F51\u7AD9\u670D\u52A1\u5668\u5931\u53BB\u54CD\u5E94",
        "\u5237\u65B0\u91CD\u8BD5"
      );
    }
    var lasterrorurldomain = get_domain(lasterrorurl),
      type_arr = lasterrorurl.split("://"),
      type_text =
        type_arr[0] != "" && lasterrorurl.indexOf("://") > 0
          ? type_arr[0] + "://"
          : "",
      min_domain = lasterrorurldomain,
      min_domain_arr = min_domain.split("."),
      domain_len = min_domain_arr.length;
    if (is_ip(min_domain)) {
    } else if (domain_len == 3 && min_domain_arr[0] != "www") {
      min_domain = "www." + min_domain_arr[1] + "." + min_domain_arr[2];
    } else if (domain_len > 3) {
      min_domain =
        "www." +
        min_domain_arr[domain_len - 2] +
        "." +
        min_domain_arr[domain_len - 1];
    }

    // if ($("#error-search").style.display != 'none') {
    //   fm.querySelector('input[name="src"]').value = '360chrome_errorpage_' + errorcode;
    //   iframe.src = 'https://www.so.com/brw?src=360chrome_' + errorcode + '&u=' + encodeURIComponent(lasterrorurl);
    //   iframe.onload = function() {
    //     if (iframeLoadTimeout) return;
    //     iframeLoaded = true;
    //     iframe.style.display = 'inline-block';
    //     fm.style.display = 'none';
    //     var hsr = 'HIDE_SEARCH_RESULT',
    //       resStatusFunc = function(hide) {
    //         if (hide) {
    //           iframe.style.height = '40px';
    //           resStatus.innerText = '\u663E\u793A\u641C\u7D22\u7ED3\u679C';
    //           localStorage[hsr] = 1;
    //         } else {
    //           iframe.style.height = '610px';
    //           resStatus.innerText = '\u9690\u85CF\u641C\u7D22\u7ED3\u679C';
    //           localStorage.removeItem(hsr);
    //         }
    //       };
    //     resStatusFunc(localStorage[hsr]);
    //     resStatus.style.display = 'inline-block';
    //     resStatus.onclick = function() {
    //       resStatusFunc(!localStorage[hsr]);
    //     };
    //     if (window.networkOK) {
    //       $("#error-search").style.display = 'block';
    //     }
    //     $('t').style.display = "block";
    //   }
    //   iframeTimer = setTimeout(function() {
    //     if (!iframeLoaded) {
    //       showErrorSearchForm();
    //       // $("#error-search").style.display = 'block';
    //       $('t').style.display = "block";
    //     }
    //   }, 3000);
    // } else {
    $("#t").style.display = "block";
    // }
    //$("#btn-refesh").href = lasterrorurl;
    $("#btn-gohome").href = type_text + min_domain;
    // $("#search-q").value = ""; //lasterrorurl.replace(type_text, '');

    // $("#search-q").onfocus = function () {
    //   if (focus_num == 0) {
    //     focus++;
    //     var _this = this;
    //     setTimeout(function () {
    //       _this.select();
    //     }, 20);
    //   }
    // };
    // $("#search-q").onblur = function () {
    //   focus_num = 0;
    // };
    $("#btn-goback").onclick = function () {
      history.back();
      return false;
    };
    $("#btn-close").onclick = function () {
      window.close();
      return false;
    };
    $("#btn-refesh").onclick = function () {
      window.location = lasterrorurl;
      return false;
    };
  },
  responsesysinfo = function (sysinfo) {
    window.sysinfo_ = sysinfo;
    chrome.send("geterrorinfo");
  };

// \u539F\u751F\u901A\u9053\u53EF\u7528\u65F6\u7531\u539F\u751F\u56DE\u8C03 showerrorinfo\uFF1B\u5426\u5219\u76F4\u63A5\u6E32\u67D3\u9ED8\u8BA4\u9519\u8BEF\u9875
if (nativeBridge) {
  chrome.send("getsysinfo");
} else {
  showerrorinfo(
    parseInt((/[?&]error=([^&]*)/.exec(location.search) || [])[1], 10) || 0,
    decodeURIComponent((/[?&]url=([^&]*)/.exec(location.search) || [])[1] || "") ||
      location.href
  );
}
