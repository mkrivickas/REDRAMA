import React from 'react';
import './IncomeHeader.css';

function Header({ totalIncome }) {
	return (
		<header className="income-Header">
			<h1>Income Tracker</h1>
			<div className="total-income">{totalIncome}€</div>
		</header>
	);
}

export default Header;
