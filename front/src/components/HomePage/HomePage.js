import React from 'react';
import TransactionList from './TransactionList';

function HomePage(props) {
	return (
		<div className="transactionsDiv">
			<TransactionList />
		</div>
	);
}

export default HomePage;
