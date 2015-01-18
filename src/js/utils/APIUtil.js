var PortalActionCreators = require('../actions/PortalActionCreators');
var BgActionCreators = require('../actions/BgActionCreators');
var Ajax = require('component-ajax');

var rootUrl = "http://rhett.local:1337/";

module.exports = {
  sendPortalData: function(data) {
    var dataJson = JSON.stringify(data, null, " ");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", rootUrl+"api/v1/treatments/", true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(dataJson);
    PortalActionCreators.closeView();
  },
  getBgData: function() {
    Ajax({url: rootUrl+'api/v1/entries.json', success: this._updateBG, crossDomain: true, dataType: 'json'});
  },
  _updateBG: function(xhr, textStatus) {
    var data = xhr;
    console.log(data);
    BgActionCreators.recieveBg(data);
  }
};
