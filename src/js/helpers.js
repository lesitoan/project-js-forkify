
export const timeOut = async (time) => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject('Time over !!!!!!!!!!!!!');
        }, time * 1000)
    })
}

export const callApi = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`${data.message} (${res.status})`);
        }
        return data;
    } catch (e) {
        throw e;
    }
}

export const postApi = async (url, uploadData) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`${data.message} (${res.status})`);
        }
        return data;
    } catch (e) {
        console.log('dsdsd')
        throw e;
    }
}

