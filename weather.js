#!/usr/bin/env node
import chalk from 'chalk'
import { homedir } from 'os'
import { writeFile, constants, access } from 'fs'
import { join, normalize } from 'path'
import { getAnswer } from './helper/args.js'
import { saveData } from './service/storage.service.js'
import { getOpenWeather } from './service/api.service.js'

const log = console.log
const homeDir = homedir()
const path = normalize( join( homeDir, 'AppData/Roaming/npm/node_modules/weather-handle/weather.bat' ) )
const commandString = `@echo off
node ${ normalize( join( homeDir, 'AppData/Roaming/npm/node_modules/weather-handle/weather.js' )) } -w
cmd /k`
function initCLI ()
{
    createBatFile ( path )
    const answer = getAnswer()
    if ( typeof answer === 'string' && answer !== 'w' ) console.log( answer )
    if ( answer.city || answer.token )
    {
        saveData( answer )
    }
    if ( answer === 'w' )
    {
        getOpenWeather()
    }
}
initCLI()

function createBatFile ( path )
{
    access( path, constants.F_OK, err =>
    {
        if ( err )
        {
            writeFile( path, commandString, err =>
            {
                if ( err ) log( chalk.red( 'A .bat file has not been created!\nYou can create it yourself.' ) )
                else log( chalk.yellow( 'A .bat file has been created!\nYou can create label for it yourself.' ) )
            } )
        }
    })
}