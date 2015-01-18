var APIUtil = require('../utils/APIUtil');

var PortalDataActions = {
  sendForm: function(data) {
    APIUtil.sendPortalData(data);
  }
};

module.exports = PortalDataActions;
