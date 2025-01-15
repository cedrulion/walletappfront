import React, { useState, useEffect, useCallback } from 'react';
import { fetchTransactions } from '../services/api';

const ReportGenerator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState([]);
  const [error, setError] = useState(null);

  const generateReport = useCallback(async () => {
    try {
      const { data } = await fetchTransactions();
      console.log('Fetched transactions:', data);

      const userId = JSON.parse(localStorage.getItem('user'))?.id;
      console.log('User ID from localStorage:', userId);

      if (!userId) {
        console.error('User ID not found in localStorage');
        setError('User ID not found. Please log in again.');
        return;
      }

      const transactions = data
        .filter((txn) => txn.account?._id.toString() === userId)
        .map((item) => ({
          ...item,
          date: new Date(item.date),
        }));

      const filtered = transactions.filter((txn) => {
        if (!startDate || !endDate) return true;

        const start = new Date(startDate);
        start.setUTCHours(0, 0, 0, 0);

        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59, 999);

        console.log('Comparing dates:', txn.date, start, end);
        return txn.date >= start && txn.date <= end;
      });

      setReport(filtered);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to fetch transactions. Please try again later.');
    }
  }, [startDate, endDate]);

  useEffect(() => {
    generateReport();
  }, [generateReport]);

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
