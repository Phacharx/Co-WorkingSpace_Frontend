import axios from "axios";

export default async function userLogin(userEmail: string, userPassword: string) {
    try {
        const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
            email: userEmail,
            password: userPassword
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        return response.data;
    } catch (error) {
        throw new Error("Failed to log-in");
    }
}
