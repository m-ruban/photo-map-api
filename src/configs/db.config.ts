import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { RecoveryToken } from 'src/recovery/recoveryToken.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { Notification } from 'src/notification/notification.entity';
import { Image } from 'src/image/image.entity';
import { Place } from 'src/place/place.entity';
import { Topic } from 'src/topic/topic.entity';
import { Complaint } from 'src/complaint/complaint.entity';

export const DataBaseOptions: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: false,
    logging: true,
    entities: [User, RecoveryToken, Subscription, Notification, Place, Image, Topic, Complaint],
  }),
};
