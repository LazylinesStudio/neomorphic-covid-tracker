import React from 'react';
import "./Infobox.css"

function InfoBox( {title, total}) {
    
    
    return (
        <div className= "InfoBox">
            
                <h5 className="InfoBox__title"> {title} </h5>
                <h3 className="InfoBox__cases"> {total} </h3>
        </div>
            

        
    )
}

export default InfoBox
