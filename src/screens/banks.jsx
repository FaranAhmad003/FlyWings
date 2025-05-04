import React from 'react';
import '../css/app.css';
import '../css/client.css';
import 'select2/dist/css/select2.min.css';
import 'font-awesome/css/font-awesome.min.css';

const AdminPanel = () => {
  return (
    <div>
      <div className="navbar">
        <nav className="navbar navbar-dark bg-dark navbar-expand-md shadow-sm">
          <div className="container-fluid">
            <a className="navbar-brand" href="/admin">Admin Panel</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item"><a className="nav-link" href="/admin/allBooking">Manage Booking</a></li>
                <li className="nav-item"><a className="nav-link" href="/admin/bank">Banks</a></li>
                <li className="nav-item"><a className="nav-link" href="/admin/ledger">My Ledger</a></li>
                <li className="nav-item"><a className="nav-link" href="/admin/tickets">Manage Tickets</a></li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <form id="logout-form" action="https://travelnetwork.pk/logout" method="POST" style={{ display: 'none' }}>
                    <input type="hidden" name="_token" value="Sk9GPhBdSx5lFjwpZdVk9xdNMjWjk6FpPRbJfJrg" />
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <header style={{
        backgroundColor: '#f0f0f0', padding: '10px 20px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div className="header-container">
          <h2>Banks</h2>
        </div>
      </header>

      <main>
        <div className="admin-panel" style={{ padding: '20px', color: '#fff', fontSize: '24px' }}>
          <div className="banks" style={{ marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Sr#</th>
                  <th>Bank</th>
                  <th>Title</th>
                  <th>Account No</th>
                  <th>IBAN No</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Bank Alfalah</td>
                  <td>FLY WINGS INTERNATIONAL</td>
                  <td>5652-5000943556</td>
                  <td>PK31ALFH5652005000943556</td>
                  <td>High Street, Sahiwal</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>JS Bank</td>
                  <td>FLY WINGS INTERNATIONAL</td>
                  <td>9028-205304</td>
                  <td>PK09JSBL9028000000205304</td>
                  <td>High Street, Sahiwal</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>UBL Bank</td>
                  <td>TARIQ SALEEM</td>
                  <td>0391-206955045</td>
                  <td>PK16UNIL0109000206955045</td>
                  <td>High Street, Sahiwal</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Standard Charted</td>
                  <td>TARIQ SALEEM</td>
                  <td>01033676401</td>
                  <td>PK42SCBL0000001033676401</td>
                  <td>High Street, Sahiwal</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>HBL Bank</td>
                  <td>MUHAMMAD AYUB</td>
                  <td>1651-7914510303</td>
                  <td>PK46HABB0016517914510303</td>
                  <td>High Street, Sahiwal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
