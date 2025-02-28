import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EthereumContractService } from './contract.service';
import {
  DepositDto,
  WithdrawDto,
  SetValueDto,
  SetPausedDto,
  TransactionResponseDto,
  BalanceResponseDto,
  ContractBalanceResponseDto,
  ValueResponseDto,
  PausedResponseDto,
} from './contract.dto';

@ApiTags('ethereum')
@Controller('ethereum')
export class EthereumContractController {
  constructor(private readonly ethereumService: EthereumContractService) {}

  @Get('balance/:address')
  @ApiOperation({ summary: 'Get balance for an Ethereum address' })
  @ApiParam({ name: 'address', description: 'Ethereum address' })
  @ApiResponse({
    status: 200,
    description: 'Balance retrieved successfully',
    type: BalanceResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Failed to get balance' })
  async getBalance(
    @Param('address') address: string,
  ): Promise<BalanceResponseDto> {
    try {
      const balance = await this.ethereumService.getBalance(address);
      return { address, balance };
    } catch (error) {
      throw new HttpException(
        `Failed to get balance: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('contract-balance')
  @ApiOperation({ summary: 'Get contract balance' })
  @ApiResponse({
    status: 200,
    description: 'Contract balance retrieved successfully',
    type: ContractBalanceResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Failed to get contract balance' })
  async getContractBalance(): Promise<ContractBalanceResponseDto> {
    try {
      const balance = await this.ethereumService.getContractBalance();
      return { balance };
    } catch (error) {
      throw new HttpException(
        `Failed to get contract balance: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('value')
  @ApiOperation({ summary: 'Get contract value' })
  @ApiResponse({
    status: 200,
    description: 'Value retrieved successfully',
    type: ValueResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Failed to get value' })
  async getValue(): Promise<ValueResponseDto> {
    try {
      const value = await this.ethereumService.getValue();
      return { value };
    } catch (error) {
      throw new HttpException(
        `Failed to get value: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('paused')
  @ApiOperation({ summary: 'Check if contract is paused' })
  @ApiResponse({
    status: 200,
    description: 'Pause status retrieved successfully',
    type: PausedResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Failed to check pause status' })
  async isPaused(): Promise<PausedResponseDto> {
    try {
      const paused = await this.ethereumService.isPaused();
      return { paused };
    } catch (error) {
      throw new HttpException(
        `Failed to check pause status: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('deposit')
  @ApiOperation({ summary: 'Deposit ETH to the contract' })
  @ApiResponse({
    status: 201,
    description: 'Deposit successful',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Deposit failed' })
  async deposit(
    @Body() depositDto: DepositDto,
  ): Promise<TransactionResponseDto> {
    try {
      const receipt: any = await this.ethereumService.deposit(
        depositDto.amount,
      );
      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      throw new HttpException(
        `Deposit failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('withdraw')
  @ApiOperation({ summary: 'Withdraw ETH from the contract' })
  @ApiResponse({
    status: 201,
    description: 'Withdrawal successful',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Withdrawal failed' })
  async withdraw(
    @Body() withdrawDto: WithdrawDto,
  ): Promise<TransactionResponseDto> {
    try {
      const receipt: any = await this.ethereumService.withdraw(
        withdrawDto.amount,
      );
      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      throw new HttpException(
        `Withdrawal failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('set-value')
  @ApiOperation({ summary: 'Set a new value in the contract' })
  @ApiResponse({
    status: 201,
    description: 'Value set successfully',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Setting value failed' })
  async setValue(
    @Body() setValueDto: SetValueDto,
  ): Promise<TransactionResponseDto> {
    try {
      const receipt = await this.ethereumService.setValue(setValueDto.value);
      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      throw new HttpException(
        `Setting value failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('set-paused')
  @ApiOperation({ summary: 'Set the pause status of the contract' })
  @ApiResponse({
    status: 201,
    description: 'Pause status set successfully',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Setting pause status failed' })
  async setPaused(
    @Body() setPausedDto: SetPausedDto,
  ): Promise<TransactionResponseDto> {
    try {
      const receipt = await this.ethereumService.setPaused(setPausedDto.paused);
      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      throw new HttpException(
        `Setting pause status failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
