var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PortalDispatcher = require('../dispatcher/PortalDispatcher');
var PortalConstants = require('../constants/PortalConstants').ActionTypes;

var CHANGE_EVENT = 'change';

var _views = ['BgForm','PumpForm','CarbForm','ChampionForm'];
var _currentViewID = null;

function switchView(view) {
  for (var id in _views) {
    if (_views[id] == view){
      _currentViewID = id;
      return id;
    }
  }
}
function closeView() {
  _currentViewID = null;
  return null;
}

var PortalStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getAllViews: function() {
    return _views;
  },
  getCurrentView: function() {
    if(_currentViewID != null){
      return _views[_currentViewID];
    } else {
      return null;
    }
  },
  isOpen: function() {
    return (_currentViewID != null);
  }
});

PortalDispatcher.register(function(action) {
  switch(action.actionType) {
    case PortalConstants.SWITCH_FORM:
      switchView(action.view);
      PortalStore.emitChange();
      break;
    case PortalConstants.CLOSE_FORM:
      closeView();
      PortalStore.emitChange();
      break;
  }
});

module.exports = PortalStore;
