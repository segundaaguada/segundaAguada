import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from "react-redux"
import App from './App';
import reportWebVitals from './reportWebVitals' 
import index from './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from './Share/ScrollToTop'
import { reducerGeneral } from './store/general/reducer'
import { ClipLoader } from 'react-spinners'

const store = createStore(reducerGeneral)


ReactDOM.render(
  <BrowserRouter>
    <div className='bounce-loader'>
      <ClipLoader color='#2474bf' size='150' speedMultiplier={0.5} />
    </div>
    <ScrollToTop/>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
	document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
