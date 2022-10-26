
import React from 'react'

const Aussteller = ({ id, aussteller}) => {
    let styles = {
        borderColor: aussteller.Farbe,
      };
    
    return (
    <div className="article"  style={styles}>
        <div className="card_top" >
            <h3>{aussteller.Firmenname}</h3>
          
      
        </div>
       
        <div className='card_middle'>
        <img src={aussteller.Logo[0].url} alt="" />
            <div className="label_box">
                    <div className="tag">label</div>
                    <div className="tag">label</div>
            </div>
        </div>
        <div id="card_detail_1" class="card_detail">
                <p>{aussteller.Beschreibung}

                </p>

            </div>
            <div class="card_bottom">
                <div class="icon_text">
                    
                    <p>info@internetter.ch</p>
                </div>
                <div class="icon_text">
                   
                    <p>078 826 31 08</p>
                </div>
            </div>
    </div>)
}
export default Aussteller

