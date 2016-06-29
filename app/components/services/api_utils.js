// var locales = require("./locales");
// var ReactIntl = require("react-intl");
//
// var intlData = locales.getReactIntlData();
// var intlMixin = ReactIntl.IntlMixin;
// intlMixin.props = intlData;

export default {

  _params: function(params) {
    var q = "",
        key,
        i;

    for (key in params) {
      if (params.hasOwnProperty(key)) {
        if (params[key] instanceof Array) {
          for (i = 0; i < params[key].length; i++) {
            q += encodeURI(key + "[]=" + params[key][i] + "&");
          }
        } else {
          q += encodeURI(key + "=" + params[key] + "&");
        }
      }
    }

    return q.slice(0, -1);
  },

  _request: function(method, path, backendId, auth, successCallback, errorCallback, data, version = "/1") {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(event) {
      var target = event.target;
      if (target.readyState === XMLHttpRequest.DONE) {
        if (target.status === 200 && successCallback) {
          successCallback(target.response);
        } else if (errorCallback) {
          if (target.status === 0) {
            errorCallback({
              // error: intlMixin.getIntlMessage("connectionError")
              error: "connectionError"
            });
          } else {
            errorCallback(target.response);
          }
        }
      }
    };

    req.timeout = 90000;
    req.responseType = "json";
    req.open(method, "https://" +backendId + ".spacedog.io" + version + path);

    if (auth) {
      req.setRequestHeader("Authorization", auth);
    }


    if (method === "POST") {
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    } else {
      req.send();
    }
  },

  delete: function(path, backendId, auth, successCallback, errorCallback, version = "/1") {
    this._request("DELETE", path, backendId, auth, successCallback, errorCallback, null, version);
  },

  get: function(path, params, backendId, auth, successCallback, errorCallback, version = "/1") {
    if (params) {
      path += "?" + this._params(params);
    }

    this._request("GET", path, backendId, auth, successCallback, errorCallback, null, version);
  },

  post: function(path, params, backendId, auth, successCallback, errorCallback, version = "/1") {
    if (!params) {
      params = {};
    }

    // if (!params.locale) {
    //   params.locale = locales.getCurrentLocale();
    // }

    this._request("POST", path, auth, successCallback, errorCallback, JSON.stringify(params), version);
  }

};
