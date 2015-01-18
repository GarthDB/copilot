// var ActionTypes = require('../constants/PortalConstants').ActionTypes;
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');


// Dispatcher
var PortalDispatcher = assign(new Dispatcher(), {

  handleViewAction: function(action) {
    this.dispatch(action);
  }
});


module.exports = PortalDispatcher;
