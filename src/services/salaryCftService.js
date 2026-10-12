import api from "./api";

export const getAllSalaryCft = async (params = {}) => {
    try {
        const response = await api.get('/salary-cfts', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getSalaryCftById = async (salayCftId) => {
    try {
        const response = await api.get(`/salary-cfts/${salayCftId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createSalaryCft = async (data) => {
    try {
        const response = await api.post('/salary-cfts', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateSalaryCft = async (salaryCftId, data) => {
    try {
        const response = await api.put(`/salary-cfts/${salaryCftId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteSalaryCftById = async (salaryCftId) => {
    try {
        const response = await api.delete(`/salary-cfts/${salaryCftId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}