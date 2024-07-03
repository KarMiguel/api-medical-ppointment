import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../medical/services/user.service";
import { UserDto, LoginUserDto } from "../medical/dtos/userDto.dto";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(data.email);
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  async register(data: UserDto): Promise<any> {
    return this.userService.create(data);
  }
}
