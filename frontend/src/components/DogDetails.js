import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { getDog, updateDog, deleteDog, saveApplication, getApplications, deleteApplication, updateApplication } from '../api/DogService';
import { Link } from 'react-router-dom';
import { getBreeds } from '../api/BreedService';
import { useNavigate } from "react-router-dom";

const DogDetails = (dogs, setDogs) => {
  const navigate = useNavigate();
  console.log("Dogs:", dogs)
  const [isEditing, setIsEditing] = useState(false);
  const [breeds, setBreeds] = useState([]);
  const [dog, setDog] = useState({
    name: "",
    breed: {
      id: "",
      name: ""
    },
    age: "",
    size: "",
    city: "",
    gender: "",
    description: "",
  });

  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [adopterName, setAdopterName] = useState("");
  const [adopterEmail, setAdopterEmail] = useState("");
  const [adopterNumber, setAdopterNumber] = useState("");
  const [adoptionCity, setAdoptionCity] = useState("");
  const [adoptionMessage, setAdoptionMessage] = useState("");
  const [currentApplicationId, setCurrentApplicationId] = useState(null);
  const [applications, setApplications] = useState("");

  const { id } = useParams();

  const fetchADog = async (id) => {
    try {
      const { data } = await getDog(id);
      console.log(data);
      setDog(data)
    } catch (error) {
      console.log(error);
    }
  }

  console.log("Pas:", dog);

  const fetchBreeds = async () => {
    try {
      const { data } = await getBreeds();
      setBreeds(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApplications = useCallback(async () => {
    try {
      const { data } = await getApplications(id);
      setApplications(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  console.log(applications);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "breed") {
      console.log("Selektirana vrijendost:", value)
      const selectedBreed = breeds.find(breed => breed.id === parseInt(value));
      console.log("Selektirana pasmina:", selectedBreed);
      setDog({ ...dog, breed: { id: value, name: selectedBreed.name } });
    } else {
      setDog({ ...dog, [name]: value });
    }
  };

  console.log("Izmjenjen pas:", dog);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDog(dog);
    setIsEditing(false);
  };

  const handleDeleteDog = async () => {
    try {
      await deleteDog(dog.id);
      //setDogs(dogs.filter(dog => dog.id !== id));
      navigate("/dogs", { replace: true });
    } catch (error) {
      console.error('Error deleting dog:', error);
    }
  };

  const handleAdoptionSubmit = async (e) => {
    e.preventDefault();
    const applicationData = {
      name: adopterName,
      email: adopterEmail,
      phone: adopterNumber,
      city: adoptionCity,
      message: adoptionMessage,
    };
    try {
      if (currentApplicationId) {
        await updateApplication(id, currentApplicationId, applicationData);
      } else {
        await saveApplication(id, applicationData);
      }
      setShowAdoptionForm(false);
      setAdopterName("");
      setAdopterNumber("");
      setAdopterEmail("");
      setAdoptionMessage("");
      setAdoptionCity("");
      setCurrentApplicationId(null);
      fetchApplications();
    } catch (error) {
      console.error('Error saving application:', error);
    }
  };

  const handleEditApplication = (application) => {
    setAdopterName(application.name);
    setAdopterEmail(application.email);
    setAdopterNumber(application.phone);
    setAdoptionCity(application.city);
    setAdoptionMessage(application.message);
    setCurrentApplicationId(application.id);
    setShowAdoptionForm(true);
  };

  const handleDeleteApplication = async (applicationId) => {
    try {
      await deleteApplication(id, applicationId);
      setApplications(applications.filter(application => application.id !== applicationId));
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  console.log("Dog id:", id);
  console.log("Prijava:", applications);

  useEffect(() => {
    fetchADog(id);
    fetchBreeds();
    fetchApplications();
  }, [id, fetchApplications]);

  return (
    <div>
      <Link to={"/"} className="link">
        <i className="bi bi-arrow-left"></i> Natrag na listu{" "}
      </Link>
      <div className="profile">
        <div className="profile_details">
          <div className="profile__settings">
            <button
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Odustani" : "Uredi"}
            </button>

            <button className="delete-button" onClick={handleDeleteDog}>
              Obriši psa
            </button>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="form">
                <div className="user-details">
                  <input type="hidden" value={dog?.id} name="id" required />
                  <div className="input-box">
                    <span className="details">Ime</span>
                    <input
                      type="text"
                      value={dog?.name}
                      onChange={handleChange}
                      name="name"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Pasmina: </span>
                    <select
                      value={dog.breed?.id}
                      onChange={handleChange}
                      name="breed"
                      required
                    >
                      {breeds.map((breed) => (
                        <option key={breed.id} value={breed.id}>
                          {breed.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-box">
                    <span className="details">Starost</span>
                    <input
                      type="text"
                      value={dog.age}
                      onChange={handleChange}
                      name="age"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Veličina</span>
                    <div>
                      <input
                        type="radio"
                        name="size"
                        value="mali"
                        checked={dog.size === "mali"}
                        onChange={handleChange}
                      />{" "}
                      Mali
                      <input
                        type="radio"
                        name="size"
                        value="srednji"
                        checked={dog.size === "srednji"}
                        onChange={handleChange}
                      />{" "}
                      Srednji
                      <input
                        type="radio"
                        name="size"
                        value="veliki"
                        checked={dog.size === "veliki"}
                        onChange={handleChange}
                      />{" "}
                      Veliki
                    </div>
                  </div>
                  <div className="input-box">
                    <span className="details">Mjesto</span>
                    <input
                      type="text"
                      value={dog.city}
                      onChange={handleChange}
                      name="location"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Spol</span>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        value="muško"
                        checked={dog.gender === "muško"}
                        onChange={handleChange}
                      />{" "}
                      Muško
                      <input
                        type="radio"
                        name="gender"
                        value="žensko"
                        checked={dog.gender === "žensko"}
                        onChange={handleChange}
                      />{" "}
                      Žensko
                    </div>
                  </div>
                  <div className="input-box">
                    <span className="details">Opis</span>
                    <textarea
                      value={dog.description}
                      onChange={handleChange}
                      name="description"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="form_footer">
                  <button type="submit" className="btn">
                    Spremi
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-view">
                <p>Ime: {dog.name}</p>
                <p>Pasmina: {dog.breed?.name}</p>
                <p>Starost: {dog.age}</p>
                <p>Veličina: {dog.size}</p>
                <p>Mjesto: {dog.city}</p>
                <p>Spol: {dog.gender}</p>
                <p>Opis: {dog.description}</p>
              </div>
            )}
            {!isEditing && !showAdoptionForm && (
              <button
                className="adopt-button"
                onClick={() => setShowAdoptionForm(true)}
              >
                Prijavi se za posvajanje ovog psa!
              </button>
            )}
            {showAdoptionForm && (
              <form onSubmit={handleAdoptionSubmit} className="adoption-form">
                <h3>Prijava za udomljavanje</h3>
                <div className="input-box">
                  <span className="details">Ime i Prezime</span>
                  <input
                    type="text"
                    value={adopterName}
                    onChange={(e) => setAdopterName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Broj telefona</span>
                  <input
                    type="text"
                    value={adopterNumber}
                    onChange={(e) => setAdopterNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email adresa</span>
                  <input
                    type="email"
                    value={adopterEmail}
                    onChange={(e) => setAdopterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Mjesto</span>
                  <input
                    type="text"
                    value={adoptionCity}
                    onChange={(e) => setAdoptionCity(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Poruka</span>
                  <textarea
                    value={adoptionMessage}
                    onChange={(e) => setAdoptionMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="form_footer">
                  <button type="submit" className="btn">
                    Pošalji
                  </button>
                  <button
                    type="button"
                    className="btn cancel"
                    onClick={() => setShowAdoptionForm(false)}
                  >
                    Odustani
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      {applications && applications.length > 0 && (
        <div className="applications-table">
          <h3>Prijave za udomljavanje</h3>
          <table>
            <thead>
              <tr>
                <th>Ime i prezime</th>
                <th>Email adresa</th>
                <th>Broj telefona</th>
                <th>Mjesto</th>
                <th>Poruka </th>
                <th>Uređivanje prijava</th>
                <th>Brisanje prijava</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.name}</td>
                  <td>{application.email}</td>
                  <td>{application.phone}</td>
                  <td>{application.city}</td>
                  <td>{application.message}</td>
                  <td>
                    <button onClick={() => handleEditApplication(application)} className="update-application-button" >
                      Uredi prijavu
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteApplication(application.id)}
                      className="delete-application-button"
                    >
                      Obriši prijavu
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DogDetails;
