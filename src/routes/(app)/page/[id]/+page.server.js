
export async function load({ locals, params, fetch, cookies }){
    locals.cookies = cookies
    const settings = await locals.settings(locals)
    const response = await fetch(`${locals.apiUrl}/api/page/${params.id}`)
    const { page, randomPosts } = await response.json()
    const thumb = page.thumb
    const title = page.title

    let pageURL
    if(page._id === '66b17b1e944f187d47506cda'){
        pageURL = 'contact'
    }else if(page._id === '66b17b48944f187d47506cdc'){
        pageURL = 'about'
    }
    
    return {page, randomPosts, settings, thumb, title, pageURL}
}