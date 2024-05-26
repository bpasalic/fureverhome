import axios from 'axios';

const BREEDS_URL = 'http://localhost:8080/breeds';

export async function saveBreed(breed) {
  return await axios.post(BREEDS_URL, breed);
}

export async function getBreeds() {
  return await axios.get(BREEDS_URL);
}

export async function updateBreed(id, breed) {
  return await axios.put(`${BREEDS_URL}/${id}`, breed);
}

export async function deleteBreed(id) {
  return await axios.delete(`${BREEDS_URL}/${id}`);
}






