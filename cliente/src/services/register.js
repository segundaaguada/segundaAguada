import axios from "axios"

const registerService = async (inputData) =>{

    document.querySelector('.bounce-loader').classList.add('active');

    try{
        const response = await axios.post("/api/users",inputData)

        document.querySelector('.bounce-loader').classList.remove('active');
    
        return response 
    }catch(e){
        document.querySelector('.bounce-loader').classList.remove('active');
        console.log(e)
        return e
    }
  
}

export default registerService