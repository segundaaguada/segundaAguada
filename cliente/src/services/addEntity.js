import axios from "axios"

const addEntity = async (entityData) =>{

    document.querySelector('.bounce-loader').classList.add('active');

    const user = JSON.parse(localStorage.getItem('loggedUser'))

    try{
        const response = await axios.post("/api/associations", entityData,
            {
                headers: { 
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data' 
                },
            },
            {
                "image": entityData.image
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

export default addEntity