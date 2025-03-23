'use server'
export const userRegister = async (name: string, email: string, phone: string, password: string) => {
    try {
        const response = await fetch('http://localhost:5003/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                telephone: phone,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        const data = await response.json();
        console.log('User registered successfully:', data);

    } catch (error) {
        console.log("Error during registration:", error);
        throw new Error("Registration failed.");
    }
};
