import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const EditPassenger = () => {
  const [searchParams] = useSearchParams();
  const passengerId = searchParams.get('passenger_id');

  const [formData, setFormData] = useState({
    surname: '',
    given_name: '',
    title: 'MR',
    passport_number: '',
    dob: '',
    doe: ''
  });

  const loadPassengerData = async () => {
    if (passengerId) {
      try {
        const response = await fetch(`/api/getPassenger/${passengerId}`);
        const data = await response.json();
        setFormData({
          surname: data.surname || '',
          given_name: data.given_name || '',
          title: data.title || 'MR',
          passport_number: data.passport_number || '',
          dob: data.dob || '',
          doe: data.doe || ''
        });
      } catch (error) {
        console.error('Error fetching passenger data:', error);
      }
    } else {
      console.error('No passenger_id found in the query parameters.');
    }
  };

  const updatePassengerData = async () => {
    try {
      const response = await fetch(`/api/editPassenger/${passengerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        alert('Passenger updated successfully!');
      } else {
        alert('Failed to update passenger.');
      }
    } catch (error) {
      console.error('Error updating passenger data:', error);
    }
  };

  useEffect(() => {
    loadPassengerData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Edit Passenger</h1>
        <div style={styles.formGroup}>
          <div style={styles.inputWrapper}>
            <label htmlFor="surname">Surname</label>
            <input type="text" id="surname" value={formData.surname} onChange={handleChange} placeholder="e.g. M Arshad" />
          </div>
          <div style={styles.inputWrapper}>
            <label htmlFor="given_name">Given Name</label>
            <input type="text" id="given_name" value={formData.given_name} onChange={handleChange} placeholder="e.g. Ghafoor" />
          </div>
          <div style={styles.inputWrapper}>
            <label htmlFor="title">Title</label>
            <select id="title" value={formData.title} onChange={handleChange}>
              <option value="MR">MR.</option>
              <option value="MRS">MRS.</option>
              <option value="MS">MS.</option>
            </select>
          </div>
          <div style={styles.inputWrapper}>
            <label htmlFor="passport">Passport #</label>
            <input type="text" id="passport_number" value={formData.passport_number} onChange={handleChange} placeholder="e.g. FP1417751" maxLength={50} />
          </div>
          <div style={styles.inputWrapper}>
            <label htmlFor="dob">DOB (Birth)</label>
            <input type="date" id="dob" value={formData.dob} onChange={handleChange} />
          </div>
          <div style={styles.inputWrapper}>
            <label htmlFor="doe">DOE (Expiry)</label>
            <input type="date" id="doe" value={formData.doe} onChange={handleChange} />
          </div>
        </div>
        <button style={styles.button} onClick={updatePassengerData}>Update</button>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif'
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: 800,
    boxSizing: 'border-box'
  },
  title: {
    textAlign: 'center',
    marginBottom: 20
  },
  formGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-between'
  },
  inputWrapper: {
    flex: '1 1 calc(50% - 20px)',
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    width: '100%',
    padding: 10,
    marginTop: 20,
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: 16,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  }
};

export default EditPassenger;
// Commit update: Changes for commit
// Commit update: Changes for commit
// Commit update: Changes for commit
// Commit update at T19:29:11 - 32074
