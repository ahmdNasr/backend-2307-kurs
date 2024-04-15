import { useEffect, useState } from "react";
import TransactionListItem from "./TransactionListItem";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3003/api/v1/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.log(err));
  }, []);

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
