import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
const Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
    name: {
         type: String, required: true, unqiue: true 
        },
    email: { 
        type: String, required: true, unique:true 
    },
    hash: {
         type: String, required: true 
        },
    coins:{ 
        type: Schema.Types.ObjectId,
        ref: 'Coins',
    }, 
    wallet:{
        type: Schema.Types.ObjectId,
        ref: 'Wallet',
    },
    assets:{
        type: Schema.Types.ObjectId,
        ref: 'Assets',
    }

})

export interface User extends Document {
    name: String,
    email: String,
    hash: String,
    coins:String,
    wallet:String,
    assets:String
}

