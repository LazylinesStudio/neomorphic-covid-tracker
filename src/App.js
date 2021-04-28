import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import './App.css';
import InfoBox from "./InfoBox"
import Table from "./Table";
import {useEffect, useState} from "react";
import "./Table.css";
import {sortData} from "./util.js";
import LineGraph from "./LineGraph";
import Map1 from './Map1.js'
import 'leaflet/dist/leaflet.css'
import coronavirus from './img/coronavirus.png'




function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry]= useState("Worldwide");
  const [countryInfo, setCountryInfo ] = useState({});
  const [tableData, settableData ] = useState([]);
  const [MapCentre, setMapCentre] = useState({lat:0 ,lng:78.9629});
  const [MapZoom, setMapZoom] = useState(1);
  const [MapCountries, setMapCountries] = useState([]);
   


  useEffect(() => {
    const url =
    country==="Worldwide"
     ? `https://disease.sh/v3/covid-19/all`
     : `https://disease.sh/v3/covid-19/countries/${country}`;

     fetch(url)
      .then((response) => response.json())
      .then((data) => {
      setCountryInfo(data);
      
        } 
)} );


    

  useEffect(() => {
      const getCountriesData = async() => {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            { name : country.country,
              value : country.countryInfo.iso2}
              ));

              const SortedData = sortData(data);
              setMapCountries(data);
              settableData(SortedData);            
              setCountries(countries);
        });
      };
      
      getCountriesData();
    }, [] );



    const onCountryChange = async (event) => {
      const countrycode = event.target.value;
      setCountry (countrycode);  
      setMapZoom(4);     
    }
    

         
    


  return (
  
  <div className="container">

    
  <img src={coronavirus} className="image" width="500" height="500"/>

  <img src={coronavirus} className="image2" width="500" height="500"/>
 
  
  <div className="body"> 
  <h1 className="heading">Covid Tracker</h1>
  

     <div className="app">

      <div className= "app__left">
        <div className="app__header">
        <h1 className="header"> Change Country: </h1>
        <FormControl classname= "app__dropdown">
            <Select 
                variant="outlined"
                onChange = {onCountryChange}
                value = {country}>
              
                <MenuItem value= "Worldwide">Worldwide</MenuItem>
                {countries.map(country => (<MenuItem value = {country.value} >{country.name}</MenuItem>))}

            </Select>
        </FormControl>
        </div>  


        <div className= "app__stats">
        
          <InfoBox title="Cases" total={countryInfo.cases}/>
          <InfoBox title="Recovered"  total={countryInfo.recovered}/>
          <InfoBox title="Deaths"  total={countryInfo.deaths}/>

       </div>

        <div className="map1">
          <Map1 
            countries = {MapCountries}
            centre ={MapCentre}
            zoom = {MapZoom} />
                          
        </div>
    </div>


    <div className="app__right">

      <Card variant='outlined' style={{backgroundColor: 'transparent'}} className="rightcard">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} /> 
          <div  className='linegraph'>
          <h3 className='worldwide'>Worldwide new cases</h3>
          <LineGraph />
          </div>

        </CardContent>
      </Card>
    
    </div>



      
    </div>
  </div>
  </div>
  );
}

export default App;
