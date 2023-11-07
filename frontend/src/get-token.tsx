import axios from "axios";

export const getToken = async () => {
    const options = {
        method: 'POST',
        url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.REACT_APP_AUTH0_M2M_CLIENT_ID!,
            client_secret: process.env.REACT_APP_AUTH0_M2M_CLIENT_SECRET!,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE!
        })
    }
      
    try {
        const response = await axios.request(options)
        return response.data['access_token']
    } catch (e) {
        console.log(e)
        return ''
    }
}
