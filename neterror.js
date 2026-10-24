var Frame = {
  api: {
    GetSID() {
      if (Frame.api.sid) {
        return Frame.api.sid;
      }
      try {
        Frame.api.sid = external.GetSID(window);
        return Frame.api.sid;
      } catch (e) {
        return "";
      }
    },
    GetMID() {
      if (Frame.api.mid) {
        return Frame.api.mid;
      }
      Frame.api.mid = Frame.api.GetSID() && external.GetMID(Frame.api.sid);
      return Frame.api.mid;
    },
  },
  sendGif: function (filename, data) {
    var files = [];
    if (Object.prototype.toString.call(filename) == "[object String]") {
      files.push(filename);
    } else if (Object.prototype.toString.call(filename) == "[object Array]") {
      files = filename;
    } else {
      return;
    }
    files.forEach(function (item) {
      var params = "";
      if (data && typeof data == "object") {
        for (var k in data) {
          params += k + "=" + data[k] + "&";
        }
      }
      new Image().src =
        "https://dd.browser.360.cn/static/a/" +
        item +
        "?" +
        params +
        "mid=" +
        Frame.api.GetMID() +
        "&" +
        Date.now() +
        Math.random().toString().replace("0.", "").substr(0, 10);
    });
  },
};

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
      // 点击断网急救箱
      Frame.sendGif('1489.9179.gif')
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
  get_query_param = function (name) {
    var match = new RegExp("[?&]" + name + "=([^&]*)").exec(
      window.location.search
    );
    if (!match) {
      return "";
    }
    try {
      return decodeURIComponent(match[1].replace(/\+/g, " "));
    } catch (e) {
      return match[1];
    }
  },
  HTTP_STATUS_TEXT = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    429: "Too Many Requests",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
  },
  // Chromium \u7F51\u7EDC\u9519\u8BEF\u7801\uFF0C\u6309\u7EDD\u5BF9\u503C\u5339\u914D\uFF0C\u517C\u5BB9 -105 \u4E0E 105 \u4E24\u79CD\u4F20\u5165\u5F62\u5F0F
  NET_ERROR_NAME = {
    2: "ERR_FAILED",
    3: "ERR_ABORTED",
    6: "ERR_FILE_NOT_FOUND",
    7: "ERR_TIMED_OUT",
    9: "ERR_UNEXPECTED",
    10: "ERR_ACCESS_DENIED",
    20: "ERR_UNKNOWN_URL_SCHEME",
    21: "ERR_INVALID_URL",
    100: "ERR_CONNECTION_CLOSED",
    101: "ERR_CONNECTION_RESET",
    102: "ERR_CONNECTION_REFUSED",
    103: "ERR_CONNECTION_ABORTED",
    104: "ERR_CONNECTION_FAILED",
    105: "ERR_NAME_NOT_RESOLVED",
    106: "ERR_INTERNET_DISCONNECTED",
    107: "ERR_SSL_PROTOCOL_ERROR",
    108: "ERR_ADDRESS_INVALID",
    109: "ERR_ADDRESS_UNREACHABLE",
    113: "ERR_SSL_VERSION_OR_CIPHER_MISMATCH",
    118: "ERR_CONNECTION_TIMED_OUT",
    130: "ERR_PROXY_CONNECTION_FAILED",
    137: "ERR_NAME_RESOLUTION_FAILED",
    138: "ERR_NETWORK_ACCESS_DENIED",
    324: "ERR_EMPTY_RESPONSE",
    379: "ERR_HTTP_RESPONSE_CODE_FAILURE / HTTP \u54CD\u5E94\u72B6\u6001\u7801\u9519\u8BEF",
  },
  IE_ERROR_NAME = {
    "0x80040154": "REGDB_E_CLASSNOTREG\uFF08COM \u7C7B\u672A\u6CE8\u518C\uFF09",
    "0x80040155": "REGDB_E_IIDNOTREG\uFF08COM \u63A5\u53E3\u672A\u6CE8\u518C\uFF09",
  },
  get_code_type_text = function (code) {
    var name = code.replace(/^net::/i, "");
    if (/^ERR_/i.test(name)) {
      return name;
    }
    if (/^0x[0-9a-f]+$/i.test(name)) {
      return IE_ERROR_NAME[name.toLowerCase()] || "";
    }
    var num = parseInt(name, 10);
    if (isNaN(num)) {
      return "";
    }
    var abs = Math.abs(num);
    if (abs >= 400 && abs <= 599 && HTTP_STATUS_TEXT[abs]) {
      return "HTTP " + abs + " " + HTTP_STATUS_TEXT[abs];
    }
    return NET_ERROR_NAME[abs] || "";
  },
  show_error_code = function (errorcode) {
    var raw;
    try {
      raw =
        errorcode === undefined || errorcode === null
          ? ""
          : String(errorcode).trim();
      if (!raw) {
        return;
      }
      var type = get_code_type_text(raw);
      var el = $("#tips-code");
      el.textContent =
        "\u9519\u8BEF\u4EE3\u7801\uFF1A" + raw + (type ? "\uFF08" + type + "\uFF09" : "");
      el.style.display = "block";
    } catch (e) {}
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
    // \u672C\u5730\u9884\u89C8\u6216\u539F\u751F\u5C42\u672A\u4F20\u53C2\u65F6\uFF0C\u56DE\u9000\u5230\u9875\u9762\u5730\u5740\u4E2D\u7684 url/error \u53C2\u6570
    if (errorcode === undefined || errorcode === null || errorcode === "") {
      errorcode = get_query_param("error");
    }
    if (!lasterrorurl) {
      lasterrorurl = get_query_param("url");
    }
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
    // 动态添加线上 JS
    var sct = document.createElement("script");
    sct.src = "https://browser.360.cn/se/errorpage_csex_x/errsug7_new.js";
    document.body.appendChild(sct);
    // 动态添加 线上 css
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://browser.360.cn/se/errorpage_csex_x/se_errors.css";
    document.getElementsByTagName("head")[0].appendChild(css);
    // \u8F93\u51FA\u9519\u8BEF\u7801\u4E0E\u9519\u8BEF\u7C7B\u578B
    show_error_code(errorcode);
  },
  responsesysinfo = function (sysinfo) {
    window.sysinfo_ = sysinfo;
    chrome.send("geterrorinfo");
  };
chrome.send("getsysinfo");

// 展现点
Frame.sendGif('1489.9616.gif')
// 加载 ifarme
var iframeHeight,
  iframeReady = false;
// ifarme 通信
window.addEventListener(
  "message",
  function (e) {
    const { type, value } = e.data;
    if (type == "isReady") {
      $("#errors_iframe").style.height = value + "px";
      $("#errors_iframe").style.background = "#eeeeee";
      $("#errors_iframe").style.display = "block";
      iframeReady = true;
    }
    // if (e.data.height) {
    //   // h
    //   iframeHeight = e.data.height;

    //   iframeResize();
    // }
  },
  false
);
