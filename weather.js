#!/usr/bin/env node
import { getAnswer } from './helper/args.js'
import { saveData } from './service/storage.service.js'
import { getOpenWeather } from './service/api.service.js'
import { createBatFileAndShortcut } from './service/shortcut.service.js'

function initCLI ()
{
    createBatFileAndShortcut ()
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
