import { useEffect, useState } from "react";

const AddTransactionForm = ({ setTransactions }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState();
  const [attachment, setAttachment] = useState();

  const addTransaction = (event) => {
    event.preventDefault(); // neu-laden der seite onSubmit verhindern

    const amountNumber = Number(amount);
    if (amountNumber === 0 || isNaN(amountNumber)) return;

    if (!attachment) return;

    const formData = new FormData();
    // formData.append("name", "tobi");
    // formData.append("email", "tobi@gmail.com");
    formData.append("attachment", attachment, attachment.name); // daten anhängen append("fieldname", file/blob, "name of file")

    fetch("http://localhost:3003/api/v1/files/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // data.fileName
        const newTransaction = {
          description,
          amount: Math.abs(amountNumber), // Betrag nehmen (aus -30 mach 30)
          type: amountNumber > 0 ? "income" : "expense",
          fileName: data.fileName,
        };
        return newTransaction;
      })
      .then((newTransaction) =>
        fetch("http://localhost:3003/api/v1/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // wichtig, damit der body parser (express.json()) sich angesprochen fühlt und den body auch parsed
          body: JSON.stringify(newTransaction),
        })
      )
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        // reset form inputs
        setDescription("");
        setAmount("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="transaction-form">
      <input
        type="text"
        placeholder="Essen gehen"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="-30"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <input type="file" onChange={(e) => setAttachment(e.target.files[0])} />
      <button onClick={addTransaction}>Add</button>
    </form>
  );
};

export default AddTransactionForm;
