import React from 'react';

const TransactionsTable = (props) => (
	<table className="IcomesList-table">
		<tbody>
			{props.combinedList.length > 0 ? (
				props.combinedList.map((item) => (
					<tr key={item._id}>
						<td className="IncomeName-List">{item.Name}</td>
						<td className="IncomeDate-List">{item.Date.slice(0, 10)}</td>
						<td className="IncomeDate-List">{item.Type}</td>
						<td className="IncomeAmount-List">{item.Amount}€</td>
					</tr>
				))
			) : (
				<tr>
					<td colSpan={3}>Nėra pajamų</td>
				</tr>
			)}
		</tbody>
	</table>
);

export default TransactionsTable;
