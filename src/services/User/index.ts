import axios from "axios"
export const loginUserData=async (FormData:any)=>{
    try {    
        const response=await axios.post("/api/user/login",JSON.stringify(FormData)) 
        return response.data
    } catch (e:any) {
        console.log("error",e)
    }
}

export const registerNewUser=async (FormData:any)=>{

    try {
        const response=await axios.post("/api/user/register",JSON.stringify(FormData)) 
        return response?.data
    } catch (e:any) {
        console.log("error",e)
    }
}