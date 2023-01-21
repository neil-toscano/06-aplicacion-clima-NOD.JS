import inquirer from "inquirer";
import chalk from "chalk";

import { inquirerMenu, leerInput, mostrarHistorial, MostrarLugares, pausa, peticion } from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";
const main=async()=>{
    

    //const texto=await leerInput("hola");
    //console.log(textod);
    let respux=0;
    const ClaseBusx=new Busquedas();
    do {
         respux= await inquirerMenu();
         //console.log(respux);
         //let lugares;
        switch (respux) {
            case 1:
                //mostrar mensaje para escirbir
                
                const lugarx=await leerInput("Que lugar desea buscar");
                
                 const repux=await ClaseBusx.ciudad(lugarx);//busca la ciudad y
                 //retorna un arrego de obj [{id,nombre,lng,lat}]
                const idLugar=await MostrarLugares(repux);//muestra
                if(idLugar=='0'){
                    continue;
                }
                //guardar en DB

                //los lugares para poder elegir y retorna su id
                const lugarSelec=repux.find((objetoLugar)=>{//buscamos por
                    // su id el lugar
                    return idLugar==objetoLugar.id;
                });

                //guardar en DB
                ClaseBusx.agregarHistorial(lugarSelec.nombre);

                //console.log(idLugar);//imprimimos id
                //console.log(lugarSelec);//imprimimos el objeto de lugar

                //console.log(repux);
                // usamos WEATHER
               const datoClima= await ClaseBusx.climaLugar(lugarSelec.lat,lugarSelec.lng);
               //console.log(datoClima);
                //buscar lugar
                //selecionar luga
                //clima
                //mostrar resultados
                console.clear();
                console.log(chalk.red('\nInformacion de la ciudad /n'));
                console.log(chalk.yellow('********************************************'));
                console.log(`${chalk.bgMagenta('ciudad:')} ${lugarSelec.nombre}`);
                console.log(`${chalk.bgMagenta('Lat:')} ${lugarSelec.lat}`);
                console.log(`${chalk.bgMagenta('Lng:')} ${lugarSelec.lng}`);
                console.log(`${chalk.bgMagenta('clima:')} ${datoClima.clima}`);
                console.log(`${chalk.bgMagenta('Temperatura:')} ${datoClima.temperatura}`);
                console.log(`${chalk.bgMagenta('Minim:')} ${datoClima.tmin}`);
                console.log(`${chalk.bgMagenta('Max:')} ${datoClima.tmax}`);
                console.log(chalk.yellow('****************************************************'));
                
                break;
            case 2:
                //console.log(respux);
                const datoLugar=await mostrarHistorial(ClaseBusx.historial);
                if(datoLugar=='0'){
                    continue;
                }
                //console.log(datoLugar);
                break;
            case 0:
                console.log(respux);
        
            default:
                break;
        }
        
        await pausa();
        //console.log(lugares);
        
    } while (respux!=0);
  
}
main();