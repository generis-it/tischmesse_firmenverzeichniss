import React from 'react'

const Inserat = ({bild, screen, link, id}) => {
    return (<a href={link} target="_blank" className={screen}><img className="ins-img" src={bild} key={id}></img></a>)
}
export default Inserat