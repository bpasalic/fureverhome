import React, {useState} from 'react'
import Dog from './Dog'
import { getDogs } from '../api/DogService';

import { useEffect } from 'react';

const DogList = ({ data, toggleModal }) => {

  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    try {
      const response = await getDogs();
      setDogs(response.data);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(dog =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header className='header'>
      <div className='container'>
            <h3>Psi za udomljavanje</h3>
            <div className="search-container">
            <input
              type="text"
              placeholder="Pretraži pse..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
            <button onClick={() => toggleModal(true)} className='btn'>
                <i className='bi bi-plus-square'></i> Dodaj novog psa
            </button>
        </div>
      </header>
      <main className="main">
        {filteredData.length === 0 && (
          <div>Nema rezultata za traženi pojam.</div>
        )}

        <ul className="dog__list">
          {filteredData.length > 0 &&
            filteredData.map((dog) => <Dog dog={dog} key={dog.id} />)}
        </ul>
      </main>
    </div>
  );
}

export default DogList
