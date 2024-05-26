import React, { useState, useEffect } from 'react';
import { getBreeds, saveBreed, updateBreed, deleteBreed} from "../api/BreedService";

const Breeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newBreedName, setNewBreedName] = useState("");
  const [errorPasmina, setError] = useState("");
  const [currentBreed, setCurrentBreed] = useState(null);

  const fetchBreeds = async () => {
    try {
      const { data } = await getBreeds();
      setBreeds(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBreedClick = () => {
    setShowForm(true);
  };

  const handleSaveBreed = async () => {
    const breedExists = breeds.some(breed => breed.name.toLowerCase() === newBreedName.toLowerCase());
    if (breedExists) {
      setError("Pasmina već postoji!");
      return;
    }
    try {
      const breedData = { name: newBreedName };
      if (currentBreed) {
        await updateBreed(currentBreed.id, breedData);
      } else {
        await saveBreed(breedData);
      }
      setShowForm(false);
      setNewBreedName("");
      setError("");
      fetchBreeds(); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBreed = (breed) => {
    setCurrentBreed(breed);
    setNewBreedName(breed.name);
    setShowForm(true);
    setError("");
  };

  const handleDeleteBreed = async (breedId) => {
    try {
      await deleteBreed(breedId);
      setBreeds(breeds.filter(breed => breed.id !== breedId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewBreedName("");
    setError("");
    setCurrentBreed(null);
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  return (
    <div>
      <h2>Pasmine</h2>
      <button className="addBreedButton" onClick={handleAddBreedClick}>
        Dodaj pasminu
      </button>
      {showForm && (
        <div className="formWrapper">
          <h3>Dodaj novu pasminu</h3>
          <label>
            Naziv pasmine:
            <input
              type="text"
              value={newBreedName}
              onChange={(e) => setNewBreedName(e.target.value)}
            />
          </label>
          {errorPasmina && <p className="error">{errorPasmina}</p>}
          <button className="saveBreedButton" onClick={handleSaveBreed}>
            Spremi
          </button>
          <button className="cancelBreedButton" onClick={handleCancel}>
            Odustani
          </button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Naziv pasmine</th>
            <th>Uredi pasminu </th>
            <th>Obriši pasminu</th>
          </tr>
        </thead>
        <tbody>
          {breeds.map((breed) => (
            <tr key={breed.id}>
              <td>{breed.name}</td>
              <td>
                <button
                  onClick={() => handleEditBreed(breed)}
                  className="editBreedButton"
                >
                  Uredi
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteBreed(breed.id)}
                  className="deleteBreedButton"
                >
                  Obriši 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Breeds;

