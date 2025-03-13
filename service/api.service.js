import { getExistFile, path } from './storage.service.js'
import { getAnswer } from '../helper/args.js'
import axios from 'axios'
import chalk from 'chalk'
export async function getOpenWeather ()
{

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
        log( `${ chalk.green( 'Longitude:' ) } ${ chalk.yellow( coord.lon ) } ${ chalk.green( 'Latitude:' ) } ${ chalk.yellow( coord.lat ) }` )
        log( `${ chalk.blueBright( weather[ 0 ].main ) }: ${ chalk.blueBright( weather[ 0 ].description ) }` )
        log( `${ chalk.blueBright( 'Temperature:' ) } ${ chalk.yellow( main.temp ) }` )
        log( `${ chalk.blueBright( 'Feels_like:' ) } ${ chalk.yellow( main.feels_like ) }` )
        log( `${ chalk.blueBright( 'Humidity:' ) } ${ chalk.yellow( main.humidity ) }` )
        log( `${ chalk.blueBright( 'Visibility:' ) } ${ chalk.yellow( visibility ) }` )
        log( `${ chalk.blueBright( 'Wind:' ) } ${ chalk.yellow( wind.speed ) }` )
    }
    if ( file ) printWeather( await getWeather ( url, params ) )
    else log( getAnswer() )
}
