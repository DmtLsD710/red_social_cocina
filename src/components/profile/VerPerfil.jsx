import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './VerPerfil.css'; 

const VerPerfil = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        console.error("User ID is undefined");
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
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ver-perfil-container">
      <img src={profile.photoURL} alt="Profile" className="profile-image" />
      <div className="profile-info">
        <h2>{profile.name}</h2>
        <p>{profile.bio}</p>
        <p>{profile.location}</p>
        <a href={`/profile/${userId}`} className="edit-button">Edit Profile</a>
      </div>
    </div>
  );
};

export default VerPerfil





