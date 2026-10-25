var $ = function (selector) {
    if (selector.substr(0, 1) == "#") {
      return (
        document.getElementById(selector.substr(1, selector.length)) || {
          style: {},
        }
      );
    } else {
      var tags = document.getElementsByTagName(selector);
      return tags.length ? tags[0] : { style: {} };
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
  // HTTP \u72B6\u6001\u7801\uFF08\u670D\u52A1\u7AEF\u8FD4\u56DE\u7684 4xx/5xx\uFF09
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
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
  },
  // Chromium \u7F51\u7EDC\u9519\u8BEF\u7801\uFF08\u6309\u7EDD\u5BF9\u503C\u67E5\u627E\uFF0C\u517C\u5BB9 105 \u4E0E -105\uFF09
  NET_ERROR_NAME = {"-10":"ERR_ACCESS_DENIED","-108":"ERR_ADDRESS_INVALID","-147":"ERR_ADDRESS_IN_USE","-109":"ERR_ADDRESS_UNREACHABLE","-503":"ERR_ADD_USER_CERT_FAILED","-122":"ERR_ALPN_NEGOTIATION_FAILED","-117":"ERR_BAD_SSL_CLIENT_AUTH_CERT","-22":"ERR_BLOCKED_BY_ADMINISTRATOR","-20":"ERR_BLOCKED_BY_CLIENT","-30":"ERR_BLOCKED_BY_CSP","-32":"ERR_BLOCKED_BY_ORB","-27":"ERR_BLOCKED_BY_RESPONSE","-384":"ERR_CACHED_IP_ADDRESS_SPACE_BLOCKED_BY_PRIVATE_NETWORK_ACCESS_POLICY","-410":"ERR_CACHE_AUTH_FAILURE_AFTER_READ","-408":"ERR_CACHE_CHECKSUM_MISMATCH","-407":"ERR_CACHE_CHECKSUM_READ_FAILURE","-405":"ERR_CACHE_CREATE_FAILURE","-412":"ERR_CACHE_DOOM_FAILURE","-411":"ERR_CACHE_ENTRY_NOT_SUITABLE","-409":"ERR_CACHE_LOCK_TIMEOUT","-400":"ERR_CACHE_MISS","-404":"ERR_CACHE_OPEN_FAILURE","-413":"ERR_CACHE_OPEN_OR_CREATE_FAILURE","-403":"ERR_CACHE_OPERATION_NOT_SUPPORTED","-406":"ERR_CACHE_RACE","-401":"ERR_CACHE_READ_FAILURE","-402":"ERR_CACHE_WRITE_FAILURE","-214":"ERR_CERTIFICATE_TRANSPARENCY_REQUIRED","-202":"ERR_CERT_AUTHORITY_INVALID","-200":"ERR_CERT_COMMON_NAME_INVALID","-203":"ERR_CERT_CONTAINS_ERRORS","-714":"ERR_CERT_DATABASE_CHANGED","-201":"ERR_CERT_DATE_INVALID","-219":"ERR_CERT_END","-207":"ERR_CERT_INVALID","-217":"ERR_CERT_KNOWN_INTERCEPTION_BLOCKED","-212":"ERR_CERT_NAME_CONSTRAINT_VIOLATION","-210":"ERR_CERT_NON_UNIQUE_NAME","-204":"ERR_CERT_NO_REVOCATION_MECHANISM","-206":"ERR_CERT_REVOKED","-215":"ERR_CERT_SYMANTEC_LEGACY","-205":"ERR_CERT_UNABLE_TO_CHECK_REVOCATION","-213":"ERR_CERT_VALIDITY_TOO_LONG","-716":"ERR_CERT_VERIFIER_CHANGED","-211":"ERR_CERT_WEAK_KEY","-208":"ERR_CERT_WEAK_SIGNATURE_ALGORITHM","-29":"ERR_CLEARTEXT_NOT_PERMITTED","-151":"ERR_CLIENT_AUTH_CERT_TYPE_UNSUPPORTED","-103":"ERR_CONNECTION_ABORTED","-100":"ERR_CONNECTION_CLOSED","-104":"ERR_CONNECTION_FAILED","-102":"ERR_CONNECTION_REFUSED","-101":"ERR_CONNECTION_RESET","-118":"ERR_CONNECTION_TIMED_OUT","-330":"ERR_CONTENT_DECODING_FAILED","-371":"ERR_CONTENT_DECODING_INIT_FAILED","-354":"ERR_CONTENT_LENGTH_MISMATCH","-26":"ERR_CONTEXT_SHUT_DOWN","-171":"ERR_CT_CONSISTENCY_PROOF_PARSING_FAILED","-169":"ERR_CT_STH_INCOMPLETE","-168":"ERR_CT_STH_PARSING_FAILED","-812":"ERR_DICTIONARY_LOAD_FAILED","-301":"ERR_DISALLOWED_URL_SCHEME","-804":"ERR_DNS_CACHE_MISS","-800":"ERR_DNS_MALFORMED_RESPONSE","-809":"ERR_DNS_NAME_HTTPS_ONLY","-811":"ERR_DNS_NO_MATCHING_SUPPORTED_ALPN","-810":"ERR_DNS_REQUEST_CANCELLED","-805":"ERR_DNS_SEARCH_EMPTY","-808":"ERR_DNS_SECURE_RESOLVER_HOSTNAME_RESOLUTION_FAILED","-802":"ERR_DNS_SERVER_FAILED","-801":"ERR_DNS_SERVER_REQUIRES_TCP","-806":"ERR_DNS_SORT_ERROR","-803":"ERR_DNS_TIMED_OUT","-178":"ERR_EARLY_DATA_REJECTED","-184":"ERR_ECH_FALLBACK_CERTIFICATE_INVALID","-183":"ERR_ECH_NOT_NEGOTIATED","-324":"ERR_EMPTY_RESPONSE","-333":"ERR_ENCODING_CONVERSION_FAILED","-340":"ERR_ENCODING_DETECTION_FAILED","-2":"ERR_FAILED","-16":"ERR_FILE_EXISTS","-6":"ERR_FILE_NOT_FOUND","-18":"ERR_FILE_NO_SPACE","-17":"ERR_FILE_PATH_TOO_LONG","-8":"ERR_FILE_TOO_BIG","-19":"ERR_FILE_VIRUS_INFECTED","-607":"ERR_FTP_BAD_COMMAND_SEQUENCE","-606":"ERR_FTP_COMMAND_NOT_SUPPORTED","-601":"ERR_FTP_FAILED","-604":"ERR_FTP_FILE_BUSY","-602":"ERR_FTP_SERVICE_UNAVAILABLE","-605":"ERR_FTP_SYNTAX_ERROR","-603":"ERR_FTP_TRANSFER_ABORTED","-31":"ERR_H2_OR_QUIC_REQUIRED","-119":"ERR_HOST_RESOLVER_QUEUE_TOO_LARGE","-363":"ERR_HTTP2_COMPRESSION_ERROR","-361":"ERR_HTTP2_FLOW_CONTROL_ERROR","-362":"ERR_HTTP2_FRAME_SIZE_ERROR","-360":"ERR_HTTP2_INADEQUATE_TRANSPORT_SECURITY","-352":"ERR_HTTP2_PING_FAILED","-337":"ERR_HTTP2_PROTOCOL_ERROR","-372":"ERR_HTTP2_RST_STREAM_NO_ERROR_RECEIVED","-351":"ERR_HTTP2_SERVER_REFUSED_STREAM","-376":"ERR_HTTP2_STREAM_CLOSED","-140":"ERR_HTTPS_PROXY_TUNNEL_RESPONSE_REDIRECT","-365":"ERR_HTTP_1_1_REQUIRED","-379":"ERR_HTTP_RESPONSE_CODE_FAILURE","-166":"ERR_ICANN_NAME_COLLISION","-705":"ERR_IMPORT_CA_CERT_FAILED","-703":"ERR_IMPORT_CA_CERT_NOT_CA","-704":"ERR_IMPORT_CERT_ALREADY_EXISTS","-706":"ERR_IMPORT_SERVER_CERT_FAILED","-355":"ERR_INCOMPLETE_CHUNKED_ENCODING","-347":"ERR_INCOMPLETE_HTTP2_HEADERS","-383":"ERR_INCONSISTENT_IP_ADDRESS_SPACE","-501":"ERR_INSECURE_RESPONSE","-12":"ERR_INSUFFICIENT_RESOURCES","-106":"ERR_INTERNET_DISCONNECTED","-4":"ERR_INVALID_ARGUMENT","-338":"ERR_INVALID_AUTH_CREDENTIALS","-321":"ERR_INVALID_CHUNKED_ENCODING","-182":"ERR_INVALID_ECH_CONFIG_LIST","-5":"ERR_INVALID_HANDLE","-370":"ERR_INVALID_HTTP_RESPONSE","-303":"ERR_INVALID_REDIRECT","-320":"ERR_INVALID_RESPONSE","-504":"ERR_INVALID_SIGNED_EXCHANGE","-300":"ERR_INVALID_URL","-505":"ERR_INVALID_WEB_BUNDLE","-710":"ERR_KEY_GENERATION_FAILED","-329":"ERR_MALFORMED_IDENTITY","-131":"ERR_MANDATORY_PROXY_CONFIGURATION_FAILED","-322":"ERR_METHOD_NOT_SUPPORTED","-343":"ERR_MISCONFIGURED_AUTH_ENVIRONMENT","-341":"ERR_MISSING_AUTH_CREDENTIALS","-142":"ERR_MSG_TOO_BIG","-105":"ERR_NAME_NOT_RESOLVED","-137":"ERR_NAME_RESOLUTION_FAILED","-138":"ERR_NETWORK_ACCESS_DENIED","-21":"ERR_NETWORK_CHANGED","-331":"ERR_NETWORK_IO_SUSPENDED","-11":"ERR_NOT_IMPLEMENTED","-176":"ERR_NO_BUFFER_SPACE","-502":"ERR_NO_PRIVATE_KEY_FOR_CERT","-112":"ERR_NO_SSL_VERSIONS_ENABLED","-336":"ERR_NO_SUPPORTED_PROXIES","-13":"ERR_OUT_OF_MEMORY","-348":"ERR_PAC_NOT_IN_DHCP","-327":"ERR_PAC_SCRIPT_FAILED","-367":"ERR_PAC_SCRIPT_TERMINATED","-701":"ERR_PKCS12_IMPORT_BAD_PASSWORD","-702":"ERR_PKCS12_IMPORT_FAILED","-708":"ERR_PKCS12_IMPORT_INVALID_FILE","-707":"ERR_PKCS12_IMPORT_INVALID_MAC","-709":"ERR_PKCS12_IMPORT_UNSUPPORTED","-133":"ERR_PRECONNECT_MAX_SOCKET_LIMIT","-712":"ERR_PRIVATE_KEY_EXPORT_FAILED","-127":"ERR_PROXY_AUTH_REQUESTED","-364":"ERR_PROXY_AUTH_REQUESTED_WITH_NO_CONNECTION","-115":"ERR_PROXY_AUTH_UNSUPPORTED","-136":"ERR_PROXY_CERTIFICATE_INVALID","-130":"ERR_PROXY_CONNECTION_FAILED","-366":"ERR_PROXY_HTTP_1_1_REQUIRED","-380":"ERR_QUIC_CERT_ROOT_NOT_KNOWN","-381":"ERR_QUIC_GOAWAY_REQUEST_CAN_BE_RETRIED","-358":"ERR_QUIC_HANDSHAKE_FAILED","-356":"ERR_QUIC_PROTOCOL_ERROR","-174":"ERR_READ_IF_READY_NOT_IMPLEMENTED","-328":"ERR_REQUEST_RANGE_NOT_SATISFIABLE","-345":"ERR_RESPONSE_BODY_TOO_BIG_TO_DRAIN","-349":"ERR_RESPONSE_HEADERS_MULTIPLE_CONTENT_DISPOSITION","-346":"ERR_RESPONSE_HEADERS_MULTIPLE_CONTENT_LENGTH","-350":"ERR_RESPONSE_HEADERS_MULTIPLE_LOCATION","-325":"ERR_RESPONSE_HEADERS_TOO_BIG","-357":"ERR_RESPONSE_HEADERS_TRUNCATED","-713":"ERR_SELF_SIGNED_CERT_GENERATION_FAILED","-23":"ERR_SOCKET_IS_CONNECTED","-15":"ERR_SOCKET_NOT_CONNECTED","-162":"ERR_SOCKET_RECEIVE_BUFFER_SIZE_UNCHANGEABLE","-163":"ERR_SOCKET_SEND_BUFFER_SIZE_UNCHANGEABLE","-160":"ERR_SOCKET_SET_RECEIVE_BUFFER_SIZE_ERROR","-161":"ERR_SOCKET_SET_SEND_BUFFER_SIZE_ERROR","-120":"ERR_SOCKS_CONNECTION_FAILED","-121":"ERR_SOCKS_CONNECTION_HOST_UNREACHABLE","-149":"ERR_SSL_BAD_PEER_PUBLIC_KEY","-126":"ERR_SSL_BAD_RECORD_MAC_ALERT","-164":"ERR_SSL_CLIENT_AUTH_CERT_BAD_FORMAT","-110":"ERR_SSL_CLIENT_AUTH_CERT_NEEDED","-135":"ERR_SSL_CLIENT_AUTH_CERT_NO_PRIVATE_KEY","-177":"ERR_SSL_CLIENT_AUTH_NO_COMMON_ALGORITHMS","-134":"ERR_SSL_CLIENT_AUTH_PRIVATE_KEY_ACCESS_DENIED","-141":"ERR_SSL_CLIENT_AUTH_SIGNATURE_FAILED","-125":"ERR_SSL_DECOMPRESSION_FAILURE_ALERT","-153":"ERR_SSL_DECRYPT_ERROR_ALERT","-148":"ERR_SSL_HANDSHAKE_NOT_COMPLETED","-181":"ERR_SSL_KEY_USAGE_INCOMPATIBLE","-123":"ERR_SSL_NO_RENEGOTIATION","-172":"ERR_SSL_OBSOLETE_CIPHER","-150":"ERR_SSL_PINNED_KEY_NOT_IN_CERT_CHAIN","-107":"ERR_SSL_PROTOCOL_ERROR","-114":"ERR_SSL_RENEGOTIATION_REQUESTED","-167":"ERR_SSL_SERVER_CERT_BAD_FORMAT","-156":"ERR_SSL_SERVER_CERT_CHANGED","-159":"ERR_SSL_UNRECOGNIZED_NAME_ALERT","-113":"ERR_SSL_VERSION_OR_CIPHER_MISMATCH","-332":"ERR_SYN_REPLY_NOT_RECEIVED","-139":"ERR_TEMPORARILY_THROTTLED","-7":"ERR_TIMED_OUT","-180":"ERR_TLS13_DOWNGRADE_DETECTED","-382":"ERR_TOO_MANY_ACCEPT_CH_RESTARTS","-310":"ERR_TOO_MANY_REDIRECTS","-375":"ERR_TOO_MANY_RETRIES","-506":"ERR_TRUST_TOKEN_OPERATION_FAILED","-507":"ERR_TRUST_TOKEN_OPERATION_SUCCESS_WITHOUT_SENDING_REQUEST","-111":"ERR_TUNNEL_CONNECTION_FAILED","-170":"ERR_UNABLE_TO_REUSE_CONNECTION_FOR_PROXY_AUTH","-344":"ERR_UNDOCUMENTED_SECURITY_LIBRARY_STATUS","-9":"ERR_UNEXPECTED","-323":"ERR_UNEXPECTED_PROXY_AUTH","-342":"ERR_UNEXPECTED_SECURITY_LIBRARY_STATUS","-302":"ERR_UNKNOWN_URL_SCHEME","-334":"ERR_UNRECOGNIZED_FTP_DIRECTORY_LISTING_FORMAT","-312":"ERR_UNSAFE_PORT","-311":"ERR_UNSAFE_REDIRECT","-339":"ERR_UNSUPPORTED_AUTH_SCHEME","-14":"ERR_UPLOAD_FILE_CHANGED","-25":"ERR_UPLOAD_STREAM_REWIND_NOT_SUPPORTED","-124":"ERR_WINSOCK_UNEXPECTED_WRITTEN_BYTES","-179":"ERR_WRONG_VERSION_ON_EARLY_DATA","-145":"ERR_WS_PROTOCOL_ERROR","-154":"ERR_WS_THROTTLE_QUEUE_TOO_LARGE","-173":"ERR_WS_UPGRADE"},
  IE_ERROR_NAME = {
    "0x80040154": "REGDB_E_CLASSNOTREG\uFF08COM \u7C7B\u672A\u6CE8\u518C\uFF09",
    "0x80040155": "REGDB_E_IIDNOTREG\uFF08COM \u63A5\u53E3\u672A\u6CE8\u518C\uFF09",
  },
  get_code_type_text = function (code) {
    var raw = String(code).trim();
    if (raw == "") {
      return "";
    }
    if (/^ERR_/i.test(raw)) {
      return raw.toUpperCase();
    }
    if (/^0x[0-9a-f]+$/i.test(raw)) {
      return IE_ERROR_NAME[raw.toLowerCase()] || "";
    }
    var num = parseInt(raw, 10);
    if (isNaN(num)) {
      return "";
    }
    if (num >= 400 && num <= 599 && HTTP_STATUS_TEXT[num]) {
      return "HTTP " + num + " " + HTTP_STATUS_TEXT[num];
    }
    return NET_ERROR_NAME[String(-Math.abs(num))] || "";
  },
  show_error_code = function (errorcode) {
    var raw = errorcode == null ? "" : String(errorcode).trim();
    if (raw == "") {
      return;
    }
    var type = get_code_type_text(raw);
    var el = $("#tips-code");
    el.textContent =
      "\u9519\u8BEF\u4EE3\u7801\uFF1A" + raw + (type ? "\uFF08" + type + "\uFF09" : "");
    el.style.display = "block";
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
    show_error_code(errorcode);
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
chrome.send("getsysinfo");

