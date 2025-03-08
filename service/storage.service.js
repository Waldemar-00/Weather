import { homedir } from 'os'
import { join } from 'path'
import { writeFile, readFile } from 'fs'
import chalk from 'chalk'

const log = console.log
const path = join( homedir(), 'weather_data.json' )

function addCity ( answer )
{
    writeFile( path, JSON.stringify( answer ), err =>
    {
        if ( err ) log( err )
        else
        {
            log( `City ${ chalk.green( answer.city ) } was ${ chalk.green( 'saved' )}` )
            log( chalk.yellow( 'write your token for Open Weather' ) )
        }
    } )
}
async function getExistFile ( path )
{
    return new Promise( ( resolve, reject ) =>
    {
        readFile( path, 'utf-8', ( err, data ) =>
        {
            if ( err ) reject( err )
            else resolve( data )
        } )
    })
}
function rewriteFile ( file, answer, property, logString, func )
{
    if ( file )
            {
                file = JSON.parse( file )
                file = { ...file, [ property ]: answer[ property ] }
                writeFile( path, JSON.stringify( file ), err =>
                {
                    if ( err ) log( err )
                    else log( logString )
                })
    }
    else if ( property === 'city' ) func( answer )
    else func()
}
export async function saveData( answer )
{
    switch ( Object.keys( answer )[0] ) {
        case 'city':
            let fileCity = await getExistFile( path )
            const strCity = `City ${ chalk.green( answer.city ) } was ${ chalk.green( 'saved' )}`
            rewriteFile( fileCity, answer, 'city', strCity, addCity )
            break
        case 'token':
            let fileToken = await getExistFile( path )
            const strToken = `Token ${ answer.token } was saved`
            rewriteFile( fileToken, answer, 'token', strToken, () => log( chalk.red( 'Write city before token!' )) )
            break
        default:
            log('Somethig went wrong!')
            break
    }
}
