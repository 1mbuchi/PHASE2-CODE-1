import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Api_Url = "http://localhost:3000/transactions";

function Form({ onAddTransaction }) {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !date || !description || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    const newTransaction = {
      category,
      date: date.toISOString(), 
      description,
      amount,
    };

    fetch(Api_Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddTransaction(data);
        setCategory("");
        setDate(new Date());
        setDescription("");
        setAmount("");
        setError("");
      })
      .catch((error) => console.error("Error adding transaction:", error));
  };

  return (
    <>
    
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="yyyy-MM-dd" 
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button type="submit" id="submit">
        Add Transaction
      </button>
    </form>
    {error && <p id="error">{error}</p>}
    </>
  );
}

export default Form;