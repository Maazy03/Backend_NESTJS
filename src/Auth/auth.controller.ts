import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service'


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('/signin')
    async signin(
        @Body('user') user: String,
        @Body('email') email: String,
        @Body('password') password: String) {
        try {
            console.log("TRY SIGNIN")
            const authen = this.authService.signin(email, user, password)
            return authen
        }

        catch (err) {
            console.log("CATCH SIGNIN")
            throw err
        }
    }


}