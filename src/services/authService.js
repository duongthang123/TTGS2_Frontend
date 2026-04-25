import api from "./api"

export const login = async (citizenNumber, password) => {
    try {
        const response = await api.post("/login", {
            citizen_number: citizenNumber,
            password: password
        });
        return response.data;
    }catch(error) {
        throw error;
    }
}


