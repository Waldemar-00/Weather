import { homedir } from 'os'
import { join, normalize } from 'path'
import { writeFile, readFile } from 'fs'
import chalk from 'chalk'

const log = console.log
export const path = normalize( join( homedir(), 'weather_data.json' ) )

function addCity ( answer )
{
    writeFile( path, JSON.stringify( answer ),{ encoding: 'utf8', flag: 'w' }, err =>
    {
        if ( err ) log( err )
        else
        {
            log( `City ${ chalk.green( answer.city ) } was ${ chalk.green( 'saved' )}` )
            log( chalk.yellow( 'write your token for Open Weather' ) )
        }
    } )
}
export async function getExistFile ( path )
{
    return new Promise( ( resolve, _reject ) =>
    {
        readFile( path, 'utf-8', ( err, data ) =>
        {
            if ( err ) resolve( null )
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
            if ( !fileCity ) return addCity ( answer )
            const strCity = `City ${ chalk.green( answer.city ) } was ${ chalk.green( 'saved' )}`
            rewriteFile( fileCity, answer, 'city', strCity, addCity )
            break
        case 'token':
            let fileToken = await getExistFile( path )
            const strToken = `Token ${ chalk.green( answer.token ) } was ${ chalk.green( 'saved' )}`
            rewriteFile( fileToken, answer, 'token', strToken, () => log( chalk.red( 'Write city before token!' )) )
            break
        default:
            addCity ( answer )
            break
    }
}
