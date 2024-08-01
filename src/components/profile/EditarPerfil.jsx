import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../config/firebase';
import './EditarPerfil.css'; // Asegúrate de que la ruta al archivo CSS es correcta

const EditarPerfil = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState({ name: '', bio: '', location: '', photoURL: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError("User ID is undefined");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const storage = getStorage();
    const storageRef = ref(storage, `profile_images/${userId}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError("User ID is undefined");
      return;
    }

    try {
      let updatedProfile = { ...profile };

      if (imageFile) {
        const photoURL = await handleImageUpload(imageFile);
        updatedProfile.photoURL = photoURL;
      }

      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, updatedProfile);
      } else {
        await setDoc(docRef, updatedProfile);
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = `/edit-profile/${userId}`;
      }, 2000); // Redirigir después de 2 segundos
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="editar-perfil-container">
      <form onSubmit={handleSubmit} className="editar-perfil-form">
        <h2>Editar Perfil</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">Profile updated successfully!</div>}
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Biografía</label>
          <input type="text" id="bio" name="bio" value={profile.bio} onChange={handleChange} placeholder="Bio" />
        </div>
        <div className="form-group">
          <label htmlFor="location">Ubicación</label>
          <input type="text" id="location" name="location" value={profile.location} onChange={handleChange} placeholder="Location" />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Foto de Perfil</label>
          <input type="file" id="photo" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn-save">Guardar</button>
      </form>
    </div>
  );
};

export default EditarPerfil










