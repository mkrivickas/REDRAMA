import logo from './logo.svg';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  return (
    <div className="App">
      <Register/>
      <Login/>
      <h1>Pagrindinis Puslapis</h1>
    </div>
  );
}

export default App;
