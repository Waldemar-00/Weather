#!/usr/bin/env node
import { getAnswer } from './helper/args.js'
import chalk from 'chalk'
import { saveData } from './service/storage.service.js'
const log = console.log
function initCLI ()
{
    const answer = getAnswer()
    if ( typeof answer === 'string' ) log( answer )
    else
    {
        log( answer )
        log( saveData( answer ))
    }
}
initCLI()