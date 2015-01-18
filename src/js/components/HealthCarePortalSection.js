/**
* @jsx React.DOM
*/
'use strict';

var React = require('react/addons');
var PortalActionCreators = require('../actions/PortalActionCreators');
var PortalStore = require('../stores/PortalStore');

var CarbForm = require('./CarbForm');
var ChampionForm = require('./ChampionForm');
var PumpForm = require('./PumpForm');
var BgForm = require('./BgForm');

function getStateFromStores() {
  return {
    views: PortalStore.getAllViews(),
    currentView: PortalStore.getCurrentView()
  };
}


var HealthCarePortalSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    PortalStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PortalStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  handleClick: function(event) {
    PortalActionCreators.switchView(event.currentTarget.dataset.view);
    event.preventDefault();
  },

  render: function() {
    var styles = {
      position: 'absolute',
      zIndex: 12
    }
    var cx = React.addons.classSet;
    var classes = cx({
      'healthcareportal': true,
      'open': this.state.currentView
    });
    var form;
    switch(this.state.currentView){
      case 'BgForm':
        form = (<BgForm/>);
        break;
      case 'PumpForm':
        form = (<PumpForm/>);
        break;
      case 'CarbForm':
        form = (<CarbForm/>);
        break;
      case 'ChampionForm':
        form = (<ChampionForm/>);
        break;
    }
    return (
      <section className={classes}>
        <nav>
          <ul>
            <li className="check_bg" data-view="BgForm" onMouseDown={this.handleClick} onTouchStart={this.handleClick}><div className="icon"/><a href="#">Check BG</a></li>
            <li className="pump" data-view="PumpForm" onMouseDown={this.handleClick} onTouchStart={this.handleClick}><div className="icon"/><a href="#">Pump Input</a></li>
            <li className="carbs" data-view="CarbForm" onMouseDown={this.handleClick} onTouchStart={this.handleClick}><div className="icon"/><a href="#">Carb Input</a></li>
            <li className="champion" data-view="ChampionForm" onMouseDown={this.handleClick} onTouchStart={this.handleClick}><div className="icon"/><a href="#">Champion</a></li>
            <li className="view_graph" data-view="TrendsView" onMouseDown={this.handleClick} onTouchStart={this.handleClick}><div className="icon"/><a href="#">Trends</a></li>
            <li className="view_log" data-view="LogView" onMouseDown={this.handleClick} onTouchStart={this.handleClick}><div className="icon"/><a href="#">View Log</a></li>
          </ul>
        </nav>
        {form}
      </section>
    );
  }
});

module.exports = HealthCarePortalSection;
