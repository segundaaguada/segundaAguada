import axios from 'axios'

const deleteImage = async (id) => {

    document.querySelector('.bounce-loader').classList.add('active');

    const user = JSON.parse(localStorage.getItem('loggedUser'))

    try {
        
        const response = await axios.delete(`/api/images/${id}`, {
            headers: { 
                Authorization: `Bearer ${user.token}`
            },
        })

        document.querySelector('.bounce-loader').classList.remove('active');
        
        return response
    }
    catch (error) {
        document.querySelector('.bounce-loader').classList.remove('active');
        console.log(error)
        return error
    }
}

export default deleteImage