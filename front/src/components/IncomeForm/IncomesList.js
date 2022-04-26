import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';

const IncomesList = (props) => (
	<table>
		<tbody>
			{props.incomes.length > 0 ? (
				props.incomes.map((income) => (
					<tr key={income._id}>
						<td>{income.incomeName}</td>
						<td>{income.incomeAmount}</td>
						<td>{income.incomeDate.split('T')[0]}</td>
						<td>
							<button
								onClick={() => {
									props.editRow(income);
								}}
								className="button btn-warning "
							>
								<FaRegEdit />
							</button>
							<button onClick={() => props.deleteIncome(income._id)} className="button  btn-danger ms-3">
								<FaTrash />
							</button>
						</td>
					</tr>
				))
			) : (
				<tr>
					<td colSpan={3}>No incomes</td>
				</tr>
			)}
		</tbody>
	</table>
);

export default IncomesList;
