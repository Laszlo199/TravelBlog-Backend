import { Test, TestingModule } from "@nestjs/testing";
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import { CreatePostDto } from "../dto/create-post.dto";
import { LikePostDto } from "../dto/like-post.dto";

describe('PostsController Unit Tests', () => {
  let postsController: PostsController;
  let spyService: PostsService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: PostsService,
      useFactory: () => ({
        create: jest.fn(() => {}),
        findAll: jest.fn(() => []),
        findAllSaved: jest.fn(() => []),
        like: jest.fn(() => { }),
        findOne: jest.fn(() => { }),
        remove: jest.fn(() => { })
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService, ApiServiceProvider],
    }).compile();

    postsController = app.get<PostsController>(PostsController);
    spyService = app.get<PostsService>(PostsService);
  })

  it('should be defined', () => {
    expect(postsController).toBeDefined();
  });

  describe('create', () => {
    it("create method not null", () => {
      const dto = new CreatePostDto();
      expect(postsController.create(dto)).not.toEqual(null);
    });
    it("calling create method", () => {
      const dto = new CreatePostDto();
      postsController.create(dto);
      expect(spyService.create).toHaveBeenCalled();
      expect(spyService.create).toHaveBeenCalledWith(dto);
    })
  })

  describe('find', () => {
    const userId = 'abc123';

    it("calling findAll with userId", () => {
      postsController.findAll(userId);
      expect(spyService.findAll).toHaveBeenCalled();
      expect(spyService.findAll).toHaveBeenCalledWith(userId);
    });
    it("calling findAllSaved with userId", () => {
      postsController.findAllSaved(userId);
      expect(spyService.findAllSaved).toHaveBeenCalled();
      expect(spyService.findAllSaved).toHaveBeenCalledWith(userId);
    });
    it("calling findOne with userId", () => {
      postsController.findOne(userId);
      expect(spyService.findOne).toHaveBeenCalled();
      expect(spyService.findOne).toHaveBeenCalledWith(userId);
    });
  })

  describe('remove', () => {
    it("calling remove with postId", () => {
      const postId = '456def'
      postsController.remove(postId);
      expect(spyService.remove).toHaveBeenCalled();
      expect(spyService.remove).toHaveBeenCalledWith(postId);
    });
  });

  describe('like', () => {
    it("calling like with postId and userId", () => {
      const dto = new LikePostDto();
      postsController.likePost(dto);
      expect(spyService.like).toHaveBeenCalled();
      expect(spyService.like).toHaveBeenCalledWith(dto);
    });
  });

});
