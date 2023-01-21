/**
 * List prompt example
 */

import chalk from "chalk";
import inquirer from "inquirer";
import axios from 'axios';

export const inquirerMenu=async()=>{
    /**
 * List prompt example
 */

console.clear();
console.log(chalk.yellow('==================='));
console.log(chalk.bgMagenta('SELECCIONE UNA OPCION(clima)'));
console.log(chalk.yellow('===================='));

 const {opciones}=await inquirer
  .prompt([
    {
      type: 'list',
      name: 'opciones',
      message: 'Que opcion escojera',
      choices: [
        {
            value:1,
            name:'1. Buscar ciudad'
        },
        {
            value: 2,
            name:'2. Historial'
        },
        {
            value:0,
            name:'0. salir'
        },
        
        
        
      ]
    }
    
  ]);
  return opciones;
  
}

export const MostrarLugares=async(lugares=[])=>{
    const choices=lugares.map((lugar,i)=>{
        const idx=i+1;
        return {
            value:lugar.id,
            name: `${chalk.green(idx)} ${lugar.nombre}`
        }
    });
    choices.unshift({
        value:'0',
        name:`${chalk.green('0')} ancelar`,

    })
    const preguntas=[{
        type:'list',
        name:'id',
        message:'Elejir',
        choices:choices
    }]
    const {id}=await inquirer.prompt(preguntas);
    return id;


}
export const pausa=async()=>{
    await inquirer.prompt([
        {
            type:'input',
            name:'pause',
            message:'Presione enter para continuar'
        }
    ])
}
export const leerInput=async(mensaje='')=>{
    const question=[
        {
            type:'input',
            name:'desc',
            message:mensaje,
             validate(value){
                if(value.length===0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]
    const {desc}=await inquirer.prompt(question);
    return desc;
}

export const  confirmar=async(message)=>{
    const question=[
        {
            type:'confirm',
            name:'ok',
            message:message
        }
    ];

    const {ok}=await inquirer.prompt(question);
    return ok;

}
export const mostrarTareasCheck=async(tareas=[])=>{
    const choices=tareas.map((tarea,i)=>{
        const idx=i+1;
        return {
            value:tarea.id,
            name: `${chalk.green(idx)} ${tarea.desc}`,
            checked:(tarea.completadoEn)? true:false,
        }
    });
    
    const preguntas=[{
        type:'checkbox',
        name:'ids',
        message:'Seleccione',
        choices:choices
    }];
    const {ids}=await inquirer.prompt(preguntas);
    return ids;


}
export const peticion=async()=>{
    let datos;
//const axios = require('axios'); // legacy way

// Make a request for a user with a given ID
axios.get('https://dog.ceo/api/breeds/list/all')
  .then((response) =>{
    // handle success
    //console.log(response);
    datos=response;
  })
  .catch( (error)=> {
    // handle error
    console.log(error);
  })
  .finally( () =>{
    // always executed
  });
  return datos;
}

export const mostrarHistorial=async(lugares=[])=>{
    const choices2=lugares.map((lugar,i)=>{
        const idx=i+1;
        return {
            value:lugar,
            name: `${chalk.green(idx)} ${lugar}`
        }
    });
    choices2.unshift({
        value:'0',
        name:`${chalk.green('0')} ancelar`,

    })
    const preguntas=[{
        type:'list',
        name:'lugar',
        message:'Elejir',
        choices:choices2
    }];
    const {lugar}=await inquirer.prompt(preguntas);
    //console.log(dato);
    return lugar;

}