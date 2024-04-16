import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TransactionDetailPage = () => {
  const { tid } = useParams();

  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    fetch("http://localhost:3003/api/v1/transactions/" + tid, {
      method: "GET",
    })
      .then((res) => res.json()) // "{}", "[...]" ""
      .then((data) => {
        console.log(data);
        setTransaction(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>{transaction.description}</h1>
      <h2 className={transaction.type + "-transaction-amount"}>
        {transaction.type === "income" ? "+" : "-"}
        {transaction.amount} EUR
      </h2>
      {/* className="income" or "expense" */}
      <h2 className="datestring">
        {new Date(transaction.timestamp).toLocaleString()}
      </h2>

      <h2>Attachment:</h2>

      <img
        src={"http://localhost:3003/" + transaction.fileName}
        alt="Attachment Image"
        width={600}
      />
    </div>
  );
};

export default TransactionDetailPage;
