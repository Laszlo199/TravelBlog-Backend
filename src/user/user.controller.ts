import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './user.datails.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // if we add the guards then we can't call this method without the token. You can try it :)
  //@UseGuards(JwtGuard)
  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }
}
