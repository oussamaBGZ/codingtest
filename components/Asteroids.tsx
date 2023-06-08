import React, { Dispatch } from 'react'
export type selectedAstro={
    name:string,
    nasa_jpl_url:string,
    absolute_magnitude_h:number,
    estimated_diameter:{
        kilometers:{
            estimated_diameter_min:number,
            estimated_diameter_max:number
        }
    }
}
export interface selectedAstroProps{
    selectedAstro:selectedAstro,
    setSelectedAstro:Dispatch<any>
}
function Asteroids({selectedAstro,setSelectedAstro}:selectedAstroProps) {
  return (
    <div>
        <p>name: {selectedAstro.name}</p>
        <a href={selectedAstro.nasa_jpl_url} target='_blank'>nase jpl url</a>
        <p>magnitude: {selectedAstro.absolute_magnitude_h}</p>
        <p>diameter: {(selectedAstro.estimated_diameter.kilometers.estimated_diameter_max+selectedAstro.estimated_diameter.kilometers.estimated_diameter_min)/2} km</p>
    <button onClick={()=>setSelectedAstro(null)}>Back</button>
    </div>
  )
}

export default Asteroids