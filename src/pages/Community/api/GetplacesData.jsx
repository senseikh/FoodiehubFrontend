import axios from 'axios'


const GetPlacesData = async (type,ne, sw) => {

  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary` ;

  const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'a32ece8216msh6f68f09e87df514p1f9e3bjsnc5ff81c4de77',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      }
  };
  const params = {
      bl_latitude: sw.lat,
      tr_latitude: ne.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
  }
 
  try {
    const { data : {data} } = await axios.request(URL, {...options, params});
    
    return data ;
  } catch (error) {
    console.error(error);
  }
}

export default GetPlacesData ;