/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');
var PortalActionCreators = require('../actions/PortalActionCreators');

var ChampionForm = React.createClass({
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
      insulin: this.refs.insulinGiven.getDOMNode().value.trim(),
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
      <form>
        <input type="hidden" name="eventType" value="Note" ref="eventType"/>
        <label htmlFor="hundred">
          <input type="checkbox" name="hundred" id="hundred"/>
          <span>100 Club</span>
        </label>
        <label htmlFor="pumpSiteChange">
          <input type="checkbox" name="pumpSiteChange" id="pumpSiteChange" ref="siteChange" value="Pump Site Change."/>
          <span>Pump Site Change</span>
        </label>
        <label htmlFor="cgmSiteChange">
          <input type="checkbox" name="cgmSiteChange" id="cgmSiteChange" ref="cgmSiteChange" value="CGM Site Change."/>
          <span>CGM Site Change</span>
        </label>
        <label htmlFor="lancetChange">
          <input type="checkbox" name="lancetChange" id="lancetChange" ref="lancetChange" value="Lancet Change."/>
          <span>Lancet Change</span>
        </label>
        <label htmlFor="endoAppointment">
          <input type="checkbox" name="endoAppointment" id="endoAppointment" ref="endoAppointment" value="Endo Appointment."/>
          <span>Endo Appointment</span>
        </label>
        <label htmlFor="bloodWork">
          <input type="checkbox" name="bloodWork" id="bloodWork" ref="bloodWork" value="Brave Blood Work."/>
          <span>Brave Blood Work</span>
        </label>
        <label htmlFor="notes" className="extra-space" ref="notes">Additional Notes, Comments:</label>
        <textarea id="notes"></textarea><br/>
        <label htmlFor="enteredBy" ref="enteredBy">
          <span>Entered By:</span>
          <input type="text" id="enteredBy" value="" />
        </label>
        <button onClick={this.cancelHandler}>Cancel</button>
        <button type="submit">Submit Form</button>
      </form>
    );
  }
});

module.exports = ChampionForm;
