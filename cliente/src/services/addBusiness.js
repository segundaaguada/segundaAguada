import axios from "axios"

const addBusiness = async (businessData) =>{

    document.querySelector('.bounce-loader').classList.add('active');

    const user = JSON.parse(localStorage.getItem('loggedUser'))

    try{
        const response = await axios.post("/api/bussines", businessData,
            {
                headers: { 
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data' 
                },
            },
            {
                "image": businessData.image
            },
        )

        document.querySelector('.bounce-loader').classList.remove('active');
    
        return response 
    }catch(e){
        document.querySelector('.bounce-loader').classList.remove('active');
        console.log(e)
        return e
    }
  
}

export default addBusiness