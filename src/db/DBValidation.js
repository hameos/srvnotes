
function ApplySchema(db) {
  db.command( { collMod: 'Notes',
     validator: { $jsonSchema: {
        bsonType: 'object',
        required: [ 'title', 'content'],
        properties: {
           title: {
              bsonType: 'string',
              description: 'title must be a string and is required'
           },
           content: {
            bsonType: 'string',
            description: 'content must be a string and is required'
           }
        }
     } },
     validationLevel: 'strict',  // 'strict', 'off', 'moderate'
     validationAction: 'error'     // 'warn'
  })
}

function DisableSchema(db) {
  db.command( { collMod: 'Notes',
     validator: {},
     validationLevel: 'off',
     validationAction: 'error'
  })
}

module.exports = ApplySchema

