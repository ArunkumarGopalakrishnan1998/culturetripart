import React from 'react';
import './Listing.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addUsers } from '../features/users/usersSlice';
import Grid from './Grid';
function Listing({editAll, saveAll}) {

    const users = useSelector((state) => state.users) || [];

  return (
    <div className='listing' data-testid="listing">
        <div className='listing__container'>
            {users.map((item, index) => <Grid user={item} editEnabled={editAll} doSaveAll={saveAll} key={index}/>)}
        </div>
    </div>
  )
}

export default Listing