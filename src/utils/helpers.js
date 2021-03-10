// helper functions
export function featuredProducts (data){
    return data.filter(item=>(
        item.featured=== true
    ))
}