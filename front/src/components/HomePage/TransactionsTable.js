import React from 'react';

const TransactionsTable = (props) => (
	<table className="IcomesList-table">
		<tbody>
			{props.combinedList.length > 0 ? (
				props.combinedList.map(
					(item) =>
						!item.incomeName ? (
							<tr key={item._id}>
								<td className="IncomeName-List">{item.expenseName}</td>
								<td className="IncomeDate-List">{item.expenseDate.slice(0, 10)}</td>
								<td>islaidos</td>
								<td className="IncomeAmount-List">{item.expenseAmount}€</td>
							</tr>
						) : (
							<tr key={item._id}>
								<td className="IncomeName-List">{item.incomeName}</td>
								<td className="IncomeDate-List">{item.incomeDate.slice(0, 10)}</td>
								<td>pajamos</td>
								<td className="IncomeAmount-List">{item.incomeAmount}€</td>
							</tr>
						)
				)
			) : (
				<tr>
					<td colSpan={3}>Nėra pajamų</td>
				</tr>
			)}
		</tbody>
	</table>
);

export default TransactionsTable;
