import React, {useState, useEffect} from 'react';
import './HistoryLog.css';
import Swal from 'sweetalert2';
import { FaTrash, FaRegEdit } from 'react-icons/fa';

const HistoryLog = () => {
    let [logs, setLogs] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [users, setUsers] = useState([]);

    const fetchData = () =>{
        fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/users')
                .then(response => response.json())
                .then(data => {
                setUsers(data.data.users)}).then(()=>{
                    fetch('http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/logs')
                    .then(response => response.json())
                    .then(data => {
                    setLogs(data.data.logs);
                    setIsLoading(false);
                    });
                });
    }
    useEffect(() => {
      fetchData();
    }, [])
    

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
                  id: id
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
  return (
    <div className='historyPage'>
        {!isLoading&& logs.map((log)=>(
            <div className='historyPageLogSingle'>
            <div className='historyPageLogTimestamp'><span>{log.Timestamp.split("T")[0]}::{log.Timestamp.split("T")[1].slice(0,8)}</span></div>
            <div className='historyPageLogUsername'>{users.map((user)=>(
                user._id === log.UserId && <div>{user.name}</div>
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
            </div>
            </div>
        ))}
    </div>
  )
}

export default HistoryLog