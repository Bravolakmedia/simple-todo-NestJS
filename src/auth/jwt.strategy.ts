import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { DatabaseService } from "../database/database.service";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
constructor(
    private readonly databaseService: DatabaseService
){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: "Secret"
})
}
async validate(payload: { email: string }){
    const user = await this.databaseService.user.findFirst({
      where: {
        email: payload.email,
      },
});
if (!user) {
  throw new Error('User not found');  // You might want to throw an UnauthorizedException
}
 return user;
}
}