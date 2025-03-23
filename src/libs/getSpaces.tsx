export default async function getSpaces() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const response = await fetch('http://localhost:5003/api/v1/spaces');
    if(!response.ok) {
        throw new Error('Failed to fetch spaces');
    }
    return await response.json();
}