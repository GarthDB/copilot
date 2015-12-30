import ReactDOM from 'react-dom'
import React from 'react'
import Clock from './components/clock.jsx'
import BG from './components/bg.jsx'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import entries from './reducers/entries'

const reducers = combineReducers({
  entries
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

setInterval(function(){
  xhr.open('GET', 'http://graciegrape.com/api/v1/entries.json?count=1');
  xhr.send();
}, 300000);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BG />
      <Clock />
    </div>
  </Provider>,
  document.getElementById('root')
);
