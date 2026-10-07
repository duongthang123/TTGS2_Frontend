import api from "./api";

export const getAllRanks = async () => {
    try {
        const response = await api.get('/ranks');
        return response.data;
    } catch (error) {
        throw error;
    }
}