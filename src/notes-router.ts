import { Express } from 'express'
import dbclient from './db/db'

export default function NotesRouter(app: Express): void {
  // endpoint /notes

  app
    .route('/notes')
    .get(function (req, res) {
      console.log('get /notes')

      dbclient
        .list()
        .then((data) => {
          res.send({ data })
        })
        .catch((e) => {
          res.status(500).send({ message: e.message })
        })
    })
    .post(function (req, res) {
      console.log('post /notes')
      const data = req.body

      dbclient
        .insert({ title: data.title, content: data.content })
        .then((val) => {
          const resdata = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            id: (val.insertedId as any).toString(),
            title: data.title,
            content: data.content,
          }
          res.send({ data: resdata })
        })
        .catch((e) => {
          res.status(500).send({ message: e.message })
        })
    })

  // endpoint /notes/:noteId

  app
    .route('/notes/:noteId')
    .get(function (req, res) {
      console.log('get /notes/:noteId', req.body)

      const id = req.params.noteId
      dbclient
        .list({ id })
        .then((data) => {
          res.send({ data })
        })
        .catch(({ message }) => {
          res.status(500).send({ message })
        })
    })
    .put(function (req, res) {
      console.log('put /notes/:noteId', req.body)

      const id = req.params.noteId
      const { title, content } = req.body
      const data = { id, title: '', content: '' }
      if (title) data.title = title
      if (content) data.content = content

      dbclient
        .update(data)
        .then((data) => {
          res.send({ data })
        })
        .catch(({ message }) => {
          res.status(500).send({ message })
        })
    })
    .patch(function (req, res) {
      console.log('patch /notes/:noteId', req.body)

      const id = req.params.noteId
      const { title, content } = req.body
      const data = { id, title: '', content: '' }
      if (title) data.title = title
      if (content) data.content = content

      dbclient
        .updatePartial(data)
        .then((data) => {
          res.send({ data })
        })
        .catch(({ message }) => {
          res.status(500).send({ message })
        })
    })
    .delete(function (req, res) {
      console.log('delete /notes/:noteId', req.body)

      const id = req.params.noteId

      dbclient
        .delete({ id })
        .then((data) => {
          res.send({ data })
        })
        .catch(({ message }) => {
          res.status(500).send({ message })
        })
    })
}
