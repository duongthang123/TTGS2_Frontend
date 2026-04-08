import api from "./api"

export const login = async (citizenNumber, password) => {
    const response = await api.post("/login", {
        citizen_number: citizenNumber,
        password: password
    });

    localStorage.setItem("access_token", response.data.data.access_token);
    
    return response.data;
}


