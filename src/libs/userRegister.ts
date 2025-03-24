import axios from "axios";

export const userRegister = async (name: string, email: string, phone: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:5003/api/v1/auth/register', {
            name,
            email,
            telephone: phone,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('User registered successfully:', response.data);
    } catch (error) {
        console.log("Error during registration:", error);
        throw new Error("Registration failed.");
    }
};
