import api from "./api";

export const getAllPositions = async () => {
    try {
        const response = await api.get('/positions');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPositionById = async (positionId) => {
    try {
        const response = await api.get(`/positions/${positionId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createPosition = async (data) => {
    try {
        const response = await api.post('/positions', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updatePosition = async (positionId, data) => {
    try {
        const response = await api.put(`/positions/${positionId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deletePositionById = async (positionId) => {
    try {
        const response = await api.delete(`/positions/${positionId}`);
        return response.data
    } catch (error) {
        throw error
    }
}