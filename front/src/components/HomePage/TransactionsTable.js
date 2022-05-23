import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionsTable = (props) => (
	<div className="transactionsPage">
		<div className="transactionPage-title">
			<div className="transactionsSingleDate-title">Data</div>
			<div className="transactionsSingleCategory-title">Kategorija</div>
			<div className="transactionsSingleName-title">Pavadinimas</div>
			<div className="transactionsSingleAmount-title">Suma</div>
		</div>
		<div className="transactionsSingle-list">
			{props.combinedList.length > 0 ? (
				props.combinedList.map((item, index) => (
					!props.isShowMore ?
						index < 10 && <div key={item._id}
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
					</div>:<div key={item._id}
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
					<td className="emptyTableText" colSpan={3}>
						Nėra duomenų
					</td>
				</tr>
			)}
		</div>
		{!props.isShowMore && <button className="TransactionsTableSeeMoreBtn" onClick={()=>{props.setIsShowMore(true)}}>Rodyti daugiau</button>}
		{props.isShowMore && <button className="TransactionsTableSeeMoreBtn" onClick={()=>{props.setIsShowMore(false)}}>Rodyti mažiau</button>}
	</div>
);

export default TransactionsTable;
