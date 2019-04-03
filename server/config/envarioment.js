console.log(process.env.NODE_ENV);

const envarioments = 
{
       "production":"production",
       "development":"development"
}

const ENV = process.env.NODE_ENV || envarioments.development;

const config = //configuracion inicial
{
       [envarioments.development]: 
       {
              PORT:8080 //indicando el puerto del ambiente desarrollador
       },
       [envarioments.production]:
       {
              PORT:80 //indicando el puerto del ambiente de produccion
       }
}

const CONFIG = config[ENV]; //configuracion final

if(!CONFIG) throw Error (`invalido el NODE_ENV ${ENV}`);

process.env = //heredando o igualando los entornos y configuracion
{ //se igualan los entornos y de ultimo se pone el nustro para que sobre escriba el por defecto
       ...process.env,
       ...CONFIG
}

console.log(CONFIG);