import React, { useEffect, useState } from 'react'
import './Grid.css';
import Avatar from '../logos/profile-avatar.png'
import { useDispatch } from 'react-redux'
import { deleteUser, editUser } from '../features/users/usersSlice';
import Button from './Button';
import Input from './Input';

function Grid({user, editEnabled, doSaveAll}) {

    const dispatch = useDispatch(),
        [showEdit, setShowEdit] = useState(false),
        [editedName, setEditedName] = useState(''),
        removeUser = () => {
            dispatch(deleteUser(user.id));
        },
        renameUser = () => {
            if (editedName) {
                let newUser = editedName;
                setShowEdit(false);
                dispatch(editUser({id: user.id, name:newUser}));
            } else {
                alert("Please enter a valid user name");
            }
        },
        cancelRename = () => {
            setShowEdit(false);
        }

    useEffect(() => {
        if (doSaveAll) {
            renameUser();
        }
    }, [doSaveAll])
  return (
    <div className='grid' data-testid="grid">
        <div className='grid__container'>
            <div className='grid__details'>
                <img src={Avatar} alt='avatar_logo'></img>
                {showEdit || editEnabled ? 
                <Input
                    type='text'
                    id={user.id + 'userEdit'}
                    size='small'
                    defaultValue={user.name}
                    onChangeCallback={(e) => setEditedName(e.target.value)}
                    onEnterCallback={() => renameUser()}
                    ariaLabel={`Enter the edited name of the user - ${user.name}`}/>
                :
                <span>{user.name}</span>}
            </div>
            <div className='grid__options'>
                {editEnabled ?
                    <span>Use "Save All" button to save changes</span>
                    :
                    <>
                        {showEdit ? 
                        <>
                            <Button name='Save' size='medium' variant='positive' callback={() => renameUser()} />
                            <Button name='Cancel' size='medium' variant='negative' callback={() => cancelRename()} />
                        </> : 
                        <>
                            <Button name='Edit' size='medium' variant='theme' callback={() => setShowEdit(true)} />
                            <Button name='Delete' size='medium' variant='negative' callback={removeUser} />
                        </>}
                    </>
                }

            </div>
        </div>
    </div>
  )
}

export default Grid