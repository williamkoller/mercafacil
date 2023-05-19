import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthInputDTO } from './dtos/auth-input.dto';
import { UserService } from 'src/user/user.service';
import { BcryptAdapter } from 'src/shared/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from 'src/shared/jwt/jwt-adapter/jwt-adapter';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtAdapter: JwtAdapter,
  ) {}
  async signIn(data: AuthInputDTO) {
    const userHasSignIn = await this.userService.findByEmail(data.email);

    if (!userHasSignIn) {
      throw new NotFoundException('User not found');
    }

    const validPassword = await this.bcryptAdapter.comparer(
      data.password,
      userHasSignIn.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const payload = {
      sub: userHasSignIn.id,
      name: userHasSignIn.name,
    };

    const accessToken = await this.jwtAdapter.sign(payload);

    return {
      accessToken,
    };
  }
}
