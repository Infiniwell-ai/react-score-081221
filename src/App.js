import './App.css';
import React from 'react'; 
import Caluculator from './components/caluculator'; 
import {useState, useEffect} from 'react';
import axios from 'axios'
  const getIPAddress = async () =>{
  const { data : {IPv4},data:{} } = await axios.get('https://geolocation-db.com/json/');
  axios.post('http://localhost:8000/api/logs/data-logs', { "ip_address" : IPv4})
         .then(response => console.log(response));
  
  console.log(IPv4,"ipaddress");
 };
function App() {
  
  
   useEffect( () => {
    //passing getData method to the lifecycle method
    getIPAddress()

   }, [])

  return (
    <div className="App">
      <Caluculator />
    </div>
    
  );
}
export default App;










