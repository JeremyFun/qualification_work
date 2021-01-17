export function withMassive(payload) {
    let arr = []
    if (payload.length > 0) {
        payload.slice(1).map(el => {
            if (el.length > 0 && el.length < 85) {
                arr.push({...el})
            }
        })
    }
    return arr
}

export function inMassive(payload) {
    let arr = []
    payload.map(el => {
        let arrEl = []
        for (let i = 0; i < 83; i++) {
            el[i] ? arrEl.push(el[i]) : arrEl.push("")
        }
        arr.push(arrEl)
    })
    return arr
}