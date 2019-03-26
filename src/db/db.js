import {MongoClient, ObjectId} from 'mongodb'
import {isNullOrUndefined} from 'util'
import ApplySchema from './DBValidation'

const COLLECTION = 'Notes'

const dbclient = (function () {
  let database = undefined
  const DBURL = 'mongodb://127.0.0.1:27017/notesdb'

  // Connect to database
  MongoClient.connect(DBURL, function (err, connection) {
    if (err) {
      throw err
    }
    else {
      database = connection
      database.db().collections(function(err, collections) {
        const exist = collections.some(elem => elem.collectionName == COLLECTION)
        if (!exist) {
          database.db().createCollection(COLLECTION, function(err, res) {
            if (err)
              throw err

            ApplySchema(database.db())

            console.log('Collection notes created!')
            console.log('MongoDB connection successful')
          })
        }
        else {
          console.log('MongoDB connection successful')
        }
      })
    }
  })

  function insert (entry = {}) {
    let collection = database.db().collection(COLLECTION)
    return collection.insertOne(entry)
  }

  function remove(input = {}) {
    console.log('document removed')

    return Promise.resolve(input).then(input => {
      if (isNullOrUndefined(input.id))
        throw new Error('id field is not defined')

      let collection = database.db().collection(COLLECTION)
      return collection.remove({_id: new ObjectId(input.id)})
    }).then(output => !!output.result.n)
  }

  function list(input = {}) {
    console.log('document list')

    return Promise.resolve(input).then(input => {
      let {id} = input
      let query = {}
      if (!isNullOrUndefined(id)) {
        query._id = new ObjectId(id)
      }

      let collection = database.db().collection(COLLECTION)
      return collection.find(query).toArray()})

    .then(arr => {
      if (arr.length <= 0) {
        throw new Error(`Note id=${input.id} not found`)
      }

      let notes = arr.map(({_id, ...rest}) => ({
        id: _id.toString(), ...rest
      }))

      return input.id ? notes[0] : notes
    })
  }

  function update(input = {}) {
    console.log('document update', input)

    return Promise.resolve({input}).then(({input}) => {
      let {id, ...rest} = input
      let query = {id: new ObjectId(id), ...rest}

      
      if (isNullOrUndefined(query.title)) {
        throw new Error('title field required')
      }

      if (isNullOrUndefined(query.content)) {
        throw new Error('content field required')
      }
      

      let collection = database.db().collection(COLLECTION)
      return collection.updateOne({_id: query.id}, {$set: rest})
    })
    .then(() => {
      return input
    })
  }

  function updatePartial(input = {}) {
    console.log('document updatePartial', input)

    return Promise.resolve({input}).then(({input}) => {
      let {id, ...rest} = input
      let _id = new ObjectId(id)

      if (isNullOrUndefined(rest.title) && isNullOrUndefined(rest.content))
        throw new Error('Required at least one field')

      let collection = database.db().collection(COLLECTION)
      return collection.findOneAndUpdate({_id}, {$set: rest})
    })
    .then(({value}) => ({
      id: value._id.toString(), 
      title: value.title, 
      content: value.content
    }))
  }

  function closeDB () {
    console.log('close db')
    database.close()
  }

  return {
    insert,
    delete:remove,
    list,
    update,
    updatePartial,
    closeDB
  }
})()

export default dbclient
