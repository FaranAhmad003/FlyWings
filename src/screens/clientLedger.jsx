import React, { useState, useEffect } from 'react';

const ClientLedger = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [username, setUsername] = useState('');
  const userId = new URLSearchParams(window.location.search).get('userId');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setTotalAmount(0);

    try {
      const res = await fetch(`/Clientledger?startDate=${startDate}&endDate=${endDate}&userId=${userId}`);
      const data = await res.json();
      setLoading(false);

      if (data.error) {
        setResults([{ error: data.error }]);
        return;
      }

      setResults(data);
      const total = data.reduce((sum, item) => sum + parseFloat(item.Amount), 0);
      setTotalAmount(total);
    } catch (err) {
      console.error('Fetch error:', err);
      setLoading(false);
      setResults([{ error: 'Error fetching data. Please try again later.' }]);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const tableHtml = document.getElementById('results').innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 12px; text-align: left; }
            th { background-color: #f2f2f2; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .total-row { font-weight: bold; background-color: #f2f2f2; }
          </style>
        </head>
        <body>${tableHtml}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  useEffect(() => {
    if (userId) {
      fetch(`/api/username?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.username) setUsername(data.username);
        })
        .catch((err) => console.error('Username fetch error:', err));
    }
  }, [userId]);

  return (
    <div className="container">
      <h1>Client Ledger Report Filter</h1>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="startDate">Date Range <span>*</span></label>
          <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <button type="submit">Search</button>
        <button type="button" onClick={handlePrint}>Print</button>
      </form>

      <div className="results" id="results">
        {loading && <p className="loading">Loading...</p>}
        {!loading && results.length > 0 && !results[0].error && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Dated</th>
                  <th>Time</th>
                  <th>Airline</th>
                  <th>Sector</th>
                  <th>PNR</th>
                  <th>Travel Date</th>
                  <th>Type</th>
                  <th>Passenger</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {results.map((ticket, index) => {
                  const formattedDated = new Date(ticket.Dated).toLocaleString();
                  const formattedTravelDate = new Date(ticket.Travel_Date).toLocaleString();
                  return (
                    <tr key={index}>
                      <td>{formattedDated}</td>
                      <td>{ticket.time}</td>
                      <td>{ticket.Airline}</td>
                      <td>{ticket.Sector}</td>
                      <td>{ticket.PNR}</td>
                      <td>{formattedTravelDate}</td>
                      <td>{ticket.Type}</td>
                      <td>{ticket.Passenger}</td>
                      <td>{ticket.Amount}</td>
                    </tr>
                  );
                })}
                <tr className="total-row">
                  <td colSpan="8">Total Amount</td>
                  <td>{totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {!loading && results.length > 0 && results[0].error && (
          <p>{results[0].error}</p>
        )}
      </div>
    </div>
  );
};

export default ClientLedger;
// Commit update: Changes for commit
// Commit update: Changes for commit
// Commit update: Changes for commit
// Commit update at T04:11:07 - 5957
