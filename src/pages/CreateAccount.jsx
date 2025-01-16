import React, { useState } from 'react';
import { createAccount  } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [accountName, setAccountName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('');
    const [accountBalance, setAccountBalance] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const accountData = {
                name: accountName,
                email,
                password,
                type: accountType,
                balance: parseFloat(accountBalance),
            };

            // Call the API to create or update the account
            const response = await createAccount(accountData);

            alert('Account updated successfully!');
            navigate('/dashboard'); // Navigate to the dashboard or another page
        } catch (error) {
            console.error('Error creating or updating account:', error);
            alert(
                error.response?.data?.message || 'Failed to create or update account.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create or Update Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="accountName" className="block">
                        Account Name
                    </label>
                    <input
                        type="text"
                        id="accountName"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="accountType" className="block">
                        Account Type
                    </label>
                    <select
                        id="accountType"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Bank">Bank</option>
                        <option value="Mobile Money">Mobile Money</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="accountBalance" className="block">
                        Balance
                    </label>
                    <input
                        type="number"
                        id="accountBalance"
                        value={accountBalance}
                        onChange={(e) => setAccountBalance(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default CreateAccount;
