import axios from 'axios'
const API_URL = '/api/users' 

const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(`Error fetching all users from ${API_URL}:`, error);
        throw error;
    }
};



const getUserById = async (id) => {
    try {
       
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
        
    } catch (error) {
        
        console.error(`Error fetching user with id ${id}:`, error);

       
        if (error.response && error.response.status === 404) {
            console.warn(`User ${id} was not found in the database.`);
        }

        throw error; 
    }
}

const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}


const updateUser = async (id, updatedData) => {

    try {
        if (!updatedData || Object.keys(updatedData).length === 0) {
            throw new Error('No update data provided');
        }
        const response = await axios.put(`${API_URL}/${id}`, updatedData,{
            headers: {
                'Content-Type': 'application/json'
            }
        });     
        return response.data;
        
    } catch (error) {
        console.error(`Error updating user with id ${id}:`, error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
       
        const response = await axios.delete(`${API_URL}/${id}`);              
        return response.data;
        
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
        throw error;
    }
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}