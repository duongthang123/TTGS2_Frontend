import api from "./api"

export const getUsers = async (currentPage) => {
    try {
        const response = await api.get(`/users?page=${currentPage}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}