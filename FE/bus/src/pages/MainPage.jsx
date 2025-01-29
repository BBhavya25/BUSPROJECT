import React, { useEffect, useState } from "react";
import { getTickets, deleteTicket, bookTicket } from "../api"; // Assuming API functions are properly set up
import { useNavigate } from "react-router-dom";
import image from '../assets/image.png'
import './page.css';

// QuickBusSection Component
const QuickBusSection = () => {
  return (
    <section className="quickbus-section" id="about">
      <h2>Why Choose QuickBus for Your Travel Needs?</h2>
      <div className="quickbus-container">
        <p>
          QuickBus simplifies your travel experience by offering seamless online bus ticket booking across hundreds of routes. With a user-friendly platform, secure payment options, and trusted operators, planning your journey has never been easier.
        </p>
        <h3>What Makes QuickBus Unique?</h3>
        <ul>
          <li><strong>Wide Network:</strong> Connects you to top-rated private and government bus operators.</li>
          <li><strong>Convenience at Your Fingertips:</strong> Book your tickets anytime, anywhere.</li>
          <li><strong>Flexible Options:</strong> Choose from AC, Non-AC, Sleeper, Seater, and more.</li>
          <li><strong>Exclusive Offers:</strong> Enjoy discounts and deals on your bookings.</li>
          <li><strong>Live Tracking:</strong> Stay updated on your bus location for a hassle-free experience.</li>
        </ul>
        <p>Travel smart, safe, and affordable with QuickBus. Start your journey today!</p>
      </div>
    </section>
  );
};

// FAQ Section
const FAQ = () => {
  const faqData = {
    "General": [
      { question: "Can I track the location of my booked bus online?", answer: "Yes, you can track the location of your booked bus online through the redBus app or website using the tracking feature." },
      { question: "What are the advantages of purchasing a bus ticket with QuickBus?", answer: "The advantages include easy booking, secure payment options, access to various operators, and great deals on tickets." },
      { question: "Why book bus tickets online on QuickBus?", answer: "Booking online on redBus is convenient, time-saving, and offers various options to choose from." },
      { question: "Do I need to create an account on the QuickBus site to book my bus ticket?", answer: "No, you can book tickets as a guest, but creating an account lets you track your bookings and enjoy personalized deals." },
    ],
    "Ticket-related": [
      { question: "How can I book bus tickets on QuickBus?", answer: "You can book tickets by visiting the QuickBus website or app, searching for your route, and selecting your preferred bus." },
      { question: "Can I change the date of my journey after I have booked my bus ticket?", answer: "Yes, you can modify the date, but it depends on the operator's policy. Charges may apply." },
      { question: "Is it mandatory to take a printout of the ticket?", answer: "No, an mTicket or eTicket is sufficient, but carrying an ID proof is necessary." },
      { question: "I've lost my ticket. What should I do now?", answer: "You can retrieve your ticket through the 'My Bookings' section on the redBus app or website or contact customer support." },
    ],
    "Payment": [
      { question: "Is it safe to use my credit or debit card to buy bus tickets on QuickBus?", answer: "Yes, QuickBus uses secure payment gateways and encrypts all transactions to ensure the safety of your card information." },
      { question: "Does the owner of the credit card/debit card with which the bus ticket is purchased need to be one of the passengers?", answer: "No, the owner of the card does not need to be one of the passengers. However, the passengers should carry a valid ID proof." },
      { question: "What are the different payment options available on Bus Ticket booking?", answer: "redBus supports multiple payment options, including credit/debit cards, net banking, UPI, and mobile wallets." },
      { question: "How does the transaction appear on my card / account statement?", answer: "The transaction will appear as 'redBus' or similar, depending on your bank's statement format." },
    ],
    "Cancellation & Refund": [
      { question: "Can I cancel my bus ticket online?", answer: "Yes, you can cancel your bus ticket online through the QuickBus app or website under the 'My Bookings' section." },
      { question: "How can I cancel my bus ticket online?", answer: "To cancel your ticket, log in to redBus, go to 'My Bookings', select your ticket, and click on 'Cancel Ticket'." },
      { question: "I missed the bus. Do I get a refund?", answer: "Unfortunately, no refund is provided for a missed bus unless the operator is at fault." },
      { question: "How can I get a refund in case I cancel my ticket?", answer: "Refunds are processed automatically after cancellation. The amount will be credited to your original payment method within 5-7 working days." },
      { question: "What happens if the bus does not leave on time or is canceled?", answer: "If the bus is canceled or delayed significantly, redBus will help you get a refund or arrange an alternative travel option." },
    ],
  };

  const [activeCategory, setActiveCategory] = useState("General");
  const [activeIndex, setActiveIndex] = useState({});

  const toggleFAQ = (category, index) => {
    setActiveIndex((prev) => ({
      ...prev,
      [category]: prev[category] === index ? null : index,
    }));
  };

  return (
    <div className="faq-container">
      <h2>FAQs related to Bus Tickets Booking</h2>
      <div className="faq-category-buttons">
        {Object.keys(faqData).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category === activeCategory ? null : category)}
            className={category === activeCategory ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>

      {activeCategory && (
        <div className="faq-category">
          <h2>{activeCategory}</h2>
          {faqData[activeCategory].map((item, index) => (
            <div className="faq-item" key={index}>
              <div
                className="faq-question"
                onClick={() => toggleFAQ(activeCategory, index)}
              >
                <span>{item.question}</span>
                <span>{activeIndex[activeCategory] === index ? "-" : "+"}</span>
              </div>
              {activeIndex[activeCategory] === index && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MainPage = () => {
  const [tickets, setTickets] = useState([]);
  const [busName, setBusName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const navigate = useNavigate();

  // Fetch tickets when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketsData = await getTickets();  // Fetching tickets without token
        setTickets(ticketsData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  // Handle booking a new ticket
  const handleBookTicket = async () => {
    const newTicket = { busName, from, to, date, seatNumber };
    try {
      // Book ticket via API
      await bookTicket(newTicket);
      
      // Clear form fields
      setBusName("");
      setFrom("");
      setTo("");
      setDate("");
      setSeatNumber("");

      // Refetch tickets to update the list
      const ticketsData = await getTickets();
      setTickets(ticketsData);
    } catch (error) {
      console.error("Error booking ticket:", error);
    }
  };

  // Handle deleting a ticket
  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteTicket(ticketId); // Pass the ticket ID here
      const ticketsData = await getTickets();
      setTickets(ticketsData);
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div>
      <div
        id="home"
        className="hero-section"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="overlay">
          <h1>India's No.1 Ticket Booking Platform</h1>
        </div>
      </div>

      {/* QuickBus Information Section */}
      <QuickBusSection />
      <FAQ />
      <h2>Book a Ticket</h2>
    <div  className="form-container "id="bookticket">
      {/* Input fields for booking a ticket */}
      <input
        type="text"
        placeholder="Bus Name"
        value={busName}
        onChange={(e) => setBusName(e.target.value)}
      />
      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Seat Number"
        value={seatNumber}
        onChange={(e) => setSeatNumber(e.target.value)}
      />
      <button onClick={handleBookTicket}>Book Ticket</button>
      </div>
      <div className="ticket-list-container">
      <h3>Your Tickets</h3>
      {/* Display tickets or a message if no tickets are available */}
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket._id} className="ticket-item" id="deleteticket">
              {ticket.busName} from {ticket.from} to {ticket.to} - Seat {ticket.seatNumber}
              <button onClick={() => handleDeleteTicket(ticket._id)}>Cancel Ticket</button>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default MainPage;
