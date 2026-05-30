import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: { phone: string; password: string; role?: number }) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({ ...dto, password: hash });
    return this.signToken(user);
  }

  async login(dto: { phone: string; password: string }) {
    const user = await this.usersService.findByPhone(dto.phone);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.signToken(user);
  }

  private signToken(user: { id: string; role: number }) {
    const payload = { sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
