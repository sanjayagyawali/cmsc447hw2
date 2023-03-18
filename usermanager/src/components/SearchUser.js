import React, {useState, useEffect} from 'react'


function SearchUser(){

    const [data, setData] = useState([{
        sname: ""
      }])
    const[result, setResult] = useState("")
    
    async function submit(g){
        g.preventDefault();
        await fetch('http://127.0.0.1:5000/getUser/' + data.sname, { 
            method: 'GET'
            })
            .then(res => res.text())
            .then(res => {
                console.log(res);
                setResult(res)
            })
      }

      function handle(g){
        const newData = {...data}
        newData[g.target.id] = g.target.value
        setData(newData)
      }    

    return (
        <div>
            <h2>Search for User</h2>
            <form onSubmit = {(g) => submit(g)}>
                <input onChange = {(g) =>handle(g)} id="sname" required value = {data.sname} placeholder='search for name' type = "text"></input>
                <button >Search For User</button>
            </form>
            <div className='result'>
                <h4>{result}</h4>
            </div>
        </div>
    );
}

export default SearchUser;