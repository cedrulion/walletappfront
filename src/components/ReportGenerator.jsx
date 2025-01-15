import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api';

const ReportGenerator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState([]);
  const [error, setError] = useState(null);

  const generateReport = async () => {
    try {
      const { data } = await fetchTransactions();
      console.log("Fetched transactions:", data); // Debug log

      // Get the user ID from localStorage
      const userId = JSON.parse(localStorage.getItem('user'))?.id; // Assuming the user object has 'id'
      console.log('User ID from localStorage:', userId);

      if (!userId) {
        console.error('User ID not found in localStorage');
        setError('User ID not found. Please log in again.');
        return;
      }

      // Filter transactions based on account ID
      const transactions = data
        .filter((txn) => txn.account?._id.toString() === userId)
        .map((item) => ({
          ...item,
          date: new Date(item.date), // Parse date in UTC (no local time conversion)
        }));

      // If no date range is selected, show all transactions
      const filtered = transactions.filter((txn) => {
        if (!startDate || !endDate) return true; // Show all if no date range selected

        // Convert start and end dates to Date objects in UTC (with time set to 00:00:00 UTC)
        const start = new Date(startDate);
        start.setUTCHours(0, 0, 0, 0); // Normalize to midnight UTC

        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59, 999); // Normalize to the end of the day in UTC

        // Debugging the date comparison
        console.log("Comparing dates:", txn.date, start, end);

        // Return true if txn.date is within the start and end date range
        return txn.date >= start && txn.date <= end;
      });

      setReport(filtered);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to fetch transactions. Please try again later.');
    }
  };

  // Fetch transactions on mount
  useEffect(() => {
    generateReport();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="bg-gray-100 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-4">Generate Report</h2>
      <div className="flex space-x-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={generateReport}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {report.length > 0 ? (
        <ul>
          {report.map((txn) => (
            <li key={txn._id} className="border-b py-2">
              {txn.date.toLocaleString()}: {txn.type} - {txn.amount} ({txn.category?.name || 'No category'})
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found for the selected date range.</p>
      )}
    </div>
  );
};

export default ReportGenerator;
