import React from 'react'
import './Map1.css'
import { MapContainer, TileLayer, Circle, Popup, Tooltip } from "react-leaflet";



const CasesTypeColors= {
   cases : { hex : "#CC1034",
             multiplier: 400, },

   recovered: { hex : "#7dd71d",
                multiplier: 1200, },

   deaths : { hex : "#fb4443",
              multiplier: 2000, }

};


function Map1({countries,centre,zoom}) {
    return (
       <div className="map"> 
            <MapContainer center={centre} zoom={zoom} >
                  
                 <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     />
                  
                  {countries.map((country) => {
                  return (
                  <Circle
                  center={[country.countryInfo.lat, country.countryInfo.long]}
                  radius = {Math.sqrt(country['cases'])* CasesTypeColors['cases'].multiplier}
                  fillOpacity={0.2}
                  stroke={false}
                  color = {CasesTypeColors['cases'].hex}
                  >
                     
                     <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                      <span>{country["country"] + ": " + "Active Cases" + " " + country["active"]}</span>
                     </Tooltip> 
                     
                  </Circle> ) })}
                                 
                    
            </MapContainer>
       </div> 
    )
}

export default Map1
