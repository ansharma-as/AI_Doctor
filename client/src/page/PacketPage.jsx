import React, { useState, useEffect } from "react";
import style from "./Home.module.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PacketPage = () => {
  const [networkData, setNetworkData] = useState([]);
  const [report, setreport] = useState([]);
  const [formData, setFormData] = useState({
    user_input: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // Handle checkbox inputs separately
      if (checked) {
        setFormData({ ...formData, [name]: [...formData[name], value] });
      } else {
        setFormData({
          ...formData,
          [name]: formData[name].filter((item) => item !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.condition);
    // console.log(formData.weight)
    // console.log(formData);
    const response = await fetch("http://127.0.0.1:8001/ai_doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_input: formData.user_input,
      }),
    });
    const data = await response.json();
    console.log(data);
    setreport(data);
    toast.success("Your Full Report is ready");
  };
  return (
    <div>
      <header
        id="header"
        className={`fixed-top  ${style.headertransparent} ${style.header1}`}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <div className={style.logo}>
            <h1>
              <a>AiDoctor</a>
            </h1>

            <a href="index.html">
              <img src="assets/img/logo.png" alt="" className="img-fluid" />
            </a>
          </div>

          <nav id="navbar" className={style.navbar}>
            <ul>
              <li>
                <a className={`nav-link scrollto ${style.active}`} href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/contact">
                  Contact
                </a>
              </li>
              <li>
                <a className={`${style.getstarted} scrollto`} href="/packet">
                  Get Started
                </a>
              </li>
            </ul>
            {/* <i className="bi bi-list mobile-nav-toggle"></i> */}
          </nav>
        </div>
      </header>
      <section id="hero" className={`${style.hero1} d-flex align-items-center`}>
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up"
            >
              <div>
                <h1>AI Doctor: Simplified AI Doctor Insights</h1>
                <h2>
                  PacketAnalyzer: Simplified Network Packet Insights
                  PacketAnalyzer offers streamlined network packet analysis.
                </h2>
              </div>
            </div>
            <div
              className="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img"
              data-aos="fade-up"
            >
              <img src="/stethoscope.png" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section
        id="details"
        style={{ marginLeft: "180px", padding: "10px" }}
        className={style.details}
      >
        {/* <div className="container"> */}
        {/* <div className={`row ${style.content}`}> */}
        <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-10">
                <label for="inputEmail4">Ai Doctor</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  name="user_input"
                  placeholder="Enter your Symptoms"
                  value={formData.user_input}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              style={{ marginTop: "25px", marginRight: "19%" }}
              className="btn btn-primary mb-3"
            >
              Make Recommendation
            </button>
          </form>
          <Popup
            trigger={
              <button
                type="submit"
                style={{ marginTop: "25px", marginRight: "19%" }}
                className="btn btn-primary mb-3"
              >
                Get Recommendation
              </button>
            }
            position="top middle"
            contentStyle={{
              width: "800px",
              padding: "20px",
              height: "600px",
              overflowY: "auto",
            }}
            // closeOnDocumentClick={false}
          >
            <h1>Report</h1>
            <ul className="list-unstyled">
              <h2>Disease : {report.Disease}</h2>
              <hr style={{ width: "50%" }} />
              <h3>Information About Disease</h3>
              <textarea
                value={report.Information}
                onChange={handleChange}
                style={{ width: "100%", height: "200px", resize: "none" }}
                disabled
              />
              <h3 style={{ marginTop: "20px" }}>Predicted Medicines</h3>
              {report.Medicine && (
                <ul className="list-group">
                  <li className="list-group-item">
                    {report.Medicine.M1}{" "}
                    {/* <Link to={`/MedicoDetails/${report.Medicine_id.I1}`}>
                      <button style={{ marginLeft: "350px" }}>Read More</button>
                    </Link> */}
                  </li>

                  <li className="list-group-item">
                    {report.Medicine.M2}{" "}
                    {/* <Link to={`/MedicoDetails/${report.Medicine_id.I2}`}>
                      <button style={{ marginLeft: "350px" }}>Read More</button>
                    </Link> */}
                  </li>

                  <li className="list-group-item">
                    {report.Medicine.M3}{" "}
                    {/* <Link to={`/MedicoDetails/${report.Medicine_id.I3}`}>
                      <button style={{ marginLeft: "350px" }}>Read More</button>
                    </Link> */}
                  </li>
                </ul>
              )}

              <h3 style={{ marginTop: "20px" }}>Predicted Tests</h3>
              {report.Test && (
                <ul className="list-group">
                  <li className="list-group-item">{report.Test.T1} </li>

                  <li className="list-group-item">{report.Test.T2} </li>

                  <li className="list-group-item">{report.Test.T3} </li>
                </ul>
              )}
            </ul>
          </Popup>
      </section>
      <div id="main">
        <footer id="footer" className={style.footer}>
          <div className={`${style.container} d-md-flex py-4`}>
            <div className="me-md-auto text-center text-md-start">
              <div className="copyright">
                &copy; Copyright{" "}
                <strong>
                  <span>AI Doctor</span>
                </strong>
                . All Rights Reserved
              </div>
              <div className={style.credits}>
                Designed by{" "}
                <a href="https://github.com/ansharma-as">Ansh</a>
              </div>
            </div>
            <div className="social-links text-center text-md-right pt-3 pt-md-0">
              <a href="#" class="twitter">
                <i class="bx bxl-twitter"></i>
              </a>
              <a href="#" class="facebook">
                <i class="bx bxl-facebook"></i>
              </a>
              <a href="#" class="instagram">
                <i class="bx bxl-instagram"></i>
              </a>
              <a href="#" class="google-plus">
                <i class="bx bxl-skype"></i>
              </a>
              <a href="#" class="linkedin">
                <i class="bx bxl-linkedin"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PacketPage;
