import { homedir } from 'os'
//! tmpdir, platform, arch, cpus, freemem, totalmem, networkInterfaces, userInfo, uptime, type, release, endianness, loadavg, constants
import { join } from 'path'
//! , basename, dirname, extname, relative, isAbsolute, resolve, sep
const log = console.log
const path = join( homedir(), 'weather_data.json' )
export function saveData ( answer )
{
    switch ( Object.keys( answer )[0] ) {
        case 'city':

            return Object.keys( answer )[0]
        case 'token':

            return 'token'
        default:
            return answer
    }
}
//! from 'os'
//* log( homedir() )
//* log( tmpdir() )
//* log( platform() )
//* log( arch() )
//* log( cpus() )
//* log( freemem(), 'bytes' )
//* log( totalmem() )
//* log( networkInterfaces() )
//* log( userInfo() )
//* log( uptime() )
//* log( type() )
//* log( release() )
//* log( endianness() )
// // log( loadavg() ) // only UNIX
//* log( constants )
//! from 'path'
//* log( path )
//* log( dirname( path ) )
//* log( basename( path ) )
//* log( extname( path ) )
//* log( relative( path, dirname( path ) ) )
//* log( isAbsolute( path ) )
//* log( resolve( '..' ) )
//* log( sep )