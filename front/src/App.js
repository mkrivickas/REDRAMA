// import logo from './logo.svg';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NewExpense from './components/NewExpense/NewExpense';
import IncomeForm from './components/IncomeForm/IncomeForm';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AuthScreen from './components/AuthScreen/AuthScreen';

import SpinningLoad from './components/Extra/SpinningLoad';

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
				window.location.href = '/';
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
			fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/login/savedUser', requestOptions)
				.then((response) => response.json())
				.then((data) => {
					if (data.status === 'Success') {
						setCurrentUser(data.user);
					}
				});
		}
	}, []);

	useEffect(() => {
		if (!currentUser) {
			if (window.location.href !== 'http://localhost:3000/') {
				window.location.href = '/';
			}
		}
	}, []);

	return (
		<div className="App">
			{!currentUser && (
				<div>
					<Router>
						<Routes>
							<Route path="/" element={<AuthScreen />} />
							<Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
							<Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
						</Routes>
					</Router>
				</div>
			)}
			{currentUser && (
				<div className="appMainPage">
					<Router>
						<Sidebar className="sidebar" logout={logout} currentUser={currentUser} />
						<div className="app-inner-mainPage">
							<Routes>
								<Route path="/" element={<HomePage currentUser={currentUser} />} />
								<Route path="/register" element={<HomePage currentUser={currentUser} />} />
								<Route path="/login" element={<HomePage currentUser={currentUser} />} />
								<Route path="/pajamos" element={<IncomeForm currentUser={currentUser} />} />
								<Route path="/islaidos" element={<NewExpense currentUser={currentUser} />} />

								{currentUser.type === 'admin' && (
									<Route path="/admin" element={<AdminPanel currentUser={currentUser} />} />
								)}
							</Routes>
						</div>
					</Router>
				</div>
			)}
		</div>
	);
}

export default App;
