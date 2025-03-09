#!/usr/bin/env node
import { getAnswer } from './helper/args.js'
import { saveData } from './service/storage.service.js'
function initCLI ()
{
    const answer = getAnswer()
    if ( typeof answer === 'string' ) console.log( answer )
    else
    {
        saveData( answer )
    }
}
initCLI()