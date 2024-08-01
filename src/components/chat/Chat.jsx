import "./Chat.css";
import { useState } from "react";

const contacts = [
  { name: "Melissa M." },
  { name: "Kaleb H." },
  { name: "Maria52" },
  { name: "KAREN M." },
  { name: "Luzied" },
];

const messages = [
  { user: "Mario123", text: "Me encantó tu nueva receta.", align: "left" },
  { user: "Mario123", text: "¿En serio la probaste?", align: "right" },
  { user: "Mario123", text: "Claro, es increíble!", align: "left" },
  { user: "Mario123", text: "Gracias! Seguiré subiendo.", align: "right" },
];

const Chat = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="chat-app">
      <div className="header">
        <div className="container">
          <div className="btn-menu">
            <label htmlFor="btn-menu">☰</label>
          </div>
          <div className="logo"></div>
          <nav className="menu">
            <button onClick={toggleNotifications} className='notification-button'>
              <img className='IMGnotificaciones' src="Notificaciones.png" alt="Notificaciones" />
            </button>

            <a href="">
              <img className="imagenPerfil" src="Perfil.jpg" alt="Perfil" />
            </a>
          </nav>
        </div>
      </div>

      <div className="capa"></div>
      <input type="checkbox" id="btn-menu" />
      <div className="container-menu">
        <div className="cont-menu">
          <nav>
            <a href="">
              <img src="Inicio.png" alt="Inicio" />
              <h4>Inicio</h4>
            </a>
            <a href="">
              <img src="ParaTi.png" alt="Para ti" />
              <h4>Feed</h4>
            </a>
            <a href="">
              <img src="Chat.png" alt="Chat" />
              <h4> Chat</h4>
            </a>
          </nav>
          <label htmlFor="btn-menu">⛌</label>
        </div>
      </div>

      {showNotifications && (
        <div className="notifications-dropdown">
          <h3>Notificaciones</h3>
          <ul>
            <li>
              <img src="Perfil.jpg" alt="User 1" />
              <span>A Mario le gustó tu receta</span>
            </li>
            <li>
              <img src="Perfil.jpg" alt="User 2" />
              <span>A Luized le gustó tu receta</span>
            </li>
            <li>
              <img src="Perfil.jpg" alt="User 3" />
              <span>Carlitos te envió una solicitud de amistad</span>
              <div className="actions">
                <button>✓</button>
                <button>✕</button>
              </div>
            </li>
            <li>
              <img src="Perfil.jpg" alt="User 4" />
              <span>Martina te envió una solicitud de amistad</span>
              <div className="actions">
                <button>✓</button>
                <button>✕</button>
              </div>
            </li>
          </ul>
        </div>
      )}

      <div className="chat-body">
        <div className="contacts-list">
          <h2>Mensajes</h2>
          {contacts.map((contact, index) => (
            <div className="contact" key={index}>
              <img
                src="Perfil.jpg"
                alt={contact.name}
                className="contact-icon"
              />
              <span>{contact.name}</span>
            </div>
          ))}
        </div>
        <div className="chat-area">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.align}`}>
              <img src="Perfil.jpg" alt="User" className="message-icon" />
              <span className="message-text">{message.text}</span>
            </div>
          ))}
          <div className="message-input">
            <input type="text" placeholder="Enviar mensaje..." />
            <button>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
