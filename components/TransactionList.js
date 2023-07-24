import { useEffect, useState } from "react";
import Form from "./Form";

const Api_Url = "http://localhost:3000/transactions";

function TransactionList() {
  const [all, setAll] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); // "default", "category", or "description"

  useEffect(() => {
    fetch(Api_Url)
      .then((res) => res.json())
      .then((data) => setAll(data));
  }, []);

  const handleAddTransaction = (newTransaction) => {
    setAll([...all, newTransaction]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteTransaction = (id) => {
    // Filter out the transaction with the given ID from the state
    setAll(all.filter((transaction) => transaction.id !== id));
  };

  const handleSort = (key) => {
    // Function to handle sorting based on the given key (category or description)
    if (sortOrder === key) {
      // If the current sortOrder is already based on the key, reverse the order
      setAll([...all].reverse());
    } else {
      // Sort the transactions based on the key and set the sortOrder
      setAll([...all].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
      setSortOrder(key);
    }
  };

  const filteredTransactions = all.filter(
    (item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Form onAddTransaction={handleAddTransaction} />
      <div>
        <label>Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by description"
        />
      </div>
      <table className="table">
        <thead>
          <tr id="header">
            <th onClick={() => handleSort("category")}>Category</th>
            <th>Date</th>
            <th onClick={() => handleSort("description")}>Description</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((item) => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>
                <button onClick={() => handleDeleteTransaction(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TransactionList;