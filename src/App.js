import './App.css';
import React, { useState, useEffect } from 'react'

import Aussteller from './Aussteller';
import Inserat from './Inserat';

function App() {
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyigRrBXDdtbuUQ3'}).base('appShZ2e3RAuNGWGt');

const [aussteller, setAussteller] = useState([]);
const [branchen, setBranchen] = useState([]);
const [ins, setIns] = useState([]);
const [filterString, setfilterString] = useState("");
const [filterBranche, setfilterBranche] = useState("");


//Ap anfragen und records in Hook speichern


const suchstring = 'AND(SEARCH("'+filterString.toLowerCase() +'", LOWER({Firmenname})), SEARCH("'+filterBranche.toLowerCase() +'", LOWER({Branche})))'


useEffect(() => {
  base('Aussteller').select({filterByFormula: suchstring, view: "Grid view"})
  .eachPage((records, fetchNextPage) => {
  setAussteller(records);
  console.log(records);
  fetchNextPage();
  });
  base('Inserate').select({view: "Grid view"})
  .eachPage((records, fetchNextPage) => {
  setIns(records);
  fetchNextPage();
  });
  base('Branchen').select({view: "Grid view"})
  .eachPage((records, fetchNextPage) => {
  setBranchen(records);
  console.log(records);
  fetchNextPage();
  });
  
}, [filterString, filterBranche]);

const setFilter = (filter) => {
  setfilterString(filter.target.value);
}
const setBranchenFilter = (filter) => {
  console.log(filter);
  setfilterBranche(filter.target.value);
}
const clearBranchenFilter = ()  => {
  setfilterBranche("");
}

  return (
    <div className="App">
      <header>
        <h1>Tischmesse 2023</h1>
        <h2>Firmenverzeichnis</h2>
         <input type="text" placeholder="Suche..." onChange={setFilter}/>
         <h2>Branchenfilter</h2>
         <div className='branchen-filter'>
          
        <input type="button" value="Industrie" onClick={setBranchenFilter}/>
        <input type="button" value="Kommunikation" onClick={setBranchenFilter}/>
        <input type="button" value="Medien" onClick={setBranchenFilter}/>
        <input type="button" value="EDV" onClick={setBranchenFilter}/>
                <input type="button" value="Filter löschen" onClick={clearBranchenFilter}/>
         </div>
    </header>
    <main>
      <div id="aussteller-cards">
      
{   

      aussteller.map((e)=> (
        <Aussteller key={e.id} aussteller={e.fields} branchen={branchen}/>
      ))
      }
      {
      ins.map((e)=> (
        <Inserat screen="mobile" bild={e.fields.Inserat[0].url}/>
      ))}
      </div>
      <div id="sidebar">
      {ins.map((e, index)=> (
        <Inserat screen="desktop" key={e.id} bild={e.fields.Inserat[0].url}/>
      ))}
      
      </div>
  </main>
    </div>
  );
}

export default App;
