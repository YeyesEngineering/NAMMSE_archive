import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTkey } from 'src/SecretKEY_backend';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: JWTkey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { username } = payload;
    const options = {
      where: { username: username },
    };
    const user: User = await this.userRepository.findOne(options);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
