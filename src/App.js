import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ARViewer from './pages/ARViewer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ar-viewer" element={<ARViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
