import React from 'react';
import TransactionList from './TransactionList';

function HomePage(props) {
	return (
		<div className="transactionsDiv container-fluid">
			<TransactionList currentUser={props.currentUser} />
		</div>
	);
}

export default HomePage;
