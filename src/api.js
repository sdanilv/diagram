import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://application0.impulse.ottry.com/api/",
    headers: {
        Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1ZjJiY2E1ZjJhNmM2MzMwMjI3NTE5ZmMiLCJpYXQiOjE1OTY3MTc4OTcsImV4cCI6MTYwMjI0NzQ5N30.G6amFIw2pBWGyn3DXd-sX8voSgg93ogjdfVVEwltvKJfliDn5GsL77z3A5o85jMRsD55RqFtVrjMhHrnZ11MKA",
    }
});

export const getEndpoints = async () => {
    const response = await axiosInstance.get("users/5f2bca5f2a6c6330227519fc/pageImpulseIdProjections?page=0&size=100&sort=id%2Cdesc&status=4");
    return response.data.content
};

export const getImpulse = async (id) => {
    const response = await axiosInstance.get(`/impulses/search/findById?id=${id}`);
    return response.data
};

export const fetchDiagramDate = async () =>{
    const {data} = await axios.get("http://localhost:3004/impulses");
    return data.map( a => ({date:a.date, sum:+a.sum, count:+a.count}))
};