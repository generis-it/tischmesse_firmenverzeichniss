import React from 'react'

const Inserat = ({bild, screen, link}) => {
    return (<a href={link} target="_blank" className={screen}><img className="ins-img" src={bild} ></img></a>)
}
export default Inserat