import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import './IncomesList.css';

const IncomesList = (props) => (
	<div className="IncomesList container">
		<div className="IncomesListItemsNames row">
			<div className="IncomesListSingleDateName">Data</div>
			<div className="IncomesListSingleCategoryName col-4">Kategorija</div>
			<div className="IncomesListSingleNameName ">Pavadinimas</div>
			<div className="IncomesListSingleAmountName">Suma</div>
			<div className="IncomesListSingleActionsName">Veiksmai</div>
		</div>
		{props.incomes.length > 0 ? (
			props.incomes.map((income) => (
				<div className="IncomesListSingleItem">
					<div className="IncomesListSingleDate">{income.Date.slice(0, 10)}</div>
					<div className="IncomesListSingleCategory">{income.Category}</div>
					<div className="IncomesListSingleName">{income.Name}</div>
					<div className="IncomesListSingleAmount">+ {income.Amount}</div>
					<div className="IncomesListSingleAction">
						<button
							onClick={() => {
								props.editRow(income);
							}}
							className="IncomeListEdit-button"
						>
							<FaRegEdit />
						</button>

						<button onClick={() => props.deleteIncome(income._id)} className="IncomeListDelete-button">
							<FaTrash />
						</button>
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

export default IncomesList;
