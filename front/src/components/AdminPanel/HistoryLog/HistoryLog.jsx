import React, {useState, useEffect} from 'react';
import './HistoryLog.css';
import Swal from 'sweetalert2';
import { FaTrash, FaRegEdit } from 'react-icons/fa';
import SpinningLoad from '../../Extra/SpinningLoad';

const HistoryLog = () => {
    let [logs, setLogs] = useState([]);
    let [fullLogs, setFullLogs] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [users, setUsers] = useState([]);
    let [userFilter ,setUserFilter] = useState("");
    let [catFilter , setCatFilter] = useState("");
    let [deleteMany, setDeleteMany] = useState([]);

    const fetchData = () =>{
        fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/users')
                .then(response => response.json())
                .then(data => {
                setUsers(data.data.users)}).then(()=>{
                    fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs')
                    .then(response => response.json())
                    .then(data => {
                    setLogs(data.data.logs.reverse());
                    setFullLogs(data.data.logs.reverse());
                    setIsLoading(false);
                    });
                });
    };
    useEffect(() => {
      fetchData();
    }, []);
    

    function deleteLog(id){
        const postURL = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs';
        Swal.fire({
          title: 'Ar esate tikri?',
          text: 'Dėmesio, įrašas bus pašalintas!',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Atšaukti',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Taip, pašalinti!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            fetch(postURL, {
              method: 'DELETE',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  id: [id]
              }),
          }).then(()=>{
            fetchData();
            Swal.fire({
              text: 'įrašas buvo pašalintas!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Gerai!'
            });
          });
          }
        });
      }

    function filterLogs(filter, user){
      let tempLogs = [];
      let catFilter = false;
      let userFilter = false;
      if (filter){
        catFilter = true;
      }
      if(user){
        userFilter = true;
      }
      fullLogs.forEach((log)=>{
        if (catFilter && userFilter){
          if (log.ActionType.includes(filter) && log.UserId === user){
            tempLogs.push(log);
          }
        }else if(catFilter && !userFilter){
          if(log.ActionType.includes(filter)){
            tempLogs.push(log);
          }
        }else if(!catFilter && userFilter){
          if(log.UserId === user){
            tempLogs.push(log);
          }
        }
      });
      if(!catFilter && !userFilter){
        setLogs(fullLogs);
      }else{
        setLogs(tempLogs);
      }
    }

    useEffect(() => {
      filterLogs(catFilter, userFilter);
    }, [catFilter, userFilter]);
    
    function deleteCheckbox(e,id){
      let tempLog = [...deleteMany];
      console.log(e.target.checked);
      if(e.target.checked){
        tempLog.push(id);

      }else if(!e.target.checked){
        tempLog.forEach((log, index)=>{
          console.log(log);
          if (log === id){  
            tempLog.splice(index, 1);
          }
        });
      }
      setDeleteMany(tempLog);
    }

    function deleteManyLogs(){
      const postURL = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs';
      Swal.fire({
        title: 'Ar esate tikri?',
        text: 'Dėmesio, įrašas bus pašalintas!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Atšaukti',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Taip, pašalinti!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          fetch(postURL, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: deleteMany
            }),
        }).then(()=>{
          fetchData();
          setDeleteMany([]);
          Swal.fire({
            text: 'įrašas buvo pašalintas!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Gerai!'
          });
        });
        }
      });
    }

  return (
    <div className='historyPage'>
      <div className='historyPageSelectContainer'>
      <select defaultValue={""} onChange={(e)=>{setCatFilter(e.target.value)}} className="historyPageSelectOption">
        <option value={""}>Rodyti visus veiksmus</option>
        <option value={"Pridėjo"}>Rodyti tik pridėjimus</option>
        <option value={"Ištrynė"}>Rodyti tik pašalinimus</option>
        <option value={"Atnaujino"}>Rodyti tik atnaujinimus</option>
      </select>
      <select defaultValue={""} onChange={(e)=>{setUserFilter(e.target.value)}} className="historyPageSelectOption">
        <option value={""}>Rodyti visus vartotojus</option>
        {users.map((user)=>(
          <option value={user._id}>{user.name}</option>
        ))}
      </select>
      {deleteMany.length >0 && <button className="deleteSelectedBtn" onClick={()=>{deleteManyLogs()}}>Ištrinti pasirinktus</button>}
      </div>
        {!isLoading? logs.map((log)=>(
            <div className='historyPageLogSingle' key={log._id}>
            <div className='historyPageLogTimestamp'><span>{log.Timestamp.split("T")[0]}::{log.Timestamp.split("T")[1].slice(0,8)}</span></div>
            <div className='historyPageLogUsername'>{users.map((user)=>(
                user._id === log.UserId && <div key={user._id}>{user.name}</div>
            ))}</div>
            <div className='historyPageLogActionType'><span>{log.ActionType}: </span></div>
            <div className='historyPageLogData'>
                <div><span>Pavadinimas:</span>{log.Data.Name}</div>
                <div><span>Suma:</span>{log.Data.Amount}€</div>
                <div><span>Data:</span>{log.Data.Date.slice(0,10)}</div>
                <div><span>Kategorija:</span>{log.Data.Category}</div>
            </div>
            <div className='historyPageLogDeleteBtn'>
              <button onClick={()=>{deleteLog(log._id)}}><FaTrash /></button>
              <input onChange={(e)=>{deleteCheckbox(e,log._id)}} type="checkbox" id="deleteManyCheck" name="deleteManyCheckbox"/>
            </div>
            </div>
        )):<SpinningLoad/>}
    </div>
  )
}

export default HistoryLog