import { useState } from "react";
import { Link } from "react-router-dom";
import EditTransactionForm from "./EditTransactionForm";

const TransactionListItem = ({ transaction, setTransactions }) => {
  //   const navigate = useNavigate();
  //   const navigateToDetailPage = () => {
  //     navigate("/transaction/" + transaction.id);
  //   };

  const [showEditForm, setShowEditForm] = useState(false); // edit form nicht anzeigen am anfang

  const deleteTransaction = () => {
    fetch(`http://localhost:3003/api/v1/transactions/${transaction.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data)) // setTransactions kommt vom Parent-Component und ermöglicht, den dort vorhanden state (transactions) zu überschreiben
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 24 }}
      >
        <Link to={"/transaction/" + transaction.id}>
          <p
            className="transaction-info-box"
            //   onClick={() => navigateToDetailPage()}
          >
            <div style={{ display: "flex", gap: 8, minWidth: 320 }}>
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

        <div>
          <button
            style={{ background: "none" }}
            onClick={() => setShowEditForm(!showEditForm)}
          >
            🖊️
          </button>
          <button
            style={{ background: "none" }}
            onClick={() => deleteTransaction()}
          >
            ❌
          </button>
        </div>
      </div>

      <div style={{ display: showEditForm ? "block" : "none" }}>
        <EditTransactionForm
          transaction={transaction}
          setTransactions={setTransactions}
          setShowEditForm={setShowEditForm}
        />
      </div>
    </>
  );
};

export default TransactionListItem;
