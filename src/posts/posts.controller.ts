import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseInterceptors, UploadedFile
} from "@nestjs/common";
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { LikePostDto } from './dto/like-post.dto';
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }


  @UseInterceptors(FileInterceptor('file'))
  @Post('file/:postId')
  async uploadFile(@Param('postId') postId: string, @UploadedFile() file: Express.Multer.File) {
    return await this.postsService.addPhoto(file.buffer, postId);
  }

  /**
   * returns a list of all posts created by the user
   * @param id
   */
  @Get('own/userId/:id')
  async findAll(@Param('id') id: string) {
    return await this.postsService.findAll(id);
  }

  /**
   * returns a list of all posts liked by the user
   * @param id
   */
  @Get('liked/userId/:id')
  async findAllSaved(@Param('id') id: string) {
    return await this.postsService.findAllSaved(id);
  }

  /**
   * performs an action of user liking the post
   * @param likePostDto
   */
  @Post('like')
  async likePost(@Body() likePostDto: LikePostDto) {
    return await this.postsService.like(likePostDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
