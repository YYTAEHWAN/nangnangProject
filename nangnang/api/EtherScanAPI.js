import axios from "axios";

const EtherScanAPI = axios.create({
    baseURL: 'https://api.etherscan.io/api',
    headers: {
        'Content-Type' : 'application/json',
    },
})

export default EtherScanAPI;