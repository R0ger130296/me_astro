import { Global, Module, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import { configuration } from '../config';

@Injectable()
export class Database extends Pool implements OnModuleDestroy {
  constructor() { super({ connectionString: configuration().databaseUrl, max: 10, connectionTimeoutMillis: 5000, statement_timeout: 10000 }); }
  async onModuleDestroy() { await this.end(); }
}

@Global()
@Module({ providers: [Database], exports: [Database] })
export class DatabaseModule {}
