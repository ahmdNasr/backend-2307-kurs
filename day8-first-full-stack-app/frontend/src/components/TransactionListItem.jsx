import { Link, useNavigate } from "react-router-dom";

const TransactionListItem = ({ transaction, setTransactions }) => {
  //   const navigate = useNavigate();
  //   const navigateToDetailPage = () => {
  //     navigate("/transaction/" + transaction.id);
  //   };

  const deleteTransaction = () => {
    fetch(`http://localhost:3003/api/v1/transactions/${transaction.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data)) // setTransactions kommt vom Parent-Component und ermöglicht, den dort vorhanden state (transactions) zu überschreiben
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Link to={"/transaction/" + transaction.id}>
        <p
          className="transaction-info-box"
          //   onClick={() => navigateToDetailPage()}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <span className="datestring">
              {new Date(transaction.timestamp).toLocaleString()}
            </span>
            <b>{transaction.description}</b>
          </div>
          <span className={transaction.type + "-transaction-amount"}>
            {transaction.type === "income" ? "+" : "-"}
            {transaction.amount} EUR
          </span>
        </p>
      </Link>

      <button onClick={() => deleteTransaction()}>❌</button>
    </div>
  );
};

export default TransactionListItem;
