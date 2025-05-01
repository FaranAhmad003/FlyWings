import React, { useEffect, useState } from 'react';

const EditTicket = () => {
  const [ticketData, setTicketData] = useState({
    date_of_ticket: '',
    deptTime: '',
    luggage_capacity: '',
    meal: '',
    fare: '',
    from_location: '',
    to_location: '',
    no_of_tickets: '',
    flight_number: '',
    payment_status: 'PAID',
    trip_type: 'ONE-WAY',
    arrivalTime: '',
    airline: '',
    pnr: ''
  });

  const ticketId = new URLSearchParams(window.location.search).get('ticketId');

  useEffect(() => {
    if (!ticketId) return alert('No ticket ID provided.');
    fetch(`/tickets/${ticketId}`)
      .then(res => res.json())
      .then(data => setTicketData(data))
      .catch(err => alert('Failed to fetch ticket.'));
  }, [ticketId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const required = ['date_of_ticket', 'deptTime', 'fare', 'from_location', 'to_location', 'flight_number', 'pnr'];
    for (let field of required) {
      if (!ticketData[field]) {
        alert(`Please fill in: ${field.replace(/_/g, ' ')}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!ticketId) return alert('No ticket ID provided.');
    if (!validateForm()) return;

    try {
      const res = await fetch(`/ticketsedit/${ticketId}`, {
        method: 'POST', // or 'PUT'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData)
      });
      if (!res.ok) throw new Error();
      alert('Ticket updated successfully');
      window.location.href = `/viewticket.html?ticketId=${ticketId}`;
    } catch (err) {
      alert('Failed to update ticket');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Update Ticket</h2>
      {Object.entries(ticketData).map(([key, value]) => {
        if (key === 'payment_status' || key === 'trip_type') {
          const options = key === 'payment_status' ? ['PAID', 'UNPAID'] : ['ONE-WAY', 'ROUND-TRIP'];
          return (
            <div key={key}>
              <label style={styles.label}>{key.replace(/_/g, ' ')}:</label>
              <select name={key} value={value} onChange={handleChange} style={styles.input}>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          );
        }

        const type = key.includes('date') ? 'date' :
                     key.includes('Time') ? 'time' :
                     key.includes('fare') || key.includes('number') || key.includes('capacity') || key.includes('tickets') ? 'number' : 'text';

        return (
          <div key={key}>
            <label style={styles.label}>{key.replace(/_/g, ' ')}:</label>
            <input
              type={type}
              name={key}
              value={value}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        );
      })}
      <button onClick={handleSubmit} style={styles.button}>Update Ticket</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontFamily: 'Arial',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  label: {
    fontWeight: 'bold',
    display: 'block',
    marginTop: '10px'
  },
  input: {
    width: 'calc(100% - 12px)',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    display: 'inline-block'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px'
  }
};

export default EditTicket;
// Commit update: Changes for commit
// Commit update: Changes for commit
// Commit update: Changes for commit
