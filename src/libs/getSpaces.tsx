import axios from 'axios';

export default async function getSpaces() {
  try {
    const response = await axios.get(`${process.env.BACKEND_URL}/api/v1/spaces`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ตรวจสอบสถานะการตอบกลับจาก API
    if (!response.data || !response.data.success) {
      throw new Error('No data available');
    }

    return response.data;

  } catch (error) {
    console.error("Error fetching spaces:", error);
    throw error;
  }
}
