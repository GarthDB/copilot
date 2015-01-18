/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');
var PortalActionCreators = require('../actions/PortalActionCreators');
var PortalActionCreators = require('../actions/PortalActionCreators');
var PortalDataActionCreators = require('../actions/PortalDataActionCreators');

var CarbForm = React.createClass({
  cancelHandler: function (event) {
    PortalActionCreators.closeView();
    event.preventDefault();
  },
  submitHandler: function (event) {
    event.preventDefault();
    var data = {
      eventType: this.refs.eventType.getDOMNode().value.trim(),
      carbs: this.refs.carbsGiven.getDOMNode().value.trim(),
      glucose: this.refs.glucoseValue.getDOMNode().value.trim(),
      insulin: '',
      notes: this.refs.notes.getDOMNode().value.trim(),
      enteredBy: this.refs.enteredBy.getDOMNode().value.trim(),
      eventTimeDisplay: '',
      glucoseType: '',
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
  render: function() {
    return (
      <form onSubmit={this.submitHandler}>
        <input type="hidden" name="eventType" value="Correction Bolus" ref="eventType"/>
        <label htmlFor="carbsGiven">
          <span>Carbs Given:</span>
          <input type="number" step="any" min="0" id="carbsGiven" placeholder="Amount in grams" ref="carbsGiven"/>
        </label>
        <label htmlFor="glucoseValue">
          <span>Glucose:</span>
          <input type="number" step="any" id="glucoseValue" ref="glucoseValue"/>
        </label>
        <label htmlFor="notes">Additional Notes, Comments:</label>
        <textarea id="notes" ref="notes"></textarea>
        <label htmlFor="enteredBy">
          <span>Entered By:</span>
          <input type="text" id="enteredBy" ref="enteredBy"/>
        </label>
        <button onClick={this.cancelHandler}>Cancel</button>
        <button type="submit">Submit Form</button>
      </form>
    );
  }
});

module.exports = CarbForm;
