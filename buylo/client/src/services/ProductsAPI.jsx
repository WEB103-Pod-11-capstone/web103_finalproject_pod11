import axios from 'axios'

const getProducts = async () => {
    try {
        const response = await axios.get('/api/products')

        // In Axios, the data is automatically parsed and sits inside 'response.data'
        const data = response.data       
        return data
        
    } catch (error) {
        // Axios errors have a helpful 'response' object if the server replied
        const errorMessage = error.response 
            ? `Server Error: ${error.response.status}` 
            : "Network Error";
            
        console.error(errorMessage, error)
        throw error 
    }
}

export default {
    getProducts,
}