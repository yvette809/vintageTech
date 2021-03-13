import url from './URL'

// helper functions
export function featuredProducts(data) {
    return data.filter(item => (
        item.featured === true
    ))
}


//flatten
export function flattenProducts(data) {
    return data.map(item => {

        // for cloudinary
        let image = item.image.url
        return { ...item, image }
    })
}

// export function flattenProducts(data) {
//     return data.map(item => {

//         // local setup no deployment
//         let image = `${url}${item.image.url}`
//         return { ...item, image }
//     })
// }