import axios from "axios";

export const getSingleUserRequest = async (id: string, accessToken: string) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/contacts/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.status >= 200 && response.status < 300) {
            console.log('Response data:', response.data);
            return response.data;
        } else {
            console.error('Request failed with status code:', response.status);
            throw new Error("Request failed with status code:")
        }
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch contacts.');
    }
}

export const deleteContactRequest = async (id: string, accessToken: string) => {
    try {
        const response = await axios.delete(`http://localhost:4000/api/contacts/?contactId=${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.status >= 200 && response.status < 300) {
            console.log('Deleted successfully:', response.data);
            return { success: response.data };
        } else {
            console.error('Request failed with status code:', response.status);
            throw new Error("Request failed with status code:")
        }
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch contacts.');
    }
}