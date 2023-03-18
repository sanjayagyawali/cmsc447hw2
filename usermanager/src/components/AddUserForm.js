import React, {useState, useEffect} from 'react'


function AddUserForm(){

    const [data, setData] = useState([{
        name: "",
        id: "",
        score: ""
      }])
    
    async function submit(e){
        e.preventDefault();
        await fetch('http://127.0.0.1:5000/add/' + data.id + '/' + data.name + '/' + data.score, { 
            method: 'POST'
            })
            .then(res => res.json())
            .then(alert(`${data.name} added`))
            .then(window.location.reload(false));
    }

    function handle(e){
    const newData = {...data}
    newData[e.target.id] = e.target.value
    setData(newData)
    }    

    return (
        <div>
            <h2>Add New User</h2>
            <form onSubmit = {(e) => submit(e)}>
                <input onChange = {(e) =>handle(e)} id="id" required value = {data.id} placeholder='id' type = "number"></input>
                <input onChange = {(e) =>handle(e)} id="name" required value = {data.name} placeholder='name' type = "text"></input>
                <input onChange = {(e) =>handle(e)} id="score" required value = {data.score} placeholder='score' type = "number"></input>
                <button style={{'backgroundColor':'green'}}>Add User</button>
            </form>
        </div>
    );
}

export default AddUserForm;