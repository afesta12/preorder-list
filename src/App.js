import './App.css';
import Login from "./components/Login"
import Home from "./components/Home"
import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      
        <Router>
        
            <Routes>
            
                <Route path='/' element={ <Login /> } />
                <Route path='/home' element={ <Home /> } />
            
            </Routes>
        
        </Router>

    </div>
  );
}

export default App;
