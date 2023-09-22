import axios from "axios";

export const onDashboard = async () => {
  try {
    const response = await axios.get('/api/records');
    return response.data;
  } catch (error) {
    throw error;
  }
};