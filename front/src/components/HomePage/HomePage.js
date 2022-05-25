import React from 'react';
import TransactionList from './TransactionList';
function HomePage(props) {

	return (
		<div className="transactionsDiv ">
			<TransactionList currentUser={props.currentUser} />
		</div>
	);
}

export default HomePage;
