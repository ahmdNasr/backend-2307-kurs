import { useEffect, useState } from "react";
import AddTransactionForm from "../components/AddTransactionForm";
import TransactionList from "../components/TransactionList";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3003/api/v1/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <AddTransactionForm setTransactions={setTransactions} />
      <TransactionList
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  );
};

export default DashboardPage;
