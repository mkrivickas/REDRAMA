// import logo from './logo.svg';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NewExpense from './components/NewExpense/NewExpense';
import IncomeForm from './components/IncomeForm/IncomeForm';

function App() {
	return (
		<div className="App">
			<Register />
			<Login />
			<h1>Main page goes here</h1>
      <NewExpense />
			<IncomeForm />
		</div>
	);
}

export default App;
