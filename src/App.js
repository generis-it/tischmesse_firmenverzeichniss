import './App.css';
import React, { useState, useEffect } from 'react'

import Aussteller from './Aussteller';
import Inserat from './Inserat';

function App() {
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyigRrBXDdtbuUQ3'}).base('appShZ2e3RAuNGWGt');

const [aussteller, setAussteller] = useState([]);
const [ins, setIns] = useState([]);


//Ap anfragen und records in Hook speichern
useEffect(() => {
  base('Aussteller').select({view: "Grid view"})
  .eachPage((records, fetchNextPage) => {
  setAussteller(records);
  console.log(records);
  fetchNextPage();
  });
  base('Inserate').select({view: "Grid view"})
  .eachPage((records, fetchNextPage) => {
  setIns(records);
  console.log(records);
  fetchNextPage();

  //shuffle elements mit werbung
  
  var ul = document.querySelector('#aussteller-cards');
  for (var i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[Math.random() * i | 0]);}

  });
}, []);

// let opencards = [];

// const expand = (id) => {
//     const cardMiddle = document.getElementById("card_detail_" + id);
//     const button = document.getElementById("expand_Button_" + id);
//     if (opencards.includes(id)) {
//         console.log("gefunden");
//         opencards.pop(id);
//         cardMiddle.style.display = 'none';
//         button.src = "plus.svg";

//     } else {
//         console.log("nicht gefunden");
//         cardMiddle.style.display = 'flex';
//         opencards.push(id);
//         button.src = "minus.svg";
//     }
// }


  return (
    <div className="App">
      <header>
        <h1>Tischmesse 2023</h1>
        <h2>Ausstellerverzeichnis</h2>
        {/* <input type="text" placeholder="Suche..."/> */}
    </header>
    <main>
      <div id="aussteller-cards">
      {
      ins.map((e)=> (
        <Inserat screen="mobile" bild={e.fields.Inserat[0].url}/>
      ))}
{
      aussteller.map((e)=> (
        <Aussteller key={e.id} aussteller={e.fields}/>
      ))}
      
      </div>
      <div id="sidebar">
      {ins.map((e)=> (
        <Inserat screen="desktop" bild={e.fields.Inserat[0].url}/>
      ))}
      </div>
  </main>
    </div>
  );
}

export default App;
