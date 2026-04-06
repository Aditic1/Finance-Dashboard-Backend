import { TransactionWithUser } from "../transactions.repository";
import { TransactionWithUserDTO } from "../transactions.types";

export const getTransactionWithUserDTO = (
  transaction: TransactionWithUser,
): TransactionWithUserDTO => {
  return {
    id: transaction.id,
    amount: transaction.amount,
    type: transaction.type,
    category: transaction.category,
    transactionDate: transaction.transactionDate,
    description: transaction.description??undefined,
    createdAt: transaction.createdAt,
    createdBy: {
      userId: transaction.createdBy.id,
      name: transaction.createdBy.name,
    },
  };
};
