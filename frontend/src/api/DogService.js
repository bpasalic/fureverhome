import axios from 'axios'

const API_URL = 'http://localhost:8080/dogs';

export async function saveDog(dog) {
    return await axios.post(API_URL, dog);
}

export async function getDogs() {
    return await axios.get(API_URL);
}

export async function getDog(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function updateDog(dog) {
    return await axios.put(`${API_URL}/${dog.id}`, dog);
}

export async function deleteDog(id) {
    return await axios.delete(`${API_URL}/${id}`);
}

export async function getApplications(id, applications) {
    return await axios.get(`${API_URL}/${id}/applications`, applications);
}

export async function saveApplication(id, application) {
    return await axios.post(`${API_URL}/${id}/applications`, application);
}

export async function deleteApplication(id, idAppl) {
    return await axios.delete(`${API_URL}/${id}/applications/${idAppl}`);
}

export async function updateApplication(id, applicationId, application) {
    return await axios.put(`${API_URL}/${id}/applications/${applicationId}`, application);
}









