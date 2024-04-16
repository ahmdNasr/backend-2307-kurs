import { useEffect, useState } from "react";
const EditTransactionForm = ({
  transaction,
  setTransactions,
  setShowEditForm,
}) => {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(
    transaction.amount * (transaction.type === "expense" ? -1 : 1)
  );

  const editTransaction = (event) => {
    event.preventDefault(); // neu-laden der seite onSubmit verhindern

    const amountNumber = Number(amount);
    if (amountNumber === 0 || isNaN(amountNumber)) return;

    const transactionUpdateInfo = {
      description,
      amount: Math.abs(amountNumber), // Betrag nehmen (aus -30 mach 30)
      type: amountNumber > 0 ? "income" : "expense",
    };
    fetch(`http://localhost:3003/api/v1/transactions/${transaction.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }, // wichtig, damit der body parser (express.json()) sich angesprochen fühlt und den body auch parsed
      body: JSON.stringify(transactionUpdateInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        // hide form
        setShowEditForm(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="transaction-form">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={editTransaction}>Save</button>
    </form>
  );
};

export default EditTransactionForm;
