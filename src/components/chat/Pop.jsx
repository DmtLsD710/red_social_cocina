import  { useState } from 'react';
import './Pop.css';

const UploadPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Image:', image);
    console.log('Caption:', caption);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="upload-post">
      <div className='header'>
        <div className='container'>
          <div className='btn-menu'>
            <label htmlFor="btn-menu">☰</label>
          </div>
          <div className='logo'>
          </div>
          <nav className='menu'>
            <button onClick={toggleNotifications} className='notification-button'>
              <img className='IMGnotificaciones' src="Notificaciones.png" alt="Notificaciones" />
            </button>
            <a href="">
              <img className='imagenPerfil' src="Perfil.jpg" alt="Perfil" />
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
              <h4>Chat</h4>
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

      <div className="content">
        <h2 className="title">Crea una nueva publicación</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="upload-image">
            <label htmlFor="imageUpload" className="upload-label">
              {image ? <img src={image} alt="Preview" /> : 'Haga click para subir una imagen'}
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
          <div className="caption-container">
            <div className="caption">
              <textarea
                placeholder="Escribe un pie de foto o video..."
                value={caption}
                onChange={handleCaptionChange}
              ></textarea>
            </div>
            <button type="submit">Compartir</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPost;
