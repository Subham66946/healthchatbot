import axios from "axios";

export const GetResponse = async (query: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/data/get-result-from-gemini?query=${query}`)
        return response.data
    } catch (e) {
        console.log(e);
    }
}