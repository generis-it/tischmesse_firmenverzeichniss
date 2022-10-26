import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import base from './api/base';
import AusstellerCard from './AusstellerCard';



function App() {
const [aussteller, setAussteller] = useState([]);
console.log(aussteller)
useEffect(() => {
  base('Aussteller').select({view: 'Grid view'})
  .eachPage((records,fetchNextPage)=> {
    setAussteller(records);
    fetchNextPage();
  })
}
)
  return (
    <div className="App">
      <header>
        <h1>Tischmesse 2023</h1>
        <h2>Ausstellerverzeichnis</h2>
        <input type="text" placeholder="Suche..."/>
    </header>
    <main>
      {aussteller.map((e)=> (
        <AusstellerCard key={e.id} aussteller={e.fields}/>
      ))}
  </main>
    </div>
  );
}

export default App;
