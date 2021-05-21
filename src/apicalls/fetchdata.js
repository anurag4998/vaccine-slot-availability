import axios from "axios";
let result = [];

let data = 
     {
        district: '512',
        email: '',
        vaccine : 'covishield'
      }

const fetchdata = async() =>
{
    let a = await axios.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=622&date=19-05-2021") ;
    a = a.data.centers;
    for(let i = 0; i < a.length; i++)
    {
      
       let slots =  a[i].sessions.filter(x =>
           x.available_capacity > 0 && x.vaccine.toLowerCase() === data.vaccine)

      if(slots.length > 0)
      {
            delete a[i].sessions;
            result.push({...a[i],slots})
      }
           
        
               
    }
    
}

fetchdata();
export default result;