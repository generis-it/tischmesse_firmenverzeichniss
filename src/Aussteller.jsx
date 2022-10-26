
import React from 'react'

const Aussteller = ({ id, aussteller }) => {
    
    return (
    <div className="article">
        <div className="card_top" >
    <h3>{aussteller.Firmenname}</h3>
    <p>{aussteller.Beschreibung}</p>
    <img src={aussteller.Logo[0].url} alt="" />

        </div>
    </div>)
}
export default Aussteller

// import React from 'react'


// const Aussteller = ({ id, aussteller }) => {
//     return (<div className="article" >
//         <div className="card_top" >
//             <
//         h3 > {aussteller.Firmenname} < /h3> <
//         p > {aussteller.Beschreibung} < /p> <
//                         img src={aussteller.Logo[0].url}
//                     />

//                     <
//         /div>

//                     <
//         /div>
//                     )
                    
// }

//                     export default Aussteller