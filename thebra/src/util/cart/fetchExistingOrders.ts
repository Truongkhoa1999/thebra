// Assuming this function fetches existing orders from the backend API
async function fetchExistingOrders(): Promise<any[]> {
  try {
    const token = localStorage.getItem('jwt');
    const url = 'http://localhost:8080/api/v1/order/'; 
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data; // Return the fetched orders data
    } else {
      throw new Error('Failed to fetch existing orders');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch existing orders');
  }
}
export default fetchExistingOrders;