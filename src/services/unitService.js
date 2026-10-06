import api from "./api";

export const getAllUnits = async () => {
    try {
        const response = await api.get('/units');
        return response.data;
    } catch (error) {
        throw error;
    }
}