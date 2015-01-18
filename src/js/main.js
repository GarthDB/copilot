/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

// Components
var BgSection = require('./components/BgSection');
var ClockSection = require('./components/ClockSection');
var HealthCarePortalSection = require('./components/HealthCarePortalSection');


var PortalStore = require('./stores/PortalStore');

React.initializeTouchEvents(true);

var Site = React.createClass({
  getInitialState: function () {
    return {open: false};
  },
  componentDidMount: function() {
    PortalStore.addChangeListener(this._onPortalChange);
  },
  componentWillUnmount: function() {
    PortalStore.removeChangeListener(this._onPortalChange);
  },
  _onPortalChange: function() {
    this.setState({open: PortalStore.isOpen()})
  },
  render: function() {
    var className = (this.state.open)? 'formOpen' : '';
    return(
      <main className={className}>
        <HealthCarePortalSection/>
        <BgSection/>
        <ClockSection/>
      </main>
    );
  }
});



document.addEventListener('DOMContentLoaded', function() {
  document.ontouchmove = function(event){
    event.preventDefault();
  }
  React.renderComponent(<Site/>, document.body);
}, false);
