/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');
var Ajax = require('component-ajax');
var VagueTime = require('vague-time');
var Snap = require('snapsvg');
var BgStore = require('../stores/BgStore');
var BgDataActions = require('../actions/BgActionCreators');
var APIUtils = require('../utils/APIUtil');


var rangeArray = ['urgent_high','high','target','low','urgent_low'];
var rangeStringsArray = ['Urgent High', 'High', 'Target Range', 'Low', 'Urgent Low'];

function getDetails(range) {
  switch(range){
    case 0:
    case 1:
      return 'Poke Finger.  Get Insulin. Then wait 2 Hours.'
      break;
    case 2:
      return 'Type 1 Diabetes Champion CoPilot'
      break;
    case 3:
    case 4:
      return 'Eat 15 Carbs. Poke Finger.  Then wait 15 minutes.'
      break;
    default:
      return 'CGM Error. Check the CGM.'
      break;
  };
}

var BGSection = React.createClass({
  updateTimeAgo: function() {
    if(BgStore.getLastTime()) {
      var results = {}
      results.timeago = VagueTime.get({
        from: new Date(),
        to: new Date(BgStore.getLastTime()),
      });
      this.setState(results);
    }
  },
  getStateFromStores: function() {
    var results = {
      bg: BgStore.getBg(),
      direction: BgStore.getDirection(),
      range: rangeArray[BgStore.getRange()],
      rangeString: rangeStringsArray[BgStore.getRange()],
      delta: BgStore.getDelta(),
      details: getDetails(BgStore.getRange())
    };
    if(BgStore.getLastTime()) {
      this.updateTimeAgo();
    }
    return results;
  },
  getInitialState: function() {
    var state = this.getStateFromStores();
    return state;
  },
  componentDidMount: function() {
    BgStore.addChangeListener(this._onChange);
    APIUtils.getBgData();
    setInterval(APIUtils.getBgData(), 1 * 60 * 1000);
    setInterval(this.updateTimeAgo, 500);
  },

  componentWillUnmount: function() {
    BgStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(this.getStateFromStores());
  },

  render: function() {
    var s = Snap();
    s.attr('viewBox', "0 0 894 235");
    var bgTextElem = s.text(0,0,this.state.bg).attr({
        "font-family": "'Source Sans Pro'",
        "font-size": 313,
        "text-anchor": 'end',
        fill: "#F2F2F2",
        transform: "translate(630 217.928)"
      });
    var arrowPath = 'M158.9,77.7l-80,76.6L56,128l37.1-31.4H0V57.7h93.1L56,26.3L78.9,0l80,76.6V77.7z';
    var doubleArrowPath = 'M38.9,0l38.3,40L64,51.4L48.3,32.9v121.6H28.9V32.9L13.1,51.4L0,40L38.3,0L38.9,0z M118.9,0l38.3,40 L144,51.4l-15.7-18.6v121.6h-19.4V32.9L93.1,51.4L80,40l38.3-40L118.9,0z';
    var path = '';
    var transform = '';
    switch(this.state.direction) {
      case 'Flat':
        path = arrowPath;
        transform = "t660 50";
        break;
      case 'FortyFiveDown':
        path = arrowPath;
        transform = "t660 50 r45 50 77";
        break;
      case 'FortyFiveUp':
        path = arrowPath;
        transform = "t660 50 r-45 50 77";
        break;
      case 'SingleUp':
        path = arrowPath;
        transform = "t660 50 r-90 50 77";
        break;
      case 'SingleDown':
        path = arrowPath;
        transform = "t660 50 r90 50 77";
        break;
      case 'DoubleDown':
        path = doubleArrowPath;
        transform = "t660 50 r180 78.5 77";
        break;
      case 'DoubleUp':
        path = doubleArrowPath;
        transform = "t660 50";
        break;
      case 'NOT COMPUTABLE':
        path = 'M150,0v30H0V0H150z';
        transform = "t660 120";
        break;
    }
    s.path(path).attr({
      transform: transform
    });
    return (
      <section className={"bg "+this.state.range}>
        <div className="bgContainer" dangerouslySetInnerHTML={{__html: s.toString()}}/>
        <div className="bgDetailsContainer">
          <div className="range">{this.state.rangeString}</div>
          <div className="changeContainer">
            <div className="timeago">{this.state.timeago}</div>
            <div className="delta">{this.state.delta}</div>
          </div>
          <div className="details">{this.state.details}</div>
        </div>
      </section>
    );
  }
});

module.exports = BGSection;
