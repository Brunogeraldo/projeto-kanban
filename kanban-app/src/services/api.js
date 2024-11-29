import axios from 'axios';

const API_URL = 'http://localhost:3000/cartoes'; // URL do seu backend

export const fetchCartoes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createCartao = async (cartao) => {
    const response = await axios.post(API_URL, cartao);
    return response.data;
};

export const updateCartao = async (id, cartao) => {
    const response = await axios.patch(`${API_URL}/${id}`, cartao);
    return response.data;
};

export const deleteCartao = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};