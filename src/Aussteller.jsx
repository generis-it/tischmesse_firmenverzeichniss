
import React from 'react';
import plus from './img/plus.svg';
import minus from './img/minus.svg';
import map from './img/map.svg';
import person from './img/person.svg';
import person2 from './img/person2.svg';
import telefon from './img/telefon.svg';
import internet from './img/internet.svg';
import { useState, useEffect } from 'react';
import BranchenLabel from './BranchenLabel';

const Aussteller = ({ id, aussteller }) => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(false);
    const [pers, setPers] = useState(false);
    console.log(aussteller)

    useEffect(() => {
        try {
            const url = aussteller.Logo[0].url;
            setImage(true);
            const person = aussteller.Person2;
            setPers(person.length >= 2);

        } catch (error) {
            console.log("bild von " + { aussteller } + "nicht gefunden")
        }

    }, []);


    let styles = {
        borderColor: aussteller.Farbe,
    };
    
    const beschreibung = () => {
        let beschreibungsText = aussteller.Beschreibung;
        let array = beschreibungsText.split("\n");
        let inhalt = [];
        inhalt.push(array.map((e) => (
            <p>{e}</p>
          )))
        return inhalt;
    }

    return (
        <div className="article shuffle" style={styles}>
            <div className=' card_content_top'>


                <div className="card_top" >
                    <h3>{aussteller.Firmenname}</h3>
                    <div className='card_top_right'>
                        <h4>Tisch <br></br>Nr. {aussteller.Tischnummer}</h4>

                    </div>

                </div>
                <div className='card_middle'>
                    {image && <img src={aussteller.Logo[0].url} alt="" />}

                </div>
            </div>
            <div className='card_content'>


                {open && <>
                    <div className="icon_text">
                        <img src={person} alt="person" />
                        <p>{aussteller.Person1} </p>
                    </div>
                    {pers && <div className="icon_text" >
                        <img src={person2} alt="person" />
                        <p className='pers2'>{aussteller.Person2} </p>
                    </div>}

                    <div className="icon_text">
                        <img src={map} alt="plus" />
                        <p>{aussteller.ort}</p>
                    </div>
                    <div className="icon_text">
                        <img src={telefon} alt="plus" />
                        <p>{aussteller.telefon}</p>
                    </div>
                    <div id={id} className="card_detail_1">
                         {beschreibung()}
                        

                    </div>
                    <div className="label_box">
                        {
                            aussteller.branche.map((e) => (
                                <BranchenLabel key={e.id} label={e} />
                            ))

                        }
                    </div>



                </>
                }



                <div className="card_bottom">
                    <div className="icon_text">
                        <img src={internet} alt="internet" />
                        <a href={aussteller.url} target="_blank"><p>{aussteller.website}</p></a>
                    </div>
                    
                    {!open && <img src={plus} alt="plus" onClick={() => setOpen(!open)} />}
                        {open && <img src={minus} alt="plus" onClick={() => setOpen(!open)} />}
                </div>
            </div>
        </div>)
}
export default Aussteller

