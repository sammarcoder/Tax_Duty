// src/assets/FileHeader/FileDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FileDetails = ({ readOnly = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        setLoading(true);
        // Adjust this endpoint to match your API structure
        const response = await axios.get(`http://localhost:5000/api/v1/fileheaders/${id}`);
        setFileData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching file details:", err);
        setError("Failed to load file details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFileData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md mx-auto max-w-4xl mt-8">
        <p>{error}</p>
        <button 
          onClick={() => navigate('/files')} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Files List
        </button>
      </div>
    );
  }

  if (!fileData) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-700 rounded-md mx-auto max-w-4xl mt-8">
        <p>No file data available.</p>
        <button 
          onClick={() => navigate('/files')} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Files List
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          File Details: {fileData.fileNumber}
        </h1>
        <div className="space-x-2">
          {!readOnly && (
            <button 
              onClick={() => navigate(`/files/${id}/edit`)} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit File
            </button>
          )}
          <button 
            onClick={() => navigate('/files')} 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Files
          </button>
        </div>
      </div>

      {/* File Header Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">File Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">File Number</p>
            <p className="font-medium">{fileData.fileNumber}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Exchange Rate</p>
            <p className="font-medium">{fileData.exchangeRate}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Value Addition Rate</p>
            <p className="font-medium">{fileData.valueAdditionRate}%</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Currency</p>
            <p className="font-medium">{fileData.currency}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Created</p>
            <p className="font-medium">{new Date(fileData.createdAt).toLocaleString()}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-medium">{new Date(fileData.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* File Items */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">File Items</h2>
        
        {fileData.details && fileData.details.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item Name
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    HS Code
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assessable Value
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duty Value
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fileData.details.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.TaxInfo?.itemName || item.itemName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.TaxInfo?.hsCode || item.hsCode}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.assessableValue}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.dutyValue}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.totalDutyValue}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="3" className="px-4 py-3 text-right font-medium text-gray-700">
                    Totals:
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                    {fileData.details.reduce((sum, item) => sum + parseFloat(item.totalAssessableValue || 0), 0).toFixed(2)}
                  </td>
                  <td></td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                    {fileData.details.reduce((sum, item) => sum + parseFloat(item.totalDutyValue || 0), 0).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No items in this file.</p>
        )}
      </div>
    </div>
  );
};

export default FileDetails;
