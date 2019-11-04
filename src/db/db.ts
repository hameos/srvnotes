import { MongoClient, ObjectId } from 'mongodb'
import { isNullOrUndefined } from 'util'
import { COLLECTION, DB as DBURL } from '../config'
import { InputNote, Note } from '../declarations'
import ApplySchema from './DBValidation'

const dbclient = (function() {
  let database: MongoClient

  // Connect to database
  MongoClient.connect(DBURL, function(err, connection) {
    if (err) {
      throw err
    } else {
      database = connection

      database.db().collections(function(err, collections) {
        const exist = collections.some(
          elem => elem.collectionName == COLLECTION
        )
        if (!exist) {
          database.db().createCollection(COLLECTION, function(err) {
            if (err) throw err

            ApplySchema(database.db())

            console.log('Collection notes created!')
            console.log('MongoDB connection successful')
          })
        } else {
          console.log('MongoDB connection successful')
        }
      })
    }
  })

  function insert(entry: InputNote = {}) {
    const collection = database.db().collection(COLLECTION)
    return collection.insertOne(entry)
  }

  function remove(input: InputNote) {
    console.log('document removed')

    return Promise.resolve(input)
      .then(input => {
        if (isNullOrUndefined(input.id))
          throw new Error('id field is not defined')

        const collection = database.db().collection(COLLECTION)
        return collection.remove({ _id: new ObjectId(input.id) })
      })
      .then(output => !!output.result.n)
  }

  function list(input: InputNote = {}) {
    console.log('document list')

    return Promise.resolve(input)
      .then(input => {
        const { id } = input
        const query: { _id?: ObjectId } = {}
        if (!isNullOrUndefined(id)) {
          query._id = new ObjectId(id)
        }

        const collection = database.db().collection(COLLECTION)
        return collection.find(query).toArray()
      })

      .then(arr => {
        if (arr.length <= 0) {
          throw new Error(`Note id=${input.id} not found`)
        }

        const notes = arr.map(({ _id, ...rest }) => ({
          id: _id.toString(),
          ...rest,
        }))

        return input.id ? notes[0] : notes
      })
  }

  function update(input: InputNote) {
    console.log('document update', input)

    return Promise.resolve({ input })
      .then(({ input }) => {
        const { id, title, content } = input
        if (isNullOrUndefined(id)) throw new Error('id field is not defined')

        if (isNullOrUndefined(title)) {
          throw new Error('title field required')
        }

        if (isNullOrUndefined(content)) {
          throw new Error('content field required')
        }

        const query: Note = {
          _id: new ObjectId(id),
          title: title,
          content: content,
        }

        const collection = database.db().collection(COLLECTION)
        return collection.updateOne(
          { _id: query._id },
          { $set: { title: query.title, content: query.content } }
        )
      })
      .then(() => {
        return input
      })
  }

  function updatePartial(input: InputNote = {}) {
    console.log('document updatePartial', input)

    return Promise.resolve({ input })
      .then(({ input }) => {
        const { id, title, content } = input
        const _id = new ObjectId(id)

        if (isNullOrUndefined(title) && isNullOrUndefined(content))
          throw new Error('Required at least one field')

        const collection = database.db().collection(COLLECTION)
        return collection.findOneAndUpdate(
          { _id },
          { $set: { title, content } }
        )
      })
      .then(({ value }) => ({
        id: value._id.toString(),
        title: value.title,
        content: value.content,
      }))
  }

  function closeDB(): void {
    console.log('close db')
    database.close()
  }

  return {
    insert,
    delete: remove,
    list,
    update,
    updatePartial,
    closeDB,
  }
})()

export default dbclient
