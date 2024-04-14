import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Earthquakes from './components/earthquakes';
import Filters from './components/filter';
import Comments from './components/comments';
import imagen from "../src/assets/earthquake.jpg";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/earthquakes" element={<Earthquakes />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </Router>
  );
}

// Componente Home
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="App">
      <h1>Earthquakes!</h1>
      <img src={imagen} alt='medicion de earthquakes'></img>
      <nav>
        <button onClick={() => navigate("/earthquakes")}>Earthquakes</button>
        <button onClick={() => navigate("/filters")}>Filters</button>
        <button onClick={() => navigate("/comments")}>Comments</button>
      </nav>
    </div>
  );
};

export default App;



