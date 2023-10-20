
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

