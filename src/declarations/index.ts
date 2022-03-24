import { ObjectId } from 'mongodb'

export interface NotesConfig {
  IP: string
  PORT: string
  S3: string
  DB: string
  TABLE: string
}

export interface InputNote {
  id?: string
  title?: string
  content?: string
}

export interface Note {
  _id: ObjectId
  title: string
  content: string
}
