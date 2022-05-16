import React from 'react';
import './TransactionsTable.css';

const TransactionsTable = (props) => (
	<div className="transactionsPage">
		{props.combinedList.length > 0 ? (
			props.combinedList.map((item) => (
				<div
					className={
						item.Type === 'expense' ? (
							'transactionsSingleItem transactionsSingleRed'
						) : (
							'transactionsSingleItem transactionsSingleGreen'
						)
					}
				>
					<div className="transactionsSingleDate">{item.Date.slice(0, 10)}</div>
					<div className="transactionsSingleCategory">{item.Category}</div>
					<div className="transactionsSingleName">{item.Name}</div>
					<div
						className={
							item.Type === 'expense' ? (
								'transactionsSingleAmount'
							) : (
								'transactionsSingleAmount transactionsSingleAmountGreen'
							)
						}
					>
						{item.Type === 'expense' ? '- ' : '+ '}
						{item.Amount}€
					</div>
				</div>
			))
		) : (
			<tr>
				<td colSpan={3}>Nėra pajamų</td>
			</tr>
		)}
	</div>
);

export default TransactionsTable;
