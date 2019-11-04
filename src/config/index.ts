import { readFileSync } from 'fs'
import { NotesConfig } from '../declarations'

let conf: NotesConfig

try {
  const confRAW = readFileSync('./notes.config.json')
  conf = JSON.parse(confRAW.toString())
} catch (e) {
  console.log('Error during loading notes.config.json')
  throw e
}

export const IP = conf.IP
export const PORT = conf.PORT
export const WWW = conf.WWW
export const DB = conf.DB
export const COLLECTION = conf.TABLE
