import { Test } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import mongoose from 'mongoose';
import exp from "constants";

describe('PostsController', () => {
  let postsController: PostsController;
  const serviceMock = {
    remove: jest.fn((id) => {
      if (id !== '') return true;
      else return false;
    }),
  };

  const createPostDto = {
    userId: '',
    title: 'title',
    description: '',
    text: 'bla bla',
    isPrivate: false,
    location: 'esbjerg',
    date: new Date(2022, 5, 7),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    })
      .overrideProvider(PostsService)
      .useValue(serviceMock)
      .compile();

    postsController = moduleRef.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(postsController).toBeDefined();
  });

  describe('delete', () => {
    it('should return true when deleted', async () => {
      expect(postsController.remove('123abd')).toBe(true);
    });
    it('should return false when invalid userid', async () => {
      expect(postsController.remove('')).toBe(false);
    });
  });
});
