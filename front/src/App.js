// import logo from './logo.svg';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NewExpense from './components/NewExpense/NewExpense';

function App() {
    return (
        <div className='App'>
            <Register />
            <Login />
            <NewExpense />
            <h1>Main page goes here</h1>
        </div>
    );
}

export default App;
