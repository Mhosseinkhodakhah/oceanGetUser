



export default class interConnection {
    async reqto() {
        let data = {}
        const rawResponse = await fetch(`${process.env.content}/interservice/`, {
            method: 'GET',
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const response = await rawResponse.json()
        return response;
    }

    async getLessons() {
        const rawResponse = await fetch(`http://localhost:5003/app/interservice/get-data-for-headers`, {
            method: 'GET',
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
        })

        const response = await rawResponse.json()
        return response;
    }

    
}