import axios from 'axios';

const apiUrl = 'http://localhost:5000/users/'

export async function getUsers() {
    return await axios.get(`${apiUrl}/getAllUsers`);
}

export async function deleteUser(userId) {
    return await axios.delete(`${apiUrl}/deleteUser/${userId}`);
}


