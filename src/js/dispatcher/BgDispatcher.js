// var ActionTypes = require('../constants/PortalConstants').ActionTypes;
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');


// Dispatcher
var BgDispatcher = assign(new Dispatcher(), {

  handleBgAction: function(action) {
    this.dispatch(action);
  }
});


module.exports = BgDispatcher;
