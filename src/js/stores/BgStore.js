var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var BgDispatcher = require('../dispatcher/BgDispatcher');
var BgConstants = require('../constants/BgConstants').ActionTypes;

var CHANGE_EVENT = 'change';

var _bg = '--';
var _direction = '--';
var _lastTime = null;
var _range = 'loading';
var _delta = '--';

function _getRange (sgv) {
  if (sgv >= 260) {
    return 0;
  } else if (sgv >= 180) {
    return 1;
  } else if (sgv >= 80) {
    return 2;
  } else if (sgv >= 55) {
    return 3;
  } else if (sgv > 0) {
    return 4;
  } else {
    return 'error';
  }
};

function _updateBG (xhr) {
  var rec = xhr[0];
  if(rec.direction == 'NOT COMPUTABLE' && rec.sgv < 20){
    _bg = '??';
    _direction = '??';
    _lastTime = null;
    _range = 'error';
    _delta = '--';
  } else {
    var last = new Date(rec.date);
    _bg = rec.sgv;
    _lastTime = last;
    _range = _getRange(rec.sgv);
    _direction = rec.direction;
    _details = _getRange(_bg);
    if(!isNaN(parseInt(rec.sgv)) && !isNaN(parseInt(xhr[1].sgv))){
      _delta = parseInt(rec.sgv) - parseInt(xhr[1].sgv);
      _delta +=' mg/dL';
    }
  }
};

var BgStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getBg: function() {
    return _bg;
  },
  getDirection: function() {
    return _direction;
  },
  getLastTime: function() {
    return _lastTime;
  },
  getRange: function() {
    return _range;
  },
  getDelta: function() {
    return _delta;
  }
});

BgDispatcher.register(function(action) {
  switch(action.actionType) {
    case BgConstants.updateBg:
      _updateBG(action.data);
      BgStore.emitChange();
      break;
  }
});

module.exports = BgStore;
