import api from "./api";

export const getAllPositions = async () => {
    try {
        const response = await api.get('/positions');
        return response.data;
    } catch (error) {
        throw error;
    }
}