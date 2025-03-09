import https from 'https'
import { getExistFile, path } from './storage.service.js'
import { getAnswer } from '../helper/args.js'
const log = console.log
let city = null
let token = null
let file = await getExistFile( path )
if ( file )
{
    file = JSON.parse( file )
    city = file.city
    token = file.token
    const url = new URL( 'https://api.openweathermap.org/data/2.5/weather' )
    url.searchParams.append( 'q', city )
    url.searchParams.append( 'appid', token )
    const requestOptions = {
        hostname: url.hostname,
        port: url.port || 443, // 433 default,
        path: url.pathname + url.search,
        method: 'GET'
    }

    const request = https.request( requestOptions, ( res ) =>
    {
        let data = ''
        res.on( 'data', chunk => data += chunk )
        res.on( 'end', () => log( data ))
    } )
    request.on('error', ( err ) => { log( err ) })
    request.end()

} else log( getAnswer() )

//* https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={ api_token }
//* http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//* async function weatherRequest ()
//* {
//*     const url = new URL('https://api.openweathermap.org/data/2.5/weather')
//*     url.searchParams.append( 'q', 'Soligorsk' )
//*     url.searchParams.append( 'appid', '888521c03fd7875a98c5ad6292c84b70' )
//*     https.get( url.href, response =>
//*     {
//*         let data = ''
//*         response.on( 'data', chunk => data += chunk )
//*         response.on( 'end', () => log( data ) )
//*     } ).on( 'error', err => log( err ) )
//* }
//* weatherRequest ()