import "./App.css";
import { useEffect, useState, useRef, handleFileChange } from "react";
import { getDogs, saveDog } from "./api/DogService";
import { getBreeds } from "./api/BreedService";
import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import DogList from "./components/DogList";
import Dog from "./components/Dog";
import DogDetails from "./components/DogDetails";
import BreedTable from "./components/Breeds";

function App() {
  const modalRef = useRef();
  const [data, setData] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [values, setValues] = useState({
    id: "",
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
    photoUrl: "",
  });
  const getAllDogs = async () => {
    try {
      const { data } = await getDogs();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBreeds = async () => {
    try {
      const { data } = await getBreeds();
      setBreeds(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDog = async (dog) => {
    try {
      const { data } = await saveDog(dog)
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "breed") {
      console.log("ID kliknute pasmine:", value);
      const selectedBreed = breeds.find((breed) => breed.id === Number(value));
      console.log("Odabrana pasmina:", selectedBreed);
      if (selectedBreed) {
        setValues({
          ...values,
          breed: {
            id: selectedBreed.id,
            name: selectedBreed.name,
          }
        });
      }
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
      console.log(values);
    }
  };

  const handleNewDog = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveDog(values);
      const formData = new FormData();
      formData.append('id', data.id);
      await getAllDogs();
      toggleModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleModal = (show) => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllDogs();
    getAllBreeds();
  }, []);

  return (
    <div>
      <Header
        toggleModal={toggleModal} numberOfDogs={data.totalElements}
      ></Header>
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/dogs"} />} />
            <Route path="/dogs" element={<DogList data={data} toggleModal={toggleModal} />} />
            <Route path="/dogs/:id" element={<DogDetails />} />
            <Route path="/breeds" element={<BreedTable />} />
          </Routes>
        </div>
      </main>

      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>Novi Pas</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewDog}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Ime</span>
                <input
                  type="text"
                  value={values.name}
                  onChange={onChange}
                  name="name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Pasmina</span>
                <select
                  value={values.breed.id}
                  onChange={onChange}
                  name="breed">
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
                  value={values.age}
                  onChange={onChange}
                  name="age"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Veličina</span>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="Mali"
                      name="size"
                      checked={values.size === "Mali"}
                      onChange={onChange}
                    />
                    Mali
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Srednji"
                      name="size"
                      checked={values.size === "Srednji"}
                      onChange={onChange}
                    />
                    Srednji
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Veliki"
                      name="size"
                      checked={values.size === "Veliki"}
                      onChange={onChange}
                    />
                    Veliki
                  </label>
                </div>
              </div>
              <div className="input-box">
                <span className="details">Mjesto</span>
                <input
                  type="text"
                  value={values.city}
                  onChange={onChange}
                  name="city"
                  required
                />
              </div>
              <div className="input-box radio-group">
                <span className="details">Spol</span>
                <label>
                  <input
                    type="radio"
                    value="Žensko"
                    name="gender"
                    checked={values.gender === "Žensko"}
                    onChange={onChange}
                  />
                  Žensko
                </label>
                <label>
                  <input
                    type="radio"
                    value="Muško"
                    name="gender"
                    checked={values.gender === "Muško"}
                    onChange={onChange}
                  />
                  Muško
                </label>
              </div>
              <div className="input-box full-width">
                <span className="details">Opis</span>
                <textarea
                  value={values.description}
                  onChange={onChange}
                  name="description"
                  required
                ></textarea>
              </div>
            </div>
            <div className="form_footer">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="btn btn-danger"
              >
                Odustani
              </button>
              <button type="submit" className="btn">
                Spremi
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <Dog></Dog>
    </div>
  );
}

export default App;
