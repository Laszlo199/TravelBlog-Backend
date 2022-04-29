import * as mongoose from 'mongoose';

export const databaseProvider = [
  {
    provide: 'MONGO_DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/travel-blog'),
  },
];