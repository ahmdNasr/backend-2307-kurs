import TransactionListItem from "./TransactionListItem";

const TransactionList = ({ transactions, setTransactions }) => {
  return (
    <>
      {transactions.map((transaction) => (
        <TransactionListItem
          transaction={transaction}
          key={transaction.id}
          setTransactions={setTransactions}
        />
      ))}
    </>
  );
};

export default TransactionList;
