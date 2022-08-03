import axios from 'axios'

const deleteNews = async (id, newData) => {

    document.querySelector('.bounce-loader').classList.add('active');
    const user = JSON.parse(localStorage.getItem('loggedUser'))

    try {
       
        const response = await axios.put(`/api/news/${id}`, newData, {
            headers: { 
                Authorization: `Bearer ${user.token}`
            },
        })
        document.querySelector('.bounce-loader').classList.remove('active');
        
        return response
    }
    catch (error) {
        console.log(error)
        document.querySelector('.bounce-loader').classList.remove('active');
    }
}

export default deleteNews