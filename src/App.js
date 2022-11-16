import './App.css';
import React, { useState, useEffect } from 'react'

import Aussteller from './Aussteller';
import Inserat from './Inserat';

function App() {
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyigRrBXDdtbuUQ3'}).base('appShZ2e3RAuNGWGt');

const [aussteller, setAussteller] = useState([]);
const [filterString, setfilterString] = useState("");
const [ins, setIns] = useState([]);
const [content, setContent] = useState([]);

//Ap anfragen und records in Hook speichern

const suchstring = 'SEARCH("'+filterString.toLowerCase() +'", LOWER({Firmenname}))'
//const suchstringLowecase = filter

useEffect(() => {

  base('Aussteller').select({filterByFormula: suchstring, view: "Grid view"})
  .eachPage((records, fetchNextPage) => {
  setAussteller(records);
  fetchNextPage();
  });
  base('Inserate').select({view: "Grid view"})
  .eachPage((records, fetchNextPage) => {
  setIns(records);

  fetchNextPage();
  });
  
}, [filterString]);

const setFilter = (filter) => {
  console.log(filterString);
  setfilterString(filter.target.value);
}

  return (
    <div className="App">
      <header>
        <h1>Tischmesse 2023</h1>
        <h2>Firmenverzeichnis</h2>
         <input type="text" placeholder="Suche..." onChange={setFilter}/>
    </header>
    <main>
      <div id="aussteller-cards">
      
{   

      aussteller.map((e)=> (
        <Aussteller key={e.id} aussteller={e.fields}/>
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
