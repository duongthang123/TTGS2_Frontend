import api from "./api";

export const getRoles = async (currentPage) => {
    try {
        const response = await api.get(`/roles?page=${currentPage}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllPermissions = async () => {
    try {
        const response = await api.get('/permissions');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createRole = async (data) => {
    try {
        const response = await api.post('/roles', {
            name: data.name,
            display_name: data.display_name,
            group: data.group,
            permission_ids: data.permission_ids
        });

        return response;
    } catch (error) {
        throw error;
    }
}

export const updateRole = async (id, data) => {
    try {
        const response = await api.put(`/roles/${id}`, {
            name: data.name,
            display_name: data.display_name,
            group: data.group,
            permission_ids: data.permission_ids
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteRole = async (id) => {
    try {
        await api.delete(`/roles/${id}`);
    } catch (error) {
        throw error;
    }
}

export const getRoleById = async (id) => {
    try {
        const response = await api.get(`/roles/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}