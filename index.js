import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './MoviesComponent/App'
// import App from './App';
// import MyApp from './MyApp'


import * as serviceWorker from './serviceWorker';
// import LoginCompo from './components/LoginCompo';

ReactDOM.render(
  <React.StrictMode>
  <App />
    {/* <App />
    <MyApp /> */}
    {/* <LoginCompo /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
