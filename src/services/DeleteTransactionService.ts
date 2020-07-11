import { getCustomRepository } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRespository = getCustomRepository(TransactionRepository);
    const transactionExist = await transactionRespository.findOne({
      where: {
        id,
      },
    });
    if (!transactionExist) {
      throw new AppError('Transaction not Exist');
    }
    await transactionRespository.delete({ id });
    throw new AppError('', 204);
  }
}

export default DeleteTransactionService;
