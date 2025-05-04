const AllBooking = () => {
    return (
        <>
            <div id="app">
                <nav className="navbar navbar-dark bg-dark navbar-expand-md shadow-sm">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/admin">Admin Panel</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                           
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/admin/allBooking">Manage Booking</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/admin/bank">Banks</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/admin/ledger">My Ledger</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/admin/tickets">Manage Tickets</a>
                                </li>
                            </ul>
                            {/* Right Side Of Navbar */}
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    <form id="logout-form" action="https://travelnetwork.pk/logout" method="POST"
                                        style={{ display: 'none' }}>
                                        <input type="hidden" name="_token" value="Sk9GPhBdSx5lFjwpZdVk9xdNMjWjk6FpPRbJfJrg" />
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <main className="py-4" style={{ width: '90%', margin: 'auto' }}>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <h3>Bookings</h3>
                            <div className="form-group row">
                                <div className="col-md-4">
                                    <label htmlFor="group_sector">Keyword</label>
                                    <input id="group_sector" placeholder="Type your query.." className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="dept_date">Dept Date</label>
                                    <input type="date" id="dept_date" className="form-control" />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="status">Status</label>
                                    <select id="status" className="form-control">
                                        <option value="-1">All</option>
                                        <option value="0">Hold</option>
                                        <option value="1">Confirmed</option>
                                        <option value="3">Canceled</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="btn btn-outline-info btn-block" style={{ marginTop: '32px' }}>Search</button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover table-sm" id="recordTable">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Sr</th>
                                            <th scope="col">Invoice</th>
                                            <th scope="col">Client Username</th>
                                            <th scope="col">Group</th>
                                            <th scope="col" width="10%">Dep/Arv</th>
                                            <th scope="col">Passenger Type</th>
                                            <th scope="col">Reserved</th>
                                            <th scope="col" width="15%">Status</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Modal Info */}
                <div id="modalInfo" tabIndex="-1" aria-hidden="true" className="modal fade">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">IMPORTANT NOTICE!</h4>
                            </div>
                            <div className="modal-body">
                                <p>PLEASE ONCE REFRESH YOUR PAGE BEFORE CREATING NEW BOOKING TO CHECK ANY CHANGE IN FARE.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="okButton" data-dismiss="modal" className="btn btn-secondary">OK</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback Modal */}
                <div id="modal-feedback" tabIndex="-1" role="dialog" aria-labelledby="modalFeedbackLabel" aria-hidden="true" className="modal fade">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <form method="POST" action="https://travelnetwork.pk/admin/feedbacks/store" className="form-horizontal">
                                <div className="modal-header">
                                    <h4 className="modal-title">Submit your feedback!</h4>
                                    <button type="button" data-dismiss="modal" className="close">×</button>
                                </div>
                                <div className="modal-body">
                                    <input type="hidden" name="_token" value="EwHTpkuCn3h0fVW6E8mn4KZoQTxDr2f6W1NHuLwS" />
                                    <div className="form-group">
                                        <label htmlFor="title" className="col-form-label">Title</label>
                                        <input id="title" type="text" name="title" placeholder="e.g. Very Happy" autoFocus className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="value" className="col-form-label">Message</label>
                                        <textarea id="value" name="message" placeholder="e.g We are facing some issue or you like our service." required className="form-control"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" data-dismiss="modal" className="btn btn-outline-danger">Close</button>
                                    <button type="submit" className="btn btn-outline-success">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Confirmation Modal */}
                <div className="modal" tabIndex="-1" role="dialog" id="confirmationModal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmation</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p id="confirmationMessage"></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" id="confirmButton">Yes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllBooking;
