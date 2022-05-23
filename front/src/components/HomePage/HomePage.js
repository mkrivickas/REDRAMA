import React from 'react';
import SpinningLoad from '../Extra/SpinningLoad';
import TransactionList from './TransactionList';

function HomePage(props) {
	return (
		<div className="transactionsDiv ">
			<TransactionList currentUser={props.currentUser} />
		</div>
	);
}

export default HomePage;
