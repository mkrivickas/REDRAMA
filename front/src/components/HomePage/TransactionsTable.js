import React from 'react';
import './TransactionsTable.css';

const TransactionsTable = (props) => (
	<div className="transactionsPage container">
		<div className="transactionsSingle" />
		<div className="transactionsItemsNames row">
			<div className="transactionsSingleDateName">Data</div>
			<div className="transactionsSingleCategoryName col-4">Kategorija</div>
			<div className="transactionsSingleNameName col-4">Pavadinimas</div>
			<div className="transactionsSingleAmountName">Suma</div>
		</div>
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
