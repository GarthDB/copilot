import ReactDOM from 'react-dom'
import React from 'react'
import Clock from './components/clock.jsx'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'

// const reducers = combineReducers({
//   clockReducer
// });

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://graciegrape.com/api/v1/entries.json');
xhr.onreadystatechange = function () {
  if (this.status == 200 && this.readyState == 4) {
    console.log('response: ' + this.responseText);
  }
};
xhr.send();

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
