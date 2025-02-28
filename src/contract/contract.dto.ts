import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
  @ApiProperty({
    description: 'Amount of ETH to deposit',
    example: '0.00000001',
  })
  amount: string;
}

export class WithdrawDto {
  @ApiProperty({
    description: 'Amount of ETH to withdraw',
    example: '0.00000001',
  })
  amount: string;
}

export class SetValueDto {
  @ApiProperty({
    description: 'New value to set in the contract',
    example: 42,
  })
  value: number;
}

export class SetPausedDto {
  @ApiProperty({
    description: 'Pause status to set on the contract',
    example: true,
  })
  paused: boolean;
}

export class TransactionResponseDto {
  @ApiProperty({
    description: 'Transaction success status',
  })
  success: boolean;

  @ApiProperty({
    description: 'Transaction hash',
  })
  transactionHash: string;

  @ApiProperty({
    description: 'Block number where transaction was included',
  })
  blockNumber: number;
}

export class BalanceResponseDto {
  @ApiProperty({
    description: 'Ethereum address',
  })
  address: string;

  @ApiProperty({
    description: 'Balance in ETH',
    example: '0.05',
  })
  balance: string;
}

export class ContractBalanceResponseDto {
  @ApiProperty({
    description: 'Contract balance in ETH',
    example: '1.25',
  })
  balance: string;
}

export class ValueResponseDto {
  @ApiProperty({
    description: 'Current value stored in the contract',
    example: '42',
  })
  value: string;
}

export class PausedResponseDto {
  @ApiProperty({
    description: 'Current pause status of the contract',
    example: false,
  })
  paused: boolean;
}
