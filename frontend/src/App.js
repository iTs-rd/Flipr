import './App.css';
import Page1 from './pages/overview'
import Page2 from './pages/graphs'
import Login from './pages/login'
import Register from './pages/register'
import { Routes, Route} from "react-router-dom";
function App() {
  return (
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<div><Page1 /><Page2 /></div>} />
          </Routes>
        </header>
      </div>
  );
}

export default App;
