import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import './IncomesList.css';

const IncomesList = (props) => (
	<table className="IcomesList-table">
		<tbody>
			{props.incomes.length > 0 ? (
				props.incomes.map((income) => (
					<tr key={income._id}>
						<td>
							<button
								onClick={() => {
									props.editRow(income);
									/* 									props.openModal(); */
								}}
								className="IncomeListEdit-button"
							>
								<FaRegEdit />
							</button>
						</td>
						<td>
							<div className="IncomeName-List">{income.Name}</div>
							<div className="IncomeDate-List">{income.Date.slice(0, 10)}</div>
						</td>
						<td className="IncomeAmount-List">{income.Amount}€</td>

						<td>
						<td className="IncomeAmount-List">{income.Category}€</td>
							<button
								onClick={() => props.deleteIncome(income._id)}
								className="IncomeListDelete-button ms-3"
							>
								<FaTrash />
							</button>
						</td>
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

export default IncomesList;
