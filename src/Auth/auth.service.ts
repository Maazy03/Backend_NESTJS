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
const bcrypt = require('bcrypt')
@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private readonly authModel: Model<User>,
    // @InjectModel('Student') private readonly studentModel: Model<Student>,
    // @InjectModel('Driver') private readonly driverModel: Model<Driver>,
    private readonly jwtService: JwtService
    // private readonly mailerService: MailerService
  ) { }

  generateJWT(user: User) {

    return (this.jwtService.signAsync({ user }))
  }


  hashPassword(password: String) {
    return (bcrypt.hash(password, 10))
  }

  comparePassword(newPassword: String, passwordHash: string) {

    return (bcrypt.compare(newPassword,passwordHash))
  }






  /*************************** Login ***************************/
  async signin(user, email, password) {
    console.log('sssssssssss', user, email, password)
    try {

      const userLogin = new this.authModel({ user, email, password })

      return await userLogin.save()

    } catch (error) {
      throw (error)

    }
    // try {
    //   try {
    //     const userExist = await this.authModel
    //       .findOne({ email })
    //       .populate('currentPackage')
    //       .exec();
    //     if (!userExist) {
    //       console.log('not exist');
    //       throw new NotFoundException('User Does not Exist');
    //     }
    //     console.log(userExist.hash);
    //     console.log(bcrypt.compareSync(pass, userExist.hash));
    //     console.log(!bcrypt.compareSync(pass, userExist.hash));

    //     if (!bcrypt.compareSync(pass, userExist.hash)) {
    //       console.log('wrong password');
    //       throw new NotFoundException('Wrong Password');
    //     }
    //     const token = jwt.sign({ email: userExist.email }, 'secret', {
    //       expiresIn: '1h',
    //     });

    //     const studentCount = await this.studentModel
    //       .find({ schoolId: userExist._id, deleted: false })
    //       .countDocuments();

    //     const user = {
    //       userExist,
    //       token,
    //       studentCount,
    //     };
    //     console.log(user);
    //     return user;
    //   } catch (error) {
    //     console.log('LOGIN ERROR', error);

    //     throw new NotFoundException(error.message);
    //   }
    // } catch (error) {
    //   console.log('err====', error);
    //   throw new NotFoundException(error.message);
    //   // console.log(error);
    //   // return {
    //   //   status: 400,
    //   //   statusCode: 400,
    //   //   ...error,
    //   // };
    //   // throw new NotFoundException(error.message);
    //   // throw new HttpException(
    //   //   {
    //   //     status: HttpStatus.BAD_REQUEST,
    //   //     error: error.message,
    //   //   },
    //   //   HttpStatus.BAD_REQUEST
    //   // );
    // }
  }
}
