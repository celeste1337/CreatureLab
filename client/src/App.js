import './App.css';
import HomePage from './components/HomePage/HomePage';
import DrawingPage from './components/DrawingPage/DrawingPage';
import GalleryPage from './components/GalleryPage/GalleryPage';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

function App() {
    return(
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/draw" element={<DrawingPage/>}/>
        <Route path="/gallery" element={<GalleryPage/>}/>
      </Routes>
      </BrowserRouter>
    )
}

export default App;
