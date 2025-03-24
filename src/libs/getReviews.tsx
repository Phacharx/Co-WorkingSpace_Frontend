import axios from 'axios';

export default async function getReviews(spaceId: string) {
    try {
        const response = await axios.get(`http://localhost:5003/api/v1/spaces/${spaceId}/reviews`);
        
        console.log('Reviews fetched:', response.data);  // Log the response to inspect the data
        return response.data.data || [];  // Return reviews array, or empty array if not available
    } catch (error) {
        // console.error('Error fetching reviews:', error);
        throw new Error('Failed to fetch reviews');
    }
}
