
import React from 'react';
import SHLogo from './img/logo_sh.jpeg'
import SHStadt from './img/Stadt_Schaffhausen4-f18f22bd.png'
import Gewerbeverband from './img/Logo_KGV_kurz-35de938a.jpeg'
import IVS from './img/IVS-Logo-mit-Text-d8ed2d70.jpeg'
import GF from './img/gf_5cm-da6e8570.png'
import SHN from './img/sn_schriftzug_schwarz-3eb9ff27.png'
import RadioMunot from './img/Radio-Munot-Logo-0fb055c8.png'



const Footer = () => {

    return (
        <footer>
            <h3>Partner</h3>
            <div className="footer_logos">
                <img src={SHLogo} alt="SH Logo" />
                <img src={IVS} alt="IVS" />
                <img src={Gewerbeverband} alt="Gewerbeverband" />
                <img src={SHStadt} alt="SH Stadt" />
                <img src={GF} alt="Georg Fischer" />
            </div>
            <h3>Medienpartner</h3>
            <div className="footer_logos_medien">
                <img src={SHN} alt="Radio Munot" />
                <img src={RadioMunot} alt="Radio Munot" />
    
            </div>
            <p>© by Wirtschaftsförderung Schaffhausen, Freier Platz 10, 8200 Schaffhausen - 2023</p>
            <a href='https://standort.sh.ch/CMS/Webseite/Wirtschaftsf-rderung-Kanton-Schaffhausen/-ber-uns--Kontakt/Impressum/Datenschutz-1726711-DE.html' target='_blank'> Datenschutz</a> 
            | 
            <a href='https://generis.ch/impressum/' target='_blank'> Impressum</a>
        </footer>
        )
}
export default Footer

