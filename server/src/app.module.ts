import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppService } from '@/modules/app/app.service';
import { AppController } from '@/modules/app/app.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ItemModule } from '@/modules/item/item.module';
import { S3Module } from './modules/s3/s3.module';
import { GraphQLJSON } from 'graphql-type-json';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
      resolvers: { JSON: GraphQLJSON },
    }),
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ItemModule,
    S3Module,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
