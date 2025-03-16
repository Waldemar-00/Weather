import chalk from 'chalk'
import { homedir } from 'os'
import { writeFile, constants, access, writeFileSync } from 'fs'
import { join, normalize } from 'path'
import { exec } from 'node:child_process'
import { unlink } from 'node:fs'

const log = console.log

const homeDir = homedir()
const path = normalize( join( homeDir, 'AppData/Roaming/npm/node_modules/weather-handle/weather.bat' ) )
const commandString = `@echo off
node ${ normalize( join( homeDir, 'AppData/Roaming/npm/node_modules/weather-handle/weather.js' )) } -w
cmd /k`

export function createBatFileAndShortcut ()
{
    access( path, constants.F_OK, err =>
    {
        if ( err )
        {
            writeFile( path, commandString, err =>
            {
                if ( err ) log( chalk.red( 'Something went wrong! Weather.bat file has not created... Try again!' ) )
            } )
            createShortcut ()
        }
    })
}

function createShortcut ()
{
    const shortcutPath = normalize( join( homeDir, 'Desktop/weather.lnk' ) )
    const batPath = normalize( join( homeDir, 'AppData/Roaming/npm/node_modules/weather-handle/weather.bat' ) )
    const wshFilePath = normalize( join( homeDir, 'AppData/Roaming/npm/node_modules/weather-handle/shortcut.vbs' ) )
    const workingDir = normalize( join( homeDir, 'AppData/Roaming/npm/node_modules/weather-handle' ) )
    const iconPath = normalize( join( homeDir, 'AppData/Roaming/npm/node_modules/weather-handle/icon.ico' ) )
    const wshScript = `
        Dim WshShell
        Set WshShell = CreateObject("WScript.Shell")
        Dim shortcut
        Set shortcut = WshShell.CreateShortcut("${ shortcutPath }")
        shortcut.IconLocation = "${ iconPath }"
        shortcut.TargetPath = "${ batPath }"
        shortcut.WorkingDirectory = "${ workingDir }"
        shortcut.Save
        `
    writeFileSync( wshFilePath, wshScript )
    exec( `cscript ${ wshFilePath }`, ( err, _stdout, _stderr ) =>
    {
        if ( err ) log( `ERROR: ${ err }` )
        else log( "Shortcut has created" )
        unlink( wshFilePath, err =>
        {
            if ( err ) log( chalk.red( 'Something went wrong! Shortcut has not created... Try again!' ) )
            else return
        } )
    })
}
