import React, { useState, useEffect, useCallback } from 'react'; 
import { fetchTransactions } from '../services/api'; 
import { jsPDF } from 'jspdf'; 
import 'jspdf-autotable'; // For generating tables in the PDF

const ReportGenerator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState([]);
  const [error, setError] = useState(null);

  const generateReport = useCallback(async () => {
    try {
      const { data } = await fetchTransactions();
      const userId = JSON.parse(localStorage.getItem('user'))?.id;

      if (!userId) {
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

        return txn.date >= start && txn.date <= end;
      });

      setReport(filtered);
      generatePDF(filtered); 
    } catch (err) {
      setError('Failed to fetch transactions. Please try again later.');
    }
  }, [startDate, endDate]);

  useEffect(() => {
    generateReport();
  }, [generateReport]);

  const generatePDF = (data) => {
    const doc = new jsPDF();


    doc.setFontSize(18);
    doc.text('Transaction Report', 14, 22);


    const tableData = data.map((txn) => [
      txn.date.toLocaleString(),
      txn.type,
      txn.amount,
      txn.category?.name || 'No category',
    ]);


    doc.autoTable({
      head: [['Date', 'Type', 'Amount', 'Category']],
      body: tableData,
      startY: 30,
      theme: 'grid',
    });

    doc.save('transaction_report.pdf');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Generate Transaction Report</h2>
      <div className="flex space-x-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-3 border rounded-lg w-1/3"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-3 border rounded-lg w-1/3"
        />
        <button
          onClick={generateReport}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Generate
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {report.length > 0 ? (
        <ul className="space-y-4">
          {report.map((txn) => (
            <li key={txn._id} className="border-b pb-2">
              <div className="text-sm font-medium text-gray-700">
                {txn.date.toLocaleString()} - {txn.type} - ${txn.amount}
              </div>
              <div className="text-sm text-gray-500">{txn.category?.name || 'No category'}</div>
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
