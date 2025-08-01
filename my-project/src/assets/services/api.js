// // src/services/api.js
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api/v1';

// export const getTaxItems = async () => {
//   const response = await axios.get(`${API_BASE_URL}/taxInfo`);
//   return response.data;
// };

// export const getTaxItemById = async (id) => {
//   const response = await axios.get(`${API_BASE_URL}/taxInfo/${id}`);
//   return response.data;
// };

// export const getTaxItemByName = async (name) => {
//   const response = await axios.get(`${API_BASE_URL}/taxInfo?itemName=${name}`);
//   return response.data;
// };

// export const createFileHeader = async (fileHeaderData) => {
//   const response = await axios.post(`${API_BASE_URL}/file-header`, fileHeaderData);
//   return response.data;
// };

// export const getFileHeaders = async () => {
//   const response = await axios.get(`${API_BASE_URL}/file-header`);
//   return response.data;
// };

// export const getFileHeaderById = async (id) => {
//   const response = await axios.get(`${API_BASE_URL}/file-header/${id}`);
//   return response.data;
// };



































// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Tax Info endpoints
export const getTaxItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/taxInfo`);
  return response.data;
};

export const getTaxItemById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/taxInfo/${id}`);
  return response.data;
};

// File Header endpoints
export const createFileHeader = async (fileHeaderData) => {
  const response = await axios.post(`${API_BASE_URL}/fileheaders`, fileHeaderData);
  return response.data;
};

export const getFileHeaders = async () => {
  const response = await axios.get(`${API_BASE_URL}/fileheaders`);
  return response.data;
};

export const getFileHeaderById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/fileheaders/${id}`);
  return response.data;
};

export const updateFileHeader = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/fileheaders/${id}`, data);
  return response.data;
};

export const deleteFileHeader = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/fileheaders/${id}`);
  return response.data;
};

// File Details endpoints
export const addItemToFile = async (fileHeaderId, itemData) => {
  const response = await axios.post(`${API_BASE_URL}/fileheaders/${fileHeaderId}/items`, itemData);
  return response.data;
};

export const updateFileItem = async (itemId, itemData) => {
  const response = await axios.put(`${API_BASE_URL}/fileheaders/items/${itemId}`, itemData);
  return response.data;
};

export const removeItemFromFile = async (itemId) => {
  const response = await axios.delete(`${API_BASE_URL}/fileheaders/items/${itemId}`);
  return response.data;
};
