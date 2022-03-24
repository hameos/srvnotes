import bodyParser from 'body-parser'
import cors from 'cors'
import Express from 'express'
import NotesRouter from './notes-router'

const App = Express()
App.use(bodyParser.json())
App.use(cors())

NotesRouter(App)

export default App
