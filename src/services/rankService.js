import api from "./api";

export const getAllRanks = async () => {
    try {
        const response = await api.get('/ranks');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getRankById = async (rankId) => {
    try {
        const response = await api.get(`/ranks/${rankId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createRank = async (data) => {
    try {
        const response = await api.post('/ranks', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateRank = async (rankId, data) => {
    try {
        const response = await api.put(`/ranks/${rankId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteRankById = async (rankId) => {
    try {
        const response = await api.delete(`/ranks/${rankId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}