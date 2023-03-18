import React, {useState, useEffect} from 'react'


function DeleteUserForm(){

    const [data, setData] = useState([{
        delid: ""
      }])
    
      async function submit(f){
        f.preventDefault();
        await fetch('http://127.0.0.1:5000/delete/' + data.delid, { 
            method: 'DELETE'
            })
            .then(res => res.json())
            .then(alert(`deleted user with id: ${data.delid}`))
            .then(window.location.reload(false));
      }

      function handle(f){
        const newData = {...data}
        newData[f.target.id] = f.target.value
        setData(newData)
      }    

    return (
        <div>
            <h2>Delete User by ID</h2>
            <form onSubmit = {(f) => submit(f)}>
            <input onChange = {(f) =>handle(f)} id="delid" required value = {data.delid} placeholder='id to delete' type = "number"></input>
                <button style={{'backgroundColor':'red'}}>Delete User</button>
            </form>
        </div>
    );
}

export default DeleteUserForm;