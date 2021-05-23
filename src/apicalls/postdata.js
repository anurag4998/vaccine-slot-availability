import axios from "axios";

const postData = async(district,vaccine,email,dose,ageGroup) =>{

    
    try{
            await axios.post("https://anurag-vacslot.herokuapp.com/register",
            {
                district,
                vaccine,
                email,
                dose,
                ageGroup
            },
            {
                headers: {
                    "content-type": "application/json"
                },
            }); 
    
            return true;
        }
        catch(error)   
        {
            if(error.response.status === 409)
                    return { response: false, error: "Email-Id already registered" };
        }
    }
   
    
    


export default postData;