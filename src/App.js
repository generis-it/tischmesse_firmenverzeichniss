import './App.css';
import React, { useState, useEffect } from 'react'

import Aussteller from './Aussteller';
import Inserat from './Inserat';

function App() {
  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: 'keyigRrBXDdtbuUQ3' }).base('appShZ2e3RAuNGWGt');

  const [aussteller, setAussteller] = useState([]);
  const [ins, setIns] = useState([]);
  const [filterString, setfilterString] = useState("");
  const [filterBranche, setfilterBranche] = useState("");

  const suchstring = 'AND(SEARCH("' + filterString.toLowerCase() + '", LOWER({Firmenname})), SEARCH("' + filterBranche.toLowerCase() + '", LOWER({Branche})))';
  useEffect(() => {
    base('Aussteller').select({ filterByFormula: suchstring, view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setAussteller(records);
        fetchNextPage();
      });

  }, [filterString, filterBranche]);

  useEffect(() => {
    base('Inserate').select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setIns(records);
        fetchNextPage();
      });
  }, []);



  const setFilter = (filter) => {
    setfilterString(filter.target.value);
  }
  const setBranchenFilter = (filter) => {
    console.log(filter);
    setfilterBranche(filter.target.value);
  }
  const clearFilter = () => {
    setfilterString("");
    setfilterBranche("");
  }

  return (
    <div className="App">
      <header>
        <h1>Tischmesse 2023</h1>
        <h2>Firmenverzeichnis</h2>
        <div className='filter'>
          <div className='filter-col'>
            <label>Suchen sie eine Firma:</label>
            <input type="text" placeholder="Ihr Suchtext..." onChange={setFilter} />

          </div>
          <div className='filter-col'>
            <label for="branchen">Filtern nach Branche:</label>
            <select name="branchen" id="brachen" onChange={setBranchenFilter}>
              <option value="">Branche wählen</option>
              <option value="EDV">EDV</option>
              <option value="Industrie">Industrie</option>
              <option value="Medien">Medien</option>
              <option value="Finanzen">Finanzen</option>
            </select>
          </div>

          <div className='filter-col'>

          <label for="loeschen">_</label>
          <input type="button" value="Filter löschen" onClick={clearFilter} />
          </div>
        </div>

      </header >
    <main>
      <div id="aussteller-cards">
        {
          aussteller.map((e) => (
            <Aussteller key={e.id} aussteller={e.fields} />
          ))
        }
        {
          ins.map((e) => (
            <Inserat screen="mobile" bild={e.fields.Inserat[0].url} />
          ))}
      </div>
      <div id="sidebar">
        {ins.map((e, index) => (
          <Inserat screen="desktop" key={e.id} bild={e.fields.Inserat[0].url} />
        ))}

      </div>
    </main>
    </div >
  );
}

export default App;
