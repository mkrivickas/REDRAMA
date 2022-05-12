import React, { useState, useEffect } from 'react'

const HomeBalance = (props) => {
  let [mainBalance, setMainBalance] = useState(0);

  useEffect(() => {
    let tempBalance  = 0
    props.combinedList.map((listItem)=>{
      if(listItem.Type === "income"){
        console.log("+"+listItem.Amount);
        tempBalance += parseInt(listItem.Amount);
      }else{
        console.log("-"+listItem.Amount)
        tempBalance -= parseInt(listItem.Amount);
      }
      setMainBalance(tempBalance)
    }
    )

  }, [props.combinedList])
  

  return (
    <div className='homeBalancePage'>
      <h1>Dabartinis balansas:</h1>
      <h2>{mainBalance}€</h2>
      </div>
  )
}

export default HomeBalance