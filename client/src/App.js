import './App.css';
import { useEffect, useState,useRef } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:4005');

function App() {
  const [users, setUsers] = useState([]);
  const inputRef=useRef("");
  
  socket.emit('newUser', { name: 'Client User', id: socket.id })
  

  useEffect(() => {
    
    console.log("Hello")
    socket.on('newUserAdded', (data) => {
      setUsers(data)
    })

    return ()=>{
      socket.disconnect();
    }

  }, [users])


  function submitMessage(e){
      e.preventDefault();
      socket.emit('chat message',inputRef.current.value);
  }

  function changeInputValue(e){
    inputRef.current.value=e.target.value;
  }


  return (
    <div className="App">
      <div className='tw-flex'>

        <div className='tw-h-[100vh] tw-w-[20%] tw-bg-red-200'>
          <div>
            <h1 className='tw-text-[20px] tw-mt-3 tw-ml-4 tw-uppercase'>Active User</h1>
          </div>
          <ul className='tw-bg-yellow-30 tw-p-5 tw-mt-5'>
            {
              users.map((el, indx) => {
                return <li key={indx} className='tw-text-blue-900 tw-text-left tw-text-[17px] tw-flex tw-flex-col tw-gap-4'>
                  {el}
                </li>
              })
            }
          </ul>
        </div>
        <div className='tw-flex tw-flex-col tw-flex-1 '>
          <div className='tw-flex-1'>

            <h1>
              Rohan
            </h1>
            <h1>Hello</h1>
          </div>
          <div className='tw-w-full tw-bg-[rgba(0,0,0,0.15)]'>
            <form>
              <div className='tw-flex tw-gap-2'>
                <input ref={inputRef}   className=' tw-flex-1 tw-h-[10px]  tw-p-5 tw-m-2 tw-rounded-[20px]' onChange={changeInputValue} />
                <button onClick={submitMessage} className='tw-px-[1.6rem] tw-py-[0.5rem] tw-bg-blue-300'>Send</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
