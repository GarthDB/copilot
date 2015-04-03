/**
* @jsx React.DOM
*/

'use strict';

var React = require('react');
var RadioGroup = require('./RadioGroup');
var PortalActionCreators = require('../actions/PortalActionCreators');
var PortalDataActionCreators = require('../actions/PortalDataActionCreators');

var BgForm = React.createClass({
  componentDidMount: function() {
    this.refs.glucoseValue.getDOMNode().focus();
  },
  cancelHandler: function (event) {
    PortalActionCreators.closeView();
    event.preventDefault();
  },
  submitHandler: function (event) {
    event.preventDefault();
    var data = {
      eventType: this.refs.eventType.getDOMNode().value.trim(),
      carbs: '',
      glucose: this.refs.glucoseValue.getDOMNode().value.trim(),
      insulin: '',
      notes: this.refs.notes.getDOMNode().value.trim(),
      enteredBy: this.refs.enteredBy.getDOMNode().value.trim(),
      eventTimeDisplay: '',
      glucoseType: this.refs.glucoseType.getCheckedValue().trim(),
      preBolus: ''
    }

    var ok = window.confirm(
      'Please verify that the data entered is correct: ' +
      '\nEvent type: ' + data.eventType +
      '\nBlood glucose: ' + data.glucose +
      '\nMethod: ' + data.glucoseType +
      '\nCarbs Given: ' + data.carbs +
      '\nInsulin Given: ' + data.insulin +
      '\nPre Bolus: ' + data.preBolus +
      '\nNotes: ' + data.notes +
      '\nEntered By: ' + data.enteredBy +
      '\nEvent Time: ' + data.eventTimeDisplay);
    if(ok) {
      PortalDataActionCreators.sendForm(data);
    }
    event.preventDefault();
    return;
  },
  focusHandler: function(event) {
    // event.preventDefault();
    // setTimeout(function() {window.scrollTo(0, 0);},0);
  },
  render: function() {
    return (
      <form className="bgForm" onSubmit={this.submitHandler}>
        <div className="inputGroup">
          <input type="hidden" name="eventType" value="BG Check" ref="eventType"/>
          <RadioGroup className="radioGroup" name="glucoseType" value="sensor" ref="glucoseType">
            <label htmlFor="meter">
              <span>Blood Drop</span>
              <input type="radio" className="meter" value="Finger" onFocus={this.focusHandler}/>
            </label>
            <label htmlFor="sensor">
              <span>Dexcom</span>
              <input type="radio" className="sensor" value="Sensor" defaultChecked="true" onFocus={this.focusHandler}/>
            </label>
          </RadioGroup>
          <label htmlFor="glucoseValue">
            <input type="text" pattern="\d*" className="glucoseValue" placeholder="BG" ref="glucoseValue" onFocus={this.focusHandler}/>
            <span>mg/dl</span>
          </label>
          <textarea id="notes" placeholder="notes" ref="notes" onFocus={this.focusHandler}></textarea><br/>
          <label htmlFor="enteredBy">
            <input type="text" className="enteredBy" placeholder="initials" ref="enteredBy" onFocus={this.focusHandler}/>
          </label>
        </div>
        <div className="buttonGroup">
          <button className="cancel" onClick={this.cancelHandler}>Cancel</button>
          <button className="save" type="submit">Save</button>
        </div>
      </form>
    );
  }
});

module.exports = BgForm;
