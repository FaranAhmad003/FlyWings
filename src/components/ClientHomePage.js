import React, { useEffect } from "react";
import "./ClientHomePage.css";

const ClientHomePage = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");

    if (userId) {
      document.getElementById(
        "myBookingsLink"
      ).href = `/client/myBooking?userId=${userId}`;
      document.getElementById(
        "bankLink"
      ).href = `/client/bank?userId=${userId}`;
      document.getElementById(
        "clientLedger"
      ).href = `/client/Ledger?userId=${userId}`;

      fetch(`/api/username?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            document.getElementById("usernameDisplay").textContent =
              data.username;
          }
        });

      document.querySelectorAll(".image-container a").forEach((link) => {
        const href = new URL(link.href);
        href.searchParams.set("userId", userId);
        link.href = href.toString();
      });
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-md shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand">Client Portal</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link">New Booking</a>
              </li>
              <li className="nav-item">
                <a id="myBookingsLink" className="nav-link">
                  My Bookings
                </a>
              </li>
              <li className="nav-item">
                <a id="bankLink" className="nav-link">
                  Banks
                </a>
              </li>
              <li className="nav-item">
                <a id="clientLedger" className="nav-link">
                  Ledger
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/logout">
                  <span id="usernameDisplay"></span>
                  <img
                    src="/assets/logout.png"
                    alt="Logout"
                    style={{ width: 20, height: 20 }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="py-4" style={{ width: "90%", margin: "auto" }}>
        <div className="row justify-content-center mb-2">
          {[
            {
              href: "/public/client.html?group=uae",
              src: "/assets/UAE.jpeg",
              label: "UAE GROUPS",
            },
            {
              href: "/public/client.html?group=ksa",
              src: "/assets/oman.jpeg",
              label: "OMAN MASCAT",
            },
            {
              href: "/public/client.html?group=umrah",
              src: "/assets/KSA.jpeg",
              label: "KSA",
            },
            {
              href: "/public/client.html?group=all",
              src: "/assets/all.jpeg",
              label: "ALL GROUPS",
            },
          ].map(({ href, src, label }) => (
            <div className="col-md-6" key={label}>
              <div className="image-container">
                <a href={href}>
                  <img src={src} alt={label} className="image" />
                  <div className="overlay">{label}</div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClientHomePage;
// Commit update: Changes for commit
// Commit update: Changes for commit
// Commit update: Changes for commit
