import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model, Schema } from "mongoose";
import { PostsService } from "../posts.service";
import { Post } from "../entities/post.entity";
import { Profile } from "../../profiles/entities/profile.entity";
import { PostSchema } from "../../mongoDB/post.schema";
import { CreatePostDto } from "../dto/create-post.dto";
import { ProfileSchema } from "../../mongoDB/profile.schema";
import { HttpException } from "@nestjs/common";


describe("PostService", () => {
  let postService: PostsService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let postModel: Model<Post>;
  let profileModel: Model<Profile>

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    postModel = mongoConnection.model(Post.name, PostSchema);
    profileModel = mongoConnection.model(Profile.name, ProfileSchema);

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
          { provide: "POST_MODEL", useValue: postModel},
          { provide: "PROFILE_MODEL", useValue: profileModel},
      ],
    }).compile();
    postService = app.get<PostsService>(PostsService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe("create", () => {
    it("should return the saved post id", async () => {
      const dto = new CreatePostDto();
      const userId = 'abc123'
      const profile = new Profile();
      profile.userId = userId;

      await (new profileModel(profile).save());
      dto.title = 'the title';
      dto.userId = userId;

      const createdPostId = await postService.create(dto);
      expect(createdPostId).not.toBe(null);
    });
    it("should throw exception", async () => {
      const dto = new CreatePostDto();
      dto.userId = 'test'

      await expect(postService.create(dto))
        .rejects
        .toThrow(HttpException);
    });
  });

  describe("findAll", () => {
    it("should return all posts created by the user", async () => {
      //create a profile
      const userId = '6283639e5f1e8c4361970d07'
      const profile = new Profile();
      profile.userId = userId;
      await (new profileModel(profile).save());

      //create posts
      const dto1 = new CreatePostDto();
      dto1.userId = userId
      dto1.title = 'test1';
      await (new postModel(dto1).save());

      const dto2 = new CreatePostDto();
      dto2.userId = userId
      dto2.title = 'test2';
      await (new postModel(dto2).save());

      const ownPosts = await postModel.find({userId: userId}).exec();
      expect(ownPosts.length).toBe(2);
    });
    it("should throw exception", async () => {
      const userId = 'badId'
      await expect(postService.findAll(userId))
        .rejects
        .toThrow(HttpException);
    });
  });

  describe("findOne", () => {
    it("should return the post with that id", async () => {
      const dto = new CreatePostDto();
      dto.title = "test";
      const savedPost = await (new postModel(dto).save());

      const resultPost = await postModel.findOne({_id: savedPost.id});
      expect(resultPost.title).toBe(savedPost.title);
    });

    it("should throw exception (no post found)", async () => {
      const postId = '6283639e5f1e8c4361970d07'
      await expect(postService.findOne(postId))
        .rejects
        .toThrow(HttpException);
    });
  });
});
