import axios from "axios";

export default async function getUserProfile(token: string) {
    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/v1/auth/me`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error("Cannot get user profile");
    }
}
