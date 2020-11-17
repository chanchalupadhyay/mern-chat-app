import axios from "axios"

const URL = "http://localhost:2000";

const config1 = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
}

const userRegistration = async (registrationUserData) => {
    const { data } = await axios.post(`${URL}/register`, registrationUserData)
    console.log(data)
    return data.status
}



const userLogin = async (userInputData) => {
    const { data } = await axios.post(`${URL}/login`, userInputData, config1)

    console.log(data)
    return data
}

const userLogOut = async () => {
    const { data } = await axios.get(`${URL}/logout`, { withCredentials: true })
    console.log("data from logout=", data)
    return data
}

const checkRefreshToken = async () => {
    const { data } = await axios.get(`${URL}/refresh_token`, { withCredentials: true })
    console.log("data from refreshtoken API==", data)
    return data
}




export default { userRegistration, userLogin, checkRefreshToken, userLogOut } 