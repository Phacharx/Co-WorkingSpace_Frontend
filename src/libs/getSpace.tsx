export default async function getSpace(id:string) {
    const response = await fetch(`http://localhost:5003/api/v1/spaces/${id}`);
    if(!response.ok) {
        throw new Error('Failed to fetch space');
    }
    return await response.json();
}