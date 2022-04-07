import './App.css';
import HomePage from './components/HomePage/HomePage';
import DrawingPage from './components/DrawingPage/DrawingPage';
import GalleryPage from './components/GalleryPage/GalleryPage';
import CombinationPage from './components/CombinationPage/CombinationPage';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {CookiesProvider, withCookies} from 'react-cookie';

function App() {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/draw" element={<DrawingPage/>}/>
          <Route path="/combine" element={<CombinationPage/>}/>
          <Route path="/gallery" element={<GalleryPage/>}/>
        </Routes>
      </BrowserRouter>
    )
}

export default App;
