import React from 'react';


function AusstellerCard({ id, aussteller }) {
    return (<
        div className="article" >
        <
        div className="card_top" >
            <
        h4 > {aussteller.Firmenname} < /h4> <
        p > {aussteller.Beschreibung} < /p> <
                        img src={aussteller.Logo[0].url}
                    />

                    <
        /div>

                    <
        /div>
                    );
                    
}

                    export default AusstellerCard