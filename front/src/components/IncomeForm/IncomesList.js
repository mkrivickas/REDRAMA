import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import './IncomesList.css';

const IncomesList = (props) => (
	<div class="IncomesList">
		<div class="IncomesListName-title">
			<div className="IncomesListDateTitle">Data</div>
			<div className="IncomesListCategoryTitle">Kategorija</div>
			<div className="IncomesListNameTitle">Pavadinimas</div>
			<div className="IncomesListAmountTitle">Suma</div>
			<div className="IncomesListActionsTitle">Veiksmai</div>
			<div />
		</div>
		{props.incomes.length > 0 ? (
			props.incomes.map((income) => (
				<div className="IncomesListSingle">
					<div className="IncomesListDate">{income.Date.slice(0, 10)}</div>
					<div className="IncomesListCategory">{income.Category}</div>
					<div className="IncomesListName">{income.Name}</div>
					<div className="IncomesListAmount">{income.Amount}€</div>
					<div className="IncomesListActions">
						<button
							onClick={() => {
								props.editRow(income);
							}}
							className="IncomeListEdit-button"
						>
							<FaRegEdit />
						</button>
						<button onClick={() => props.deleteIncome(income._id, income)} className="IncomeListDelete-button ms-3">
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
