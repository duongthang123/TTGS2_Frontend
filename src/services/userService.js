import api from "./api"

export const getUsers = async (currentPage, search = '') => {
    try {
		const response = await api.get('/users', {
			params: { page: currentPage, search },
		});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (id) => {
	try {
		const response = await api.get(`/users/${id}`);
		return response;
	} catch (error) {
		throw error;
	}
}

export const createUser = async (data) => {
    try {
        const response = await api.post('/users', {
            code: data.code,
			name: data.name,
			gender: data.gender,
			citizen_number: data.citizen_number,
			date: data.date,
			old_address: data.old_address,
			new_address: data.new_address,
			email: data.email,
			phone: data.phone,
			rank_id: data.rank_id,
			position_id: data.position_id,
			unit_id: data.unit_id,
			joined_date: data.joined_date,
			unit_assigned_date: data.unit_assigned_date,
			party_joined_date: data.party_joined_date,
			status: data.status,
			roles_id: data.roles_id
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id, data) => {
	try {
		const response = await api.put(`/users/${id}`, {
			code: data.code,
			name: data.name,
			gender: data.gender,
			citizen_number: data.citizen_number,
			date: data.date,
			old_address: data.old_address,
			new_address: data.new_address,
			email: data.email,
			phone: data.phone,
			rank_id: data.rank_id,
			position_id: data.position_id,
			unit_id: data.unit_id,
			joined_date: data.joined_date,
			unit_assigned_date: data.unit_assigned_date,
			party_joined_date: data.party_joined_date,
			status: data.status,
			roles_id: data.roles_id
		});

		return response;
	} catch (error) {
		console.log(error);
		
		throw error;
	}
}

export const deleteUserById = async (id) => {
	try {
		const response = await api.delete(`/users/${id}`);
		return response; 
	} catch (error) {
		throw error;
	}
}