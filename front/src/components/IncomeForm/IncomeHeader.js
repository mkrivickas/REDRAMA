import React from 'react';
import './IncomeHeader.css';

function Header({ totalIncome }) {
	return (
		<header className="income-Header">
			<h1 className="income-header-title">Income Tracker</h1>
			<div className="total-income">{totalIncome}€</div>
		</header>
	);
}

export default Header;
