import { api } from "./api";



export const getInfoData = async (params: any) => {
    const response = await api.get(`api/alertcity?${params}`);
    return response.data
}