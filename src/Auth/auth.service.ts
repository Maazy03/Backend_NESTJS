import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, of } from 'rxjs';
import { User } from './auth.model';
// const bcrypt = require('bcrypt')
import * as bcrypt from 'bcrypt';
import generateToken from './generateToken';
// import nodemailer from "nodemailer";
import {NodemailerService} from "../nodemailer/nodemailer.service"




@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private readonly authModel: Model<User>,
    // @InjectModel('Student') private readonly studentModel: Model<Student>,
    // @InjectModel('Driver') private readonly driverModel: Model<Driver>,
    private readonly jwtService: JwtService,
    private readonly mailerService: NodemailerService

    // private readonly mailerService: MailerService
  ) { }




  /*************************** SIgn UP ***************************/
  async  registerUser(name, email, password) {
    console.log('sssssssssss', name, email, password)
    try {

    const mail = this.mailerService.sendMailToContactUs({name:"MAaz",message:"HELLO"})
      // var hash = await bcrypt.hashSync(password, 10);
      // console.log("hash", hash)
      // const newUser = new this.authModel({
      //   name,
      //   email,
      //   password: hash,
      // });
      // // const result = await newUser.save();
      // // console.log(result);
      // return await newUser.save();

    } catch (error) {
      throw (error)

    }

  }





  /*************************** Login ***************************/
  async loginUser(request) {
    console.log('sssssssssss', request.body)
    try {
      let email = request.body.email
      let password = request.body.password
      const user = await this.authModel.findOne({ email })
      console.log("user data", user)

      if (!user) {
        throw new HttpException('Invalid Email', HttpStatus.BAD_REQUEST)
      }

      else {

        if (!await bcrypt.compareSync(password, user.password)) {
          throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST)

        }

        else {
          console.log("login complete", user)
          console.log("Token", generateToken(user._id))

          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          }
        }
        //   return null

        // return user
      }
    } catch (error) {
      console.log("ERRRR---", error)
      throw error

    }

  }


  /*************************** Verify Email ***************************/
  async verifyEmail(request) {
    console.log('sssssssssss', request.body)
    try {
      let email = request.body.email
      const user = await this.authModel.findOne({ email })
      console.log("user data", user)

      if (!user) {
        throw new HttpException('Invalid Email', HttpStatus.BAD_REQUEST)
      }

      console.log("login complete", user)
 
      return new HttpException('Email Verified', HttpStatus.OK)


    } catch (error) {
      console.log("ERRRR---", error)
      throw error

    }

  }
}
