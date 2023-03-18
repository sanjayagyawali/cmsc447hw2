import React, {useState, useEffect} from 'react'
import AddUserForm from './components/AddUserForm'
import DeleteUserForm from './components/DeleteUserForm'
import SearchUser from './components/SearchUser'

function App(){

  return (
    <div className='App' style={{'padding':'20px'}}>
      <div className='AddUser'>
        <AddUserForm />
      </div>
      <br/>
      <div className='DeleteUser'>
        <DeleteUserForm/>
      </div>
      <br/>
      <div className='SearchUser'>
        <SearchUser/>
      </div>
    </div>
  )
}

export default App