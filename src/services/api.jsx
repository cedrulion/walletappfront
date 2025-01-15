import axios from 'axios';

// Fetch accounts
export const fetchAccounts = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('https://walletapp-9wli.onrender.com/api/accounts', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error('Error fetching accounts:', error.response || error.message);
        throw error;
    }
};

// Create account
export const createAccount = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post('https://walletapp-9wli.onrender.com/api/accounts', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error('Error creating account:', error.response || error.message);
        throw error;
    }
};

// Fetch transactions
export const fetchTransactions = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('https://walletapp-9wli.onrender.com/api/transactions', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error('Error fetching transactions:', error.response || error.message);
        throw error;
    }
};

// Create transaction
export const createTransaction = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post('https://walletapp-9wli.onrender.com/api/transactions', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error('Error creating transaction:', error.response || error.message);
        throw error;
    }
};

// Fetch categories
export const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('https://walletapp-9wli.onrender.com/api/categories', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error('Error fetching categories:', error.response || error.message);
        throw error;
    }
};

// Create category
export const createCategory = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post('https://walletapp-9wli.onrender.com/api/categories', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error('Error creating category:', error.response || error.message);
        throw error;
    }
};

// Login user and store token, then navigate if provided
export const login = async (email, password) => {
    try {
        const response = await axios.post('https://walletapp-9wli.onrender.com/api/accounts/login', { email, password });
        console.log('API response:', response); // Log full response
        return response;
    } catch (error) {
        console.error('Login error:', error.response || error.message);
        throw new Error(error.response?.data?.message || 'Invalid email or password');
    }
};
