export const useAPI = () => {
    const get_endpoint = (end_point: string) => {
        const api_url = 'http://127.0.0.1:5000/api/v1/'

        return api_url + end_point
    }

    const get = async (end_point: string, token: string) => {
        const response = await fetch(get_endpoint(end_point), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

        if (response.ok) {
            const data = await response.json()

            return data
        }
        else {
            return false
        }

    }

    const post = async (end_point: string, token: string, body: string) => {
        const response = await fetch(get_endpoint(end_point), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: body
        })

        if (response.ok) {
            const data = await response.json()

            return data
        }
        else {
            return false
        }

    }

    const put = async (end_point: string, token: string, body: string) => {

        const response = await fetch(get_endpoint(end_point), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: body
        })

        if (response.ok) {
            const data = await response.json()

            return data
        }
        else {
            return false
        }

    }

    const delet = async (end_point: string, token: string) => {
        const response = await fetch(get_endpoint(end_point), {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })

        if (response.ok) {
            const data = await response.json()

            return data
        }
        else {
            return false
        }

    }


    return {
        get_endpoint,
        get,
        post,
        put,
        delet
    }
}