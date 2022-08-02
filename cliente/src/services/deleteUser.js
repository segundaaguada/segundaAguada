import axios from 'axios'

const deleteUser = async (id) => {

    const user = JSON.parse(localStorage.getItem('loggedUser'))

    try {
        
        const response = await axios.delete(`/api/users/${id}`, {
            headers: { 
                Authorization: `Bearer ${user.token}`
            },
        })

        return response
    }
    catch (error) {
        console.log(error)
    }
}

export default deleteUser