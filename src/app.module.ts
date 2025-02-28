import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthereumContractModule } from './contract/contract.module';

@Module({
  imports: [EthereumContractModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
