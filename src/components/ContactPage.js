import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './ContactPage.css';

const ContactPage = ({ BackgroundComponent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!submitted) {
      document.querySelector('[name="name"]').focus();
    }
  }, [submitted]);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email.');
      return;
    }

    // Send email using EmailJS
    emailjs
      .send(
        'your_service_id', // Replace with your EmailJS service ID
        'your_template_id', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        'your_user_id' // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log('Email sent:', result.text);
          setSubmitted(true);
        },
        (error) => {
          console.error('Error sending email:', error);
          alert('Failed to send your message. Please try again later.');
        }
      );
  };

  return (
    <div className="contact-page">
      <BackgroundComponent />
      <div className="modal-box">
        {submitted ? (  
          <div className="thank-you-message">
            <h2>Thank You!</h2>
            <p>Your message has been sent successfully. We'll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <h1>Summon The Wizard</h1>
            <p>
              Step into the circle of enchantment and weave your words into the fabric of the cosmos.
              Your message is a cherished scroll in our realm.
            </p>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Cast Your Message!</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
