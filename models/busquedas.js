import axios from "axios";
import *as dotenv from "dotenv";
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs';
export class Busquedas{
    historial=[];
    dbPath='./db/database.json';
    constructor(){
      dotenv.config();
      this.leerDB();
        //leer BD si existe

    }
    get paramsMapbox(){
      //console.log(process.env.MAPBOX_TOKEN);
      return {
        
          'language':'es',
          'access_token':process.env.MAPBOX_KEY
        

      }
    }
    
    async ciudad(lugar=''){
      const instance=axios.create({
        baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params:this.paramsMapbox
      });
try {
  const repux=await instance.get();
  return repux.data.features.map(lugar=>{
        return {
       id:lugar.id,
       nombre:lugar.place_name_es,
       lng:lugar.center[0],
       lat:lugar.center[1]
       

     }

  });
  
} catch (error) {
  console.log(error);
  return [];
  
}
//     let datos;
//       //peticion http
//       instance.get()
//.then(function (response) {
//  // handle success
//  datos= response.data.features.map(lugar=>{
//
//    return {
//      id:lugar.id,
//      nombre:lugar.place_name_es,
//      lng:lugar.center[0],
//      lat:lugar.center[1]
//      
//
//    }
//  });
//  
//  console.log(datax);
//});
//console.log('despues de datax');
 //.catch(function (error) {
 //  // handle error
 // console.log('no se encontro el lugar');
 //  return [];
 //})
 //.finally(function () {
 //  // always executed
 //});
        
    }
    async climaLugar(lat,lon){
      
       const parametros= {
          'lang':'es',
          'units':'metric',
          'lat':lat,
          'lon':lon,
          'appid':process.env.WEATHER_KEY
        }
      
      const instance=axios.create({
        baseURL:`https://api.openweathermap.org/data/2.5/weather`,
        params:parametros
      });
      try {
        const repux=await instance.get();
        //console.log(repux.data.);
        return {
          clima:repux.data.weather[0].description,
         temperatura:repux.data.main.temp,
         tmin:repux.data.main.temp_min,
         tmax:repux.data.main.temp_max
               };

  }
        
       catch (error) {
        console.log(error);
        return {};
        
      }

    }

    agregarHistorial(lugar=''){
      if(this.historial.includes(lugar.toLocaleLowerCase())){
        return;

      }
      this.historial.unshift(lugar.toLocaleLowerCase());
      this.guardarDB();

      //dconsole.log(this.historial);
      //GRAbar en DBd
    }

    guardarDB(){
      

//const data = new Uint8Array(Buffer.from('Hello Node.js'));
writeFile(this.dbPath, JSON.stringify(this.historial), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

    }
    leerDB(){
    

readFile(this.dbPath,'utf8', (err, data) => {
  if (err) throw err;
  
  this.historial=JSON.parse(data);
});

    }

    
}