import React, {useState, useEffect} from 'react';
import { ExportToCsv } from 'export-to-csv';

const Export = (props) => {
    let [expense, setExpense] = useState([]);

    const fetchData = async () => {
		await fetch('http://localhost:3001/api/v1/expense').then((response) => response.json()).then((data) => {
            let tempData = [];
			data.data.expense.map((expense)=>{
				if(expense.UserId === props.currentUser._id){
					tempData.push(expense);
				}
			})
			setExpense(tempData);
		});
	};


    useEffect(() => {
      fetchData();
    }, []);

    function exportCSV(){
        let exportData = [];
        expense.forEach((expense)=>{
            exportData.push(
                {
                    pavadinimas: expense.Name,
                    suma: expense.Amount,
                    kategorija: expense.Category,
                    data: expense.Date,  
                }
            )
        });

        const options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'Išlaidos',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
          };
         
        const csvExporter = new ExportToCsv(options);
         
        csvExporter.generateCsv(exportData);
    }
    
  return (
    <button onClick={()=>{exportCSV()}}>Eksportuoti kaip .csv</button>
  )
}

export default Export