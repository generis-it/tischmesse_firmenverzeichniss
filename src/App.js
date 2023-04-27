import './App.css';
import React, { useState, useEffect } from 'react'

import Aussteller from './Aussteller';
import Footer from './Footer';
import Inserat from './Inserat';
import Delete from './img/delete.svg';
import Logo from './img/logo_sh.jpeg';
import Loading from './img/bock_loading.gif';

function App() {
  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: 'keyigRrBXDdtbuUQ3' }).base('appShZ2e3RAuNGWGt');
  const [filterString, setfilterString] = useState("");
  const [filterBranche, setfilterBranche] = useState("");
  const [sortMode, setSortMode] = useState("NameAuf");
  const [initalAussteller, setInitialAussteller] = useState([]);
  const [aussteller, setAussteller] = useState([]);
  const [ins, setIns] = useState([]);
  const [branchen, setBranchen] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    base('Aussteller').select({ 
      view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setInitialAussteller(state => [...state, ...records]);
        setAussteller(state => [...state, ...records]);
        fetchNextPage();  
      });
      setLoading(false);
  }, []);
  
  //Branchenfilter
  useEffect(() => {
    base('Aussteller').select()
      .eachPage((records) => {
        let bra = []
        records.forEach((rec) => {
          bra = bra.concat(rec.fields.branche.filter(item => bra.indexOf(item) < 0));
        });
        const sorted = Array.from(bra).sort();
        setBranchen(sorted);
      });

  }, []);

  useEffect(() => {
    base('Inserate').select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        records.sort( ()=>Math.random()-0.5 );
        setIns(records);
        fetchNextPage();
      });
  }, []);

  const setFilter = (filter) => {
    setfilterString(filter.target.value);
    const newArray = initalAussteller.filter(
      a => a.fields.Firmenname.toLowerCase().includes(filter.target.value.toLowerCase()))
    setAussteller(newArray);
  }
  const setBranchenFilter = (filter) => {
    setfilterBranche(filter.target.value);
    const newArray = initalAussteller.filter(
      a => a.fields.branche.includes(filter.target.value))
    setAussteller([...newArray]);
  }
  const clearFilter = () => {
    setfilterBranche("")
    setfilterString("")
    setAussteller([...initalAussteller]);
    setSortMode("NameAuf");
  }
  const setSortingMode = (sortmode) => {
    setSortMode(sortmode.target.value);
    setfilterBranche("")
    setfilterString("")
    console.log("sortMode changed to " + sortmode.target.value);
  }

  useEffect(() => {

    let newArray = [];
    switch (sortMode) {
      case "NameAuf":
        newArray = [...initalAussteller];
        break;
      case "NameAb":
        newArray = [...initalAussteller];
        newArray.reverse();
        break;
      case "NrAuf":
  
        newArray =  [...initalAussteller];
        newArray.sort(function(a, b) {
          console.log(a.fields.Tischnummer); 
          return a.fields.Tischnummer - b.fields.Tischnummer
        });

        break;
      case "NrAb":
        newArray =  [...initalAussteller];
        newArray.sort(function(a, b) {
          return b.fields.Tischnummer - a.fields.Tischnummer
        });

        break;
      default:
        newArray = aussteller;
    }
    setAussteller([...newArray]);
  }, [sortMode]);


  const content = () => {
    let inhalt = [];

    //ausserller als Elemente dem Array hinzufügen
    inhalt.push(aussteller.map((e) => (
      <Aussteller key={e.id} aussteller={e.fields}/>
    )))

    //Inserate untermischen
    for (let i =0; i<ins.length; i++){
      const verschiebung = 3;
      const insertpos = i *3+verschiebung;
        inhalt[0].splice(insertpos,0,<Inserat screen="mobile shuffle" bild={ins[i].fields.Inserat[0].url} link={ins[i].fields.url} key={ins[i].id}/>)
    }

    return inhalt;

  }

  return (
    <div className="App">
      <header>
        <img src={Logo} alt="Logo" id="sh-logo" />
        <h1>Schaffhauser Tischmesse 2023</h1>
       
        <div className='filter'>
          <div className='filter-col' id="suche">
            <label>Suchen Sie eine Firma:</label>
            <input type="text" placeholder="Ihr Suchtext..." value={filterString} onChange={setFilter} />

          </div>
          <div className='filter-col' id="auswahl">
            <label htmlFor="branchen">Branchenfilter</label>
            <select name="branchen" id="brachen" value={filterBranche} onChange={setBranchenFilter}>
            <option value="">---</option>
            {
              branchen.map((e) => (
                <option value={e} key={e}>{e} </option>
              ))
            }
            </select>
          </div>
          <div className='filter-col' id="auswahl">
            <label htmlFor="sortieren">Sortieren</label>
            <select name="sortieren" id="sortieren" value={sortMode} onChange={setSortingMode}>
            <option value="NameAuf">A - Z</option>
            <option value="NameAb">Z - A</option>
            <option value="NrAuf">Tischnummer aufsteigend</option>
            <option value="NrAb">Tischnummer absteigend</option>
            
            </select>
          </div>

          <div className='filter-col' id="clean">

          <label htmlFor="delete-button"></label>

          <input type="image" id="delete-button" name="delete-button" src={Delete} onClick={clearFilter} />
          </div>
        </div>

      </header >
    <main>
    
      <div id="aussteller-cards">
      {loading && <div className='loading'>
        <img src={Loading} alt="Loading Image" className="loading-image" />
        <h2>Firmen werden geladen...</h2>
        </div>}
        
        {
          content()
        }
        
      </div>
      <div id="sidebar">
        {ins.map((e, index) => (
          <Inserat screen="desktop"  bild={e.fields.Inserat[0].url} link={e.fields.url} key={e.id}/>
        ))}

      </div>
    </main>
    <Footer/>
    </div >
  );
}

export default App;
