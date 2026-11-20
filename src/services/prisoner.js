import api from "./api";

export const getAllPrisoners = async (page = 1, search = '') => {
    try {
        const response = await api.get('/prisoners', {
            params: { page, search },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPrisonerById = async (prisonerId) => {
    try {
        const response = await api.get(`/prisoners/${prisonerId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const createPrisoner = async (data) => {
    try {
        const response = await api.post('/prisoners', data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updatePrisoner = async (prisonerId, data) => {
    try {
        const response = await api.put(`/prisoners/${prisonerId}`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deletePrisonerById = async (prisonerId) => {
    try {
        const response = await api.delete(`/prisoners/${prisonerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}