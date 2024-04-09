import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Enquiry from './Enquiry';

function App() {
  let [uname, setUname]=useState('')
  let [pw, setpw]=useState('');

  let handleForm=()=>{
    alert("You are sucessfully logged in !!!")
  }

  return (
    <div className="App">
    <Enquiry/>
    </div>
  );
}

export default App;
