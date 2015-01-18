var BgDispatcher = require('../dispatcher/BgDispatcher');
var ActionTypes = require('../constants/BgConstants').ActionTypes;

var BgDataActions = {
  recieveBg: function(data) {
    BgDispatcher.handleBgAction({
      type: ActionTypes.BG_UPDATE,
      data: data
    });
  }
};

module.exports = BgDataActions;
