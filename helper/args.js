import chalk from 'chalk'
export function getAnswer ()
{
    const [ _executer, _file, ...rest ] = process.argv
    const help = `${ chalk.yellow( "use next commands:" ) }
        ${ chalk.green( "'-h' - get help" ) }
        ${ chalk.green( "'-c' [city] - set a city" ) }
        ${ chalk.green("'-t' [api_token] - save a token" ) }`
    if ( rest[ 0 ] && rest[ 1 ] )
    {
        switch ( rest[ 0 ] ) {
            case '-h':
                return help
            case '-c':
                return { 'city': rest[ 1 ] }
            case '-t':
                return { 'token': rest[ 1 ] }
            default:
                return help
        }
    }
    return help
}