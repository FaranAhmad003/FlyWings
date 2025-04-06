import React, { useEffect, useState } from "react";
import "./AdminCreateTicket.css";

const AdminCreateTicket = () => {
  const [ticketData, setTicketData] = useState({
    flightNumber: "",
    pnr: "",
    date_of_ticket: "",
    bookedByUsername: "",
    airline: "PIA",
    time: "",
    arrivalTime: "",
    luggage_capacity: "",
    fare: "",
    fromLocation: "",
    toLocation: "",
    paymentStatus: "PAID",
    meal: "YES",
    tripType: "ONE_WAY",
    returnDate: "",
    returnTime: "",
  });

  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    fetch("/usernames")
      .then((res) => res.json())
      .then((data) => setUsernames(data))
      .catch((err) => console.error("Error fetching usernames:", err));

    filterDropdownOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleReturnFields = () => {
    return ticketData.tripType === "RETURN";
  };

  const handleSubmit = () => {
    const payload = {
      ...ticketData,
      returnDate:
        ticketData.tripType === "RETURN" ? ticketData.returnDate : null,
      returnTime:
        ticketData.tripType === "RETURN" ? ticketData.returnTime : null,
    };

    fetch("/createTicket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Ticket created successfully!");
        console.log(data);
      })
      .catch((err) => {
        alert("Failed to create ticket.");
        console.error("Error:", err);
      });
  };

  const filterDropdownOptions = () => {
    const group =
      new URLSearchParams(window.location.search).get("group")?.toUpperCase() ||
      "";
    const dropdown = document.getElementById("toLocation");

    const oman = [
      "Muscat",
      "Salalah",
      "Sohar",
      "Duqm",
      "Khasab",
      "Musandam",
      "Nizwa",
      "Sur",
      "Masirah",
      "Buraimi",
      "Ibri",
      "Rustaq",
      "Thumrait",
      "Marmul",
      "Fahud",
      "Qarn Alam",
      "Mukhaizna",
      "Jaaluni",
      "Adam",
    ];
    const uae = ["Dubai", "Abu Dhabi", "Sharjah", "Ras al-Khaimah"];
    const ksa = [
      "Riyadh",
      "Jeddah",
      "Dammam",
      "Medina",
      "Abha",
      "Tabuk",
      "Taif",
      "Qassim",
      "Yanbu",
      "Hail",
    ];
    const all = oman.concat(uae, ksa);

    let valid = all;
    if (group === "OMAN") valid = oman;
    else if (group === "UAE") valid = uae;
    else if (group === "KSA") valid = ksa;

    if (dropdown) {
      Array.from(dropdown.options).forEach((option) => {
        if (option.value !== "" && !valid.includes(option.value)) {
          option.remove();
        }
      });
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="admin-panel">Admin Panel</div>
      </div>

      <form className="admin-form">
        <table>
          <tbody>
            {[
              ["Flight Number", "flightNumber", "text"],
              ["PNR Number", "pnr", "text"],
              ["Date of Ticket", "date_of_ticket", "date"],
              [
                "No of Tickets (Booked By Username)",
                "bookedByUsername",
                "text",
              ],
              ["Dept Time", "time", "time"],
              ["Arrival Time", "arrivalTime", "time"],
              ["Luggage Capacity", "luggage_capacity", "text"],
              ["Fare", "fare", "number"],
              ["Return Date", "returnDate", "date"],
              ["Return Time", "returnTime", "time"],
            ].map(([label, name, type]) =>
              name.startsWith("return") && !toggleReturnFields() ? null : (
                <tr key={name}>
                  <th>{label}</th>
                  <td>
                    <input
                      type={type}
                      name={name}
                      value={ticketData[name]}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
              )
            )}

            <tr>
              <th>Airline</th>
              <td>
                <select
                  name="airline"
                  value={ticketData.airline}
                  onChange={handleChange}>
                  {[
                    "PIA",
                    "Airblue",
                    "Serene Air",
                    "AirSial",
                    "Fly Jinnah",
                  ].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <th>From Location</th>
              <td>
                <select
                  name="fromLocation"
                  value={ticketData.fromLocation}
                  onChange={handleChange}>
                  <option value="">Select a City (Intl Airport)</option>
                  {[
                    "Karachi",
                    "Islamabad",
                    "Lahore",
                    "Peshawar",
                    "Multan",
                    "Sialkot",
                    "Faisalabad",
                    "Quetta",
                    "Gwadar",
                  ].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <th>To Location</th>
              <td>
                <select
                  id="toLocation"
                  name="toLocation"
                  value={ticketData.toLocation}
                  onChange={handleChange}
                  required>
                  <option value="">Select a City</option>
                  {/* Options will be filtered dynamically on load */}
                  {[
                    "Dubai",
                    "Abu Dhabi",
                    "Sharjah",
                    "Ras al-Khaimah",
                    "Muscat",
                    "Salalah",
                  ].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <th>Payment Status</th>
              <td>
                <select
                  name="paymentStatus"
                  value={ticketData.paymentStatus}
                  onChange={handleChange}>
                  <option value="PAID">Paid</option>
                  <option value="UNPAID">Unpaid</option>
                </select>
              </td>
            </tr>

            <tr>
              <th>Meal</th>
              <td>
                <select
                  name="meal"
                  value={ticketData.meal}
                  onChange={handleChange}>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </td>
            </tr>

            <tr>
              <th>Trip Type</th>
              <td>
                <select
                  name="tripType"
                  value={ticketData.tripType}
                  onChange={handleChange}>
                  <option value="ONE_WAY">One Way</option>
                  <option value="RETURN">Return</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <button type="button" onClick={handleSubmit}>
          Submit Ticket
        </button>
      </form>
    </>
  );
};

export default AdminCreateTicket;
