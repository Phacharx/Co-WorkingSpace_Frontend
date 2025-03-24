import axios from "axios";

export default async function getSpace(id: string) {
    try {
        const response = await axios.get(`http://localhost:5003/api/v1/spaces/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch space');
    }
}
