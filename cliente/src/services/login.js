import axios from "axios"

const loginService = async (credentials) => {
    try {
        document.querySelector('.bounce-loader').classList.add('active');
        const {data} = await axios.post('/api/login',{...credentials})
        window.localStorage.setItem(
            "loggedUser", JSON.stringify(data)                  
        )
                   
        document.querySelector('.bounce-loader').classList.remove('active');
        return data
    }
    catch(error) {
        document.querySelector('.bounce-loader').classList.remove('active');
        return 'Dirección de correo y/o contraseña incorrectos.'
    }
}

export default loginService