import React, { useState, useEffect } from 'react';
import { fetchCategories, createTransaction, fetchAccounts } from '../services/api';

const TransactionForm = ({ onTransactionAdded }) => {
    const [form, setForm] = useState({
        type: 'Income',
        amount: '',
        category: '',
        subcategory: '',
        account: '',
    });

    const [categories, setCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchCategories();
            setCategories(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchAccountData = async () => {
            const userId = JSON.parse(localStorage.getItem('user'))?.id;
            const { data } = await fetchAccounts();

            
            const userAccounts = data.filter((account) => account.userId === userId);
            setAccounts(userAccounts);
        };
        fetchAccountData();
    }, []);

  
    const handleCategoryChange = (e) => {
        const selectedCategory = categories.find((cat) => cat._id === e.target.value);
        setForm((prev) => ({ ...prev, category: e.target.value, subcategory: '' }));
        setSubcategories(selectedCategory?.subcategories || []);
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const transactionData = { ...form };
            if (form.type === 'Income') {
                delete transactionData.category;
                delete transactionData.subcategory;
            }

            
            await createTransaction(transactionData);
            onTransactionAdded();
            setForm({ type: 'Income', amount: '', category: '', account: '' }); 
        } catch (error) {
            console.error('Error creating transaction:', error);
            alert('Error submitting transaction');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Add Transaction</h2>

            {/* Type of transaction */}
            <div className="mb-4">
                <label className="block mb-1">Type</label>
                <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value, category: '', subcategory: '' })}
                    className="w-full p-2 border rounded"
                >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
            </div>

            {/* Amount field */}
            <div className="mb-4">
                <label className="block mb-1">Amount</label>
                <input
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {form.type === 'Expense' && (
                <>
                    <div className="mb-4">
                        <label className="block mb-1">Category</label>
                        <select
                            value={form.category}
                            onChange={handleCategoryChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {subcategories.length > 0 && (
                        <div className="mb-4">
                            <label className="block mb-1">Subcategory</label>
                            <select
                                value={form.subcategory}
                                onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Subcategory</option>
                                {subcategories.map((subcat, index) => (
                                    <option key={index} value={subcat}>
                                        {subcat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </>
            )}


            <div className="mb-4">
                <label className="block mb-1">Account</label>
                <select
                    value={form.account}
                    onChange={(e) => setForm({ ...form, account: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Select Account</option>
                    {accounts.map((account) => (
                        <option key={account._id} value={account._id}>
                            {account.name} ({account.type})
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Add Transaction
            </button>
        </form>
    );
};

export default TransactionForm;
