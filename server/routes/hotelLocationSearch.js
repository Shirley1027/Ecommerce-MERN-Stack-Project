import express from "express";
import axios from "axios";
const router = express.Router();



router.post('/search', async (req, res) => {
  const searchParams = req.body;

  try {
    const response = await axios({
      method: 'GET',
      url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation',
      params: {
        query:searchParams.query,
      },
      headers: {
        'X-RapidAPI-Key': '4ca097a86dmshb10708c5f832eafp15c5fajsnb40f6970a1b7',
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
