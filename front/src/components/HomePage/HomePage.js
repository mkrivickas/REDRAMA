import React from 'react';
import SpinningLoad from '../Extra/SpinningLoad';
import TransactionList from './TransactionList';
import { ExportToCsv } from 'export-to-csv';
import Export from '../Extra/Export';

function HomePage(props) {

	return (
		<div className="transactionsDiv ">
			<Export currentUser={props.currentUser}/>
			<TransactionList currentUser={props.currentUser} />
		</div>
	);
}

export default HomePage;
