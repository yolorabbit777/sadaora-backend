import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from '@/profiles/profiles.module';
import { FeedModule } from '@/feed/feed.module';
import { StatsModule } from '@/stats/stats.module';
import { Profile } from '@/profiles/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'profiles.sqlite',
      entities: [Profile],
      synchronize: true,
    }),
    ProfilesModule,
    FeedModule,
    StatsModule,
  ],
})
export class AppModule {}
