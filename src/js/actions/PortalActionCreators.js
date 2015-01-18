var PortalDispatcher = require('../dispatcher/PortalDispatcher');
var ActionTypes = require('../constants/PortalConstants').ActionTypes;

var PortalActions = {
  switchView: function(view) {
    PortalDispatcher.handleViewAction({
      actionType: ActionTypes.SWITCH_FORM,
      view: view
    });
  },
  closeView: function() {
    PortalDispatcher.handleViewAction({
      actionType: ActionTypes.CLOSE_FORM
    });
  }
};

module.exports = PortalActions;
