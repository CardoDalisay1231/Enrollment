import { RegistrarHeadService } from '../services/registrarHeadService.js';
import { handleResponse } from '../utils/handleResponse.js';

const registrarHeadService = new RegistrarHeadService();

// Get all registrar heads
export const getAllRegistrarHeads = async (req, res) => {
  try {
    const registrarHeads = await registrarHeadService.getAllRegistrarHeads();
    return handleResponse(res, 200, registrarHeads);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Fetching Registrar Heads' });
  }
};

// Get a registrar head by ID
export const getRegistrarHeadById = async (req, res) => {
  try {
    const registrarHead = await registrarHeadService.getRegistrarHeadById(req.params.id);
    if (!registrarHead) {
      throw new Error('Registrar Head not found');
    }
    return handleResponse(res, 200, registrarHead);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

// Create a new registrar head
export const createRegistrarHead = async (req, res) => {
  const { first_name, last_name, password } = req.body;

  // Check each required field for missing values
  const requiredFields = { first_name, last_name, password };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return handleResponse(res, 400, { error: `${field.replace('_', ' ')} is required` });
    }
  }

  try {
    const newRegistrarHead = await registrarHeadService.createRegistrarHead(req.body);
    return handleResponse(res, 201, newRegistrarHead);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error creating Registrar Head' });
  }
};

// Update an existing registrar head
export const updateRegistrarHead = async (req, res) => {
  try {
    const updatedRegistrarHead = await registrarHeadService.updateRegistrarHead(req.params.id, req.body);
    return handleResponse(res, 200, updatedRegistrarHead);
  } catch (error) {
    return handleResponse(res, 404, { error: 'Registrar Head not found' });
  }
};

// Delete a registrar head by ID
export const deleteRegistrarHead = async (req, res) => {
  try {
    const deletedRegistrarHead = await registrarHeadService.deleteRegistrarHead(req.params.id);
    return handleResponse(res, 200, deletedRegistrarHead); // Respond with the deleted registrar head details
  } catch (error) {
    return handleResponse(res, 404, { error: 'Registrar Head not found' });
  }
};