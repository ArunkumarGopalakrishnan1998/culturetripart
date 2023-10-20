import React from 'react';
import './Options.css';
import { useSelector, useDispatch } from 'react-redux'
import { addUser, deleteAllUsers } from '../features/users/usersSlice';
import Button from './Button';
import Input from './Input';

function Options({editAll, setEditAll, saveAll, setSaveAll}) {
  const dispatch = useDispatch(),
        createUser = () => {
          if (document.getElementById('userInput').value) {
            let user = {id: Math.random() * 1000, name: document.getElementById('userInput').value};
            document.getElementById('userInput').value = '';
            dispatch(addUser(user));
          } else {
            alert("Please enter a valid user name");
          }

        },
        removeAllUsers = () => {
          setEditAll(false)   
          dispatch(deleteAllUsers());
        },
        users = useSelector((state) => state.users);
  return (
    <div className='options'>
      
      <div className='options__add'>
          <span>Add New User:</span>
          <div>
            <Input id='userInput' type='text' onEnterCallback={createUser} ariaLabel='Enter the name of the user to be added'/>
            <Button name='Add User' variant='theme' callback={createUser}/>
          </div>
      </div>

      <div className='options__common'>
        {users.length ? 
          <>
            <Button name='Delete All' callback={removeAllUsers} size='medium' variant='negative'/>
            {editAll ? 
              <div>
                <Button name='Edit All' size='medium' variant='theme disabled'>Edit All</Button>
                <Button name='Save all' size='medium' variant='positive' callback={() => {setSaveAll(!saveAll); setEditAll(!editAll)}}/>
                <Button name='X' size='small' variant='negative' tooltip='Discard Changes' callback={() => setEditAll(!editAll)} />
              </div> : 
                <Button name='Edit All' size='medium' variant='theme' callback={() => setEditAll(!editAll)} />
              }
          </> : <></>  
        }
      </div>
    </div>
  )
}

export default Options