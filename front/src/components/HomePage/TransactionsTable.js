import React from 'react';
import './TransactionsTable.css';

const TransactionsTable = (props) => (
	<div class="transactionsPage">
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
				/* <tr key={item._id}>
					<td>{item.Date.slice(0, 10)}</td>
					<td>{item.Name}</td>
					<td>{item.Category}</td>
					<td>{item.Amount}€</td>
				</tr> */
			))
		) : (
			<tr>
				<td colSpan={3}>Nėra pajamų</td>
			</tr>
		)}

		{/* <div class="row">
			<div class="col-md-offset-2 col-md-12">
				<div class="panel">
					<div class="panel-body table-responsive">
						<table class="table">
							<thead>
								<tr>
									<th>DATA</th>
									<th>PAJAMOS</th>
									<th>KATEGORIJA</th>
									<th>SUMA</th>
								</tr>
							</thead>
							<tbody>
								{props.combinedList.length > 0 ? (
									props.combinedList.map((item) => (
										<tr key={item._id}>
											<td>{item.Date.slice(0, 10)}</td>
											<td>{item.Name}</td>
											<td>{item.Category}</td>
											<td>{item.Amount}€</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={3}>Nėra pajamų</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div> */}
	</div>
);

export default TransactionsTable;
