import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import './IncomesList.css';

const IncomesList = (props) => (
	<div className="IncomesList">
		<div className="IncomesListName-title">
			<div className="IncomesListDateTitle">Data</div>
			<div className="IncomesListCategoryTitle">Kategorija</div>
			<div className="IncomesListNameTitle">Pavadinimas</div>
			<div className="IncomesListAmountTitle">Suma</div>
			<div className="IncomesListActionsTitle">Veiksmai</div>
			<div />
		</div>
		{props.incomes.length > 0 ? (
			!props.isShowMore ?
			props.incomes.map((income, index) => (
				index <10 &&
				<div key={income._id} className="IncomesListSingle">
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
			)): props.incomes.map((income, index) => (
				<div key={income._id} className="IncomesListSingle">
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
			<div>
				<div colSpan={3}>Nėra pajamų</div>
			</div>
		)}
		{!props.isShowMore &&<button className="IncomeListSeeMoreBtn" onClick={()=>{props.setIsShowMore(true)}}>Rodyti daugiau</button>}
		{props.isShowMore &&<button className="IncomeListSeeMoreBtn" onClick={()=>{props.setIsShowMore(false)}}>Rodyti mažiau</button>}
	</div>
);

export default IncomesList;
