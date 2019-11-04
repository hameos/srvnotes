import { Db } from 'mongodb'

function ApplySchema(db: Db): void {
  db.command({
    collMod: 'Notes',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['title', 'content'],
        properties: {
          title: {
            bsonType: 'string',
            description: 'title must be a string and is required',
          },
          content: {
            bsonType: 'string',
            description: 'content must be a string and is required',
          },
        },
      },
    },
    validationLevel: 'strict', // 'strict', 'off', 'moderate'
    validationAction: 'error', // 'warn'
  })
}

/* eslint-disable @typescript-eslint/no-unused-vars */
function DisableSchema(db: Db): void {
  db.command({
    collMod: 'Notes',
    validator: {},
    validationLevel: 'off',
    validationAction: 'error',
  })
}

export default ApplySchema
