import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EthereumContractService } from './contract.service';
import { EthereumContractController } from './contract.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), // This loads environment variables
  ],
  controllers: [EthereumContractController],
  providers: [EthereumContractService],
  exports: [EthereumContractService],
})
export class EthereumContractModule {}
