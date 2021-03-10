import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

export const UserSchema = new mongoose.Schema({
    user:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

export interface User extends Document{
    user:String,
    email:String,
    password:String
}