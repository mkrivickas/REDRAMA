import React from 'react';
import './IncomeHeader.css';

function Header({ totalIncome, openModal }) {
	return (
		<header className="income-Header">
			<h1 className="income-header-title">Pajamos</h1>
			<div className="total-income">{totalIncome}€</div>
			<div className="col-12">
						<button id="AddIncome-button" onClick={openModal}>
							+
						</button>
			</div>
		</header>
	);
}

export default Header;
