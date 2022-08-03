import axios from "axios"

const addNews = async (newsData) =>{

    document.querySelector('.bounce-loader').classList.add('active');

    const user = JSON.parse(localStorage.getItem('loggedUser'))

    try {
        const response = await axios.post("/api/news", newsData, 
            {
                headers: { 
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data' 
                },
            },
            {
                "image": newsData.image
            },
        )

        document.querySelector('.bounce-loader').classList.remove('active');
        
        return response

    }
    catch (error) {
        document.querySelector('.bounce-loader').classList.remove('active');
        console.log(error)
        return error
    }
  
}

export default addNews