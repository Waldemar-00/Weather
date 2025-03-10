import { getExistFile, path } from './storage.service.js'
import { getAnswer } from '../helper/args.js'
import axios from 'axios'
import chalk from 'chalk'
const log = console.log
const file = JSON.parse( await getExistFile( path ) )
const url = 'https://api.openweathermap.org/data/2.5/weather'
const params = {
    params: {
        q: file.city,
        appid: file.token,
        units: 'metric'
    }
}
async function getWeather ( url, params )
{
    try {
        const { data } = await axios.get( url, params )
        return data
    } catch ( error )
    {
        if ( error.response ) log( error.response.status, error.response.data.message )
        else log( error )
    }
}
function printWeather ( { coord, weather, main, wind, sys, name, visibility   } )
{
    log( `${ chalk.green( sys.country ) }` )
    log( `${ chalk.green( name ) }` )
    log( `${ chalk.green( 'Sea_level:' )} ${ chalk.yellow( main.sea_level ) }` )
    log( `${ chalk.green( 'Longitude' ) }: ${ chalk.yellow( coord.lon ) } ${ chalk.green( 'Latitude:' ) } ${ chalk.yellow( coord.lat ) }` )
    log( `${ chalk.blueBright( weather[ 0 ].main ) }: ${ chalk.blueBright( weather[ 0 ].description ) }` )
    log( `${ chalk.blueBright( 'Temperature:' ) } ${ chalk.yellow( main.temp ) }` )
    log( `${ chalk.blueBright( 'Feels_like:' ) } ${ chalk.yellow( main.feels_like ) }` )
    log( `${ chalk.blueBright( 'Humidity:' ) } ${ chalk.yellow( main.humidity ) }` )
    log( `${ chalk.blueBright( 'Visibility:' ) } ${ chalk.yellow( visibility ) }` )
    log( `${ chalk.blueBright( 'Wind:' ) } ${ chalk.yellow( wind.speed ) }` )
}
if ( file ) printWeather( await getWeather ( url, params ) )
else log( getAnswer() )

// {
//   coord: { lon: 27.5415, lat: 52.7876 },
//   weather: [
//     {
//       id: 804,
//       main: 'Clouds',
//       description: 'overcast clouds',
//       icon: '04n'
//     }
//   ],
//   base: 'stations',
//   main: {
//     temp: 9.63,
//     feels_like: 7.61,
//     temp_min: 9.63,
//     temp_max: 9.63,
//     pressure: 1005,
//     humidity: 60,
//     sea_level: 1005,
//     grnd_level: 987
//   },
//   visibility: 10000,
//   wind: { speed: 3.86, deg: 160, gust: 9.74 },
//   clouds: { all: 99 },
//   dt: 1741626807,
//   sys: { country: 'BY', sunrise: 1741581371, sunset: 1741622656 },
//   timezone: 10800,
//   id: 622428,
//   name: 'Salihorsk',
//   cod: 200
// }