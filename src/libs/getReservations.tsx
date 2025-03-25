import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import axios from "axios";

export default async function getReservations() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/v1/reservations`, {
            headers: {
                'Authorization': `Bearer ${session.user.token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch reservations');
    }
}
