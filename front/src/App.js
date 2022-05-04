// import logo from './logo.svg';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NewExpense from './components/NewExpense/NewExpense';
import IncomeForm from './components/IncomeForm/IncomeForm';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function App() {
	let [ currentUser, setCurrentUser ] = useState('');

	function logout() {
		Swal.fire({
			title: 'Ar tikrai norite atsijungti?',
			text: 'Duomenys bus įrašyti.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Atsijungti',
			cancelButtonText: 'Atšaukti'
		}).then((result) => {
			if (result.isConfirmed) {
				setCurrentUser('');
				localStorage.setItem('user', '');
			}
		});
	}

	useEffect(() => {
		const saved = localStorage.getItem('user');
		if (saved) {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: saved
				})
			};
			console.log('user is saved');
			fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/login/savedUser', requestOptions)
				.then((response) => response.json())
				.then((data) => {
					if (data.status === 'Success') {
						setCurrentUser(data.user);
					}
				});
		}
	}, []);

	return (
		<div className="App">
			{!currentUser && (
				<div>
					<h1>Registruotis</h1>
					<Register setCurrentUser={setCurrentUser} />
					<h1>Prisijungti</h1>
					<Login setCurrentUser={setCurrentUser} />
				</div>
			)}
			{currentUser && (
				<div className="appMainPage">
					<div className="appLogoutHeader">
						<button
							onClick={() => {
								logout();
							}}
							className="appLogoutButton"
						>
							Atsijungti
						</button>
					</div>
					<h1>Išlaidos</h1>
					<NewExpense />
					<h1>Pajamos</h1>
					<IncomeForm />
				</div>
			)}
		</div>
	);
}

export default App;
