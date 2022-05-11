import React from 'react';
import './TransactionsTable.css';

const TransactionsTable = (props) => (
	// <div class="container">
	// 	<table class="responsive-table">
	// 		<tr class="table-header">
	// 			<th class="col col-2">Job Id</th>
	// 			<th class="col col-4">Customer Name</th>
	// 			<th class="col col-4">Amount Due</th>
	// 			<th class="col col-2">Payment Status</th>
	// 		</tr>
	// 		<div class="table-row">
	// 			{props.combinedList.length > 0 ? (
	// 				props.combinedList.map((item) => (
	// 					<tr key={item._id}>
	// 						<td class="col col-2" data-label="Job Id">
	// 							42235
	// 						</td>
	// 						<td class="col col-4" data-label="Customer Name">
	// 							John Doe
	// 						</td>
	// 						<td class="col col-4" data-label="Amount">
	// 							$350
	// 						</td>
	// 						<td class="col col-2" data-label="Payment Status">
	// 							Pending
	// 						</td>
	// 					</tr>
	// 				))
	// 			) : (
	// 				<tr>
	// 					<td colSpan={3}>Nėra pajamų</td>
	// 				</tr>
	// 			)}
	// 		</div>
	// 	</table>
	// </div>

	// <table class="table">
	// 	<thead>
	// 		<tr>
	// 			<th class="header" scope="col">
	// 				Course
	// 			</th>
	// 			<th class="header" scope="col">
	// 				Start Date
	// 			</th>
	// 			<th class="header" scope="col">
	// 				Fees
	// 			</th>
	// 			<th class="header" scope="col">
	// 				Type
	// 			</th>
	// 		</tr>
	// 	</thead>
	// 	<tbody>
	// 		{props.combinedList.length > 0 ? (
	// 			props.combinedList.map((item) => (
	// 				<tr key={item._id}>
	// 					<td>{item.Date.slice(0, 10)}</td>
	// 					<td>{item.Name}</td>
	// 					<td>{item.Category}</td>
	// 					<td>{item.Amount}€</td>
	// 				</tr>
	// 			))
	// 		) : (
	// 			<tr>
	// 				<td colSpan={3}>Nėra pajamų</td>
	// 			</tr>
	// 		)}
	// 	</tbody>
	// </table>

	<div class="container">
		<div class="row">
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
		</div>
	</div>

	// 	<table className="IcomesList-table">
	// 		<tbody>
	// 			{props.combinedList.length > 0 ? (
	// 				props.combinedList.map((item) => (
	// 					<tr key={item._id}>
	// 						<td className="IncomeName-List">{item.Name}</td>
	// 						<td className="IncomeDate-List">{item.Date.slice(0, 10)}</td>
	// 						<td className="IncomeDate-List">{item.Category}</td>
	// 						<td className="IncomeAmount-List">{item.Amount}€</td>
	// 					</tr>
	// 				))
	// 			) : (
	// 				<tr>
	// 					<td colSpan={3}>Nėra pajamų</td>
	// 				</tr>
	// 			)}
	// 		</tbody>
	// 	</table>
);

export default TransactionsTable;
