
import React from 'react';
import plus from './img/plus.svg';
import minus from './img/minus.svg';
import { useState, useEffect } from 'react';

const Aussteller = ({ id, aussteller}) => {
    const [open, setOpen] = useState(false);



    let styles = {
        borderColor: aussteller.Farbe,
      };
    
    return (
    <div className="article"  style={styles}>
        <div className="card_top" >
            <h3>{aussteller.Firmenname}</h3>
        {!open &&   <img src={plus} alt="plus" onClick={() => setOpen(!open)}/>} 
        {open &&   <img src={minus} alt="plus" onClick={() => setOpen(!open)}/>} 
      
        </div>
       
        <div className='card_middle'>
        <img src={aussteller.Logo[0].url} alt="" />
            <div className="label_box">
                    <div className="tag">label</div>
                    <div className="tag">label</div>
            </div>
        </div>
        {open &&   <div id={id} className="card_detail_1">
                <p>{aussteller.Beschreibung}
                </p>

            </div>}
       

            <div className="card_bottom">
                <div className="icon_text">
                    
                    <p>info@internetter.ch</p>
                </div>
                <div className="icon_text">
                   
                    <p>078 826 31 08</p>
                </div>
            </div>
    </div>)
}
export default Aussteller

