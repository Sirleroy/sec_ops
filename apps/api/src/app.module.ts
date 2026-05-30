import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RidesModule } from './rides/rides.module';
import { TrackingModule } from './tracking/tracking.module';
import { IntelModule } from './intel/intel.module';
import { AlertsModule } from './alerts/alerts.module';
import { MediaModule } from './media/media.module';
import { FeedsModule } from './feeds/feeds.module';
import { SocialModule } from './social/social.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    RidesModule,
    TrackingModule,
    IntelModule,
    AlertsModule,
    MediaModule,
    FeedsModule,
    SocialModule,
    GameModule,
  ],
})
export class AppModule {}
