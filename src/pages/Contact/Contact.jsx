import React, { useState } from 'react'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import { FaFacebook, FaInstagram, FaTelegram } from 'react-icons/fa'
import './Contact.css'

function Contact() {
  const notyf = new Notyf({ duration: 5000, position: { x: 'right', y: 'top' } });
  const [nameSend, setNameSend] = useState('')
  const [emailSend, setEmailSend] = useState('')
  const [messageSend, setMessageSend] = useState('')

  const contactSend = async (e) => {
    e.preventDefault();

    if (
      nameSend.trim() !== "" &&
      emailSend.trim() !== "" &&
      messageSend.trim() !== ""
    ) {
      let now = new Date();
      let timeString = now.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      let message = `📩 New User Request

A visitor has submitted a message through the website.

👤 Name: ${nameSend.trim()}
📞 Contact: ${emailSend.trim()}
📝 Message:
${messageSend.trim()}

⏱️ Sent at: ${timeString}`;

      try {
        let res = await fetch(
          `https://api.telegram.org/bot8297699918:AAHx27yPCHXCqFG1VufUDuzpCkyB0mPZux0/sendMessage`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              chat_id: 6933431339,
              text: message,
            }),
          }
        );
        console.log(res);
        notyf.success("Thank you for your message, we will contact you soon!");
      } catch (error) {
        console.log("error: " + error);
        notyf.error("An error occurred, please try again later.");
      }

      setNameSend("");
      setEmailSend("");
      setMessageSend("");
    } else {
      notyf.error("Please fill in all fields!")
    }
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Get in Touch</h1>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-item">
            <strong>Address:</strong>
            <p>Tashkent, Uzbekistan</p>
          </div>
          <div className="info-item">
            <strong>Phone:</strong>
            <p>+998 90 123 45 67</p>
          </div>
          <div className="info-item">
            <strong>Email:</strong>
            <p>computer@market.uz</p>
          </div>
          <div className="info-item">
            <strong>Working Hours:</strong>
            <p>Mon-Fri: 9AM-6PM<br />Sat-Sun: 10AM-4PM</p>
          </div>
          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-link" title="Facebook">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="social-link" title="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="social-link" title="Telegram">
                <FaTelegram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send us a Message</h2>
          <form onSubmit={contactSend} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={nameSend}
                onChange={(e) => setNameSend(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={emailSend}
                onChange={(e) => setEmailSend(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={messageSend}
                onChange={(e) => setMessageSend(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>

      <div className="coming-soon">
        <h2>🚧 Coming Soon 🚧</h2>
        <p>Advanced contact features, live chat support, and more ways to reach us will be available here soon.</p>
      </div>
    </div>
  )
}

export default Contact