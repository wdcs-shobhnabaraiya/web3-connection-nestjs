import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// import * as ethers from 'ethers';
import { CONTRACT_ABI_DATA } from './contract';
import * as ethers from 'ethers';

@Injectable()
export class EthereumContractService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;
  private wallet: ethers.Wallet;

  // Contract ABI data
  private readonly CONTRACT_ABI_DATA = CONTRACT_ABI_DATA;
  constructor(private configService: ConfigService) {
    // Initialize provider and wallet

    this.provider = new ethers.providers.JsonRpcProvider(
      this.configService.get<string>('ETHEREUM_RPC_URL'),
    );
    const privateKey = this.configService.get<string>('PRIVATE_KEY');
    if (!privateKey) {
      throw new Error('PRIVATE_KEY is not defined in the config');
    }
    this.wallet = new ethers.Wallet(privateKey, this.provider);

    // Initialize contract
    const contractAddress = this.configService.get<string>('CONTRACT_ADDRESS');
    if (!contractAddress) {
      throw new Error('CONTRACT_ADDRESS is not defined in the config');
    }
    this.contract = new ethers.Contract(
      contractAddress,
      this.CONTRACT_ABI_DATA,
      this.wallet,
    );
  }

  // Read-only methods
  async getBalance(address: string): Promise<string> {
    const balance = await this.contract.getBalance(address);
    // @ts-ignore
    return ethers.utils.formatEther(balance);
  }

  async getContractBalance(): Promise<string> {
    const balance = await this.contract.getContractBalance();
    // @ts-ignore
    return ethers.utils.formatEther(balance);
  }

  async getValue(): Promise<string> {
    const value = await this.contract.value();
    return value.toString();
  }

  async isPaused(): Promise<boolean> {
    return await this.contract.paused();
  }

  async getOwner(): Promise<string> {
    return await this.contract.owner();
  }
  async deposit(amount: string): Promise<ethers.ContractTransaction> {
    const tx = await this.contract.deposit({
      // @ts-ignore
      value: ethers.utils.parseEther(amount),
    });
    return await tx.wait();
  }

  async withdraw(amount: string): Promise<ethers.ContractTransaction> {
    // @ts-ignore
    const amountInWei = ethers.utils.parseEther(amount);
    const tx = await this.contract.withdraw(amountInWei);
    return await tx.wait();
  }

  async setValue(
    newValue: number,
  ): Promise<ethers.providers.TransactionReceipt> {
    const tx = await this.contract.setValue(newValue);
    return await tx.wait();
  }

  async setPaused(
    isPaused: boolean,
  ): Promise<ethers.providers.TransactionReceipt> {
    const tx = await this.contract.setPaused(isPaused);
    return await tx.wait();
  }

  // Event listeners
  async listenToDepositEvents(
    callback: (sender: string, amount: string) => void,
  ): Promise<void> {
    this.contract.on('Deposit', (sender, amount, event) => {
      // @ts-ignore
      callback(sender, ethers.utils.formatEther(amount));
    });
  }

  async listenToWithdrawalEvents(
    callback: (recipient: string, amount: string) => void,
  ): Promise<void> {
    this.contract.on('Withdrawal', (recipient, amount, event) => {
      // @ts-ignore
      callback(recipient, ethers.utils.formatEther(amount));
    });
  }

  async listenToValueSetEvents(
    callback: (newValue: string) => void,
  ): Promise<void> {
    this.contract.on('ValueSet', (newValue, event) => {
      callback(newValue.toString());
    });
  }
}
