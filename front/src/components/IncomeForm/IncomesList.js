import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import './IncomesList.css';

const IncomesList = (props) => (
	<div class="IncomesList">
		<div className="IncomesListDateTitle">Data</div>
		<div className="IncomesListCategoryTitle">Kategorija</div>
		<div className="IncomesListNameTitle">Pavadinimas</div>
		<div className="IncomesListAmountTitle">Suma</div>
		<div />
		{props.incomes.length > 0 ? (
			props.incomes.map((income) => (
				<div>
					<div className="IncomesListDate">{income.Date.slice(0, 10)}</div>
					<div className="IncomesListCategory">{income.Category}</div>
					<div className="IncomesListName">{income.Name}</div>
					<div className="IncomesListAmount">{income.Amount}€</div>
					<div>
						<button
							onClick={() => {
								props.editRow(income);
							}}
							className="IncomeListEdit-button"
						>
							<FaRegEdit />
						</button>
						<button onClick={() => props.deleteIncome(income._id)} className="IncomeListDelete-button ms-3">
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

// 	<table className="IcomesList-table">
// 		<tbody>
// 			{props.incomes.length > 0 ? (
// 				props.incomes.map((income) => (
// 					<tr key={income._id}>
// 						<td>
// 							<button
// 								onClick={() => {
// 									props.editRow(income);
// 									/* 									props.openModal(); */
// 								}}
// 								className="IncomeListEdit-button"
// 							>
// 								<FaRegEdit />
// 							</button>
// 						</td>
// 						<td>
// 							<div className="IncomeName-List">{income.Name}</div>
// 							<div className="IncomeDate-List">{income.Date.slice(0, 10)}</div>
// 						</td>
// 						<td className="IncomeAmount-List">{income.Amount}€</td>

// 						<td>
// 						<td className="IncomeAmount-List">{income.Category}€</td>
// 						</td>
// 						<button
// 								onClick={() => props.deleteIncome(income._id)}
// 								className="IncomeListDelete-button ms-3"
// 							>
// 								<FaTrash />
// 							</button>
// 					</tr>
// 				))
// 			) : (
// 				<tr>
// 					<td colSpan={3}>Nėra pajamų</td>
// 				</tr>
// 			)}
// 		</tbody>
// 	</table>
// );

export default IncomesList;
