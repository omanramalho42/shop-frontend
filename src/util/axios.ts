import axios from 'axios';

const getListProducts = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': 'pt-br',
    // 'Authorization': `Bearer ${accessToken}`,
  }

  try {
      const data = 
        await axios.get(`${process.env.REACT_APP_API_URL}/api/products`, { headers })
  
      return data;
    } catch (error: any) {
    console.log(error.message);
  }
}

export { getListProducts }