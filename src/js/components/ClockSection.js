/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');
var Snap = require('snapsvg');

var ClockSection = React.createClass({
  updateTime: function() {
    var today = new Date();
    this.setState(this.formatTime(today));
  },
  formatTime: function(datetime) {
    var dayArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec'];
    var data = {
      hour: datetime.getHours(),
      minute: this.leadZero(datetime.getMinutes()),
      period: 'am',
      day: dayArray[datetime.getDay()],
      date: this.leadZero(datetime.getDate()) + ' ' + monthArray[datetime.getMonth()] + ' ' + datetime.getFullYear()
    };
    if (data.hour > 12) {
      data.period = 'pm'
      data.hour = data.hour - 12;
    }
    return data;
  },
  leadZero: function(val){
    if (val < 10) {
      val = '0'+val;
    }
    return val;
  },
  getInitialState: function() {
    return this.formatTime(new Date());
  },
  componentDidMount: function() {
    var t = setInterval(this.updateTime,500);
  },
  render: function() {
    var s = Snap();
    s.attr('viewBox', "0 0 894 235");
    s.text(0,0,this.state.hour+':'+this.state.minute).attr({
      "font-family": "'Source Sans Pro'",
      "font-size": 313,
      "text-anchor": 'end',
      fill: "#F2F2F2",
      transform: "translate(730 217.928)",
      "font-weight": 900,
      "letter-spacing": "-12"
    });
    s.text(0,0,this.state.period.toUpperCase()).attr({
      transform: "translate(733.474 199.142)",
      fill: "#F2F2F2",
      "font-family": "\'Source Sans Pro\'",
      "font-size": "118.073",
      "letter-spacing": "-4"
    });
    return (
      <section className="clock">
        <div className="timeContainer" dangerouslySetInnerHTML={{__html: s.toString()}}/>
        <div className="dateContainer">
          <div className="day">{this.state.day}</div>
          <div className="date">{this.state.date}</div>
        </div>
      </section>
    );
  }
});

module.exports = ClockSection;
