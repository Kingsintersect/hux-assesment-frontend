import axios from "axios";
import { deleteToken } from "./auth";

export const getSingleUserRequest = async (id: string, accessToken: string) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/contacts/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error("Request failed with status code:")
        }
    } catch (error: any) {
        if (error.response.data.message === "Unauthorized") deleteToken();
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
            return { success: response.data };
        } else {
            throw new Error("Request failed with status code:")
        }
    } catch (error: any) {
        if (error.response.data.message === "Unauthorized") deleteToken();
        throw new Error('Failed to fetch contacts.');
    }
}