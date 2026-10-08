import api from "./api";

export const getAllUnits = async () => {
    try {
        const response = await api.get('/units');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUnitById = async (unitId) => {
    try {
        const response = await api.get(`/units/${unitId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUnitById = async (unitId) => {
    try {
        const response = await api.delete(`/units/${unitId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createUnit = async (data) => {
    try {
        const response = await api.post('/units', data);
        return response.data;
    } catch (error) {
        throw error;
    }   
}

export const updateUnit = async (unitId, data) => {
    try {
        const response = await api.put(`/units/${unitId}`, data);
        return response.data;   
    } catch (error) {
        throw error;
    }
}