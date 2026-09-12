import { Controller, Get, Module, ServiceUnavailableException } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthGuard, Public } from './auth/auth.guard';
import { Database, DatabaseModule } from './database/database.module';
import { ProjectsModule } from './projects/projects.module';

@Controller('health')
class HealthController {
  constructor(private readonly database: Database) {}
  @Public() @Get() async check() {
    try { await this.database.query('SELECT 1 FROM projects LIMIT 1'); return { status: 'ok' }; }
    catch { throw new ServiceUnavailableException('Database unavailable or migrations pending'); }
  }
}

@Module({
  imports: [DatabaseModule, ProjectsModule, ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }])],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
