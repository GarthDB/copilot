import ReactDOM from 'react-dom'
import React from 'react'
import Clock from './components/clock.jsx'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import EntryReducer from './reducers/entry-reducer'

const reducers = combineReducers({
  EntryReducer
});

let store = createStore(reducers)

const addBGEntry = (entry) => {
  return {
    type: 'ADD_BG_ENTRY',
    entry
  }
}

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://graciegrape.com/api/v1/entries.json?count=1');
xhr.onreadystatechange = function () {
  if (this.status == 200 && this.readyState == 4) {
    var responseObj = JSON.parse(this.responseText)
    store.dispatch(addBGEntry(responseObj[0]));
  }
};
xhr.send();


ReactDOM.render(
  <Provider store={store}>
    <Clock />
  </Provider>,
  document.getElementById('root')
);
