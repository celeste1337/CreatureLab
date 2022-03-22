import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import HomePage from './components/HomePage/HomePage';
import DrawingPage from './components/DrawingPage/DrawingPage';
import GalleryPage from './components/GalleryPage/Gallery';
//import CombinationPage from './components/CombinationPage/combination';
import ComboPage from './components/CombinationPage/comboPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/draw" element={<DrawingPage/>}/>
        <Route path="/gallery" element={<GalleryPage/>}/>
        <Route path="/combine" element={<ComboPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
