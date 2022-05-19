import React from 'react';
import TransactionList from './TransactionList';

function HomePage(props) {
	return (
		<div className="transactionsDiv container">
			<div className="row">
				<TransactionList currentUser={props.currentUser} />
			</div>
		</div>
	);
}

export default HomePage;
