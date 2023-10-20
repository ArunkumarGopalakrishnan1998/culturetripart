import './App.css';
import Options from './components/Options';
import Listing from './components/Listing';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { addUser } from './features/users/usersSlice';

function App() {

  const dispatch = useDispatch(),
        fetchUsers = async () => {
          const response = await fetch('https://jsonplaceholder.typicode.com/users'),
                data = await response.json();
                data.forEach(element => {
                  dispatch(addUser(element));
                });
        },
        [editAll, setEditAll] = useState(false),
        [saveAll, setSaveAll] = useState(false);

  useEffect(() => {
    document.title = 'CULTURETRIPART';
    fetchUsers();
  }, [])

  return (
    <div className="App">
      <div className='app__header'>
          Welcome
      </div>

      <div className='app__options'>
        <Options editAll={editAll} setEditAll={setEditAll} saveAll={saveAll} setSaveAll={setSaveAll}/>
      </div>

      <div className='app__listing'>
        <Listing editAll={editAll} saveAll={saveAll}/>
      </div>

      <div className='app__footer'>
          Thank you
      </div>
    </div>
  );
}

export default App;
