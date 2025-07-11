
export async function load({ locals, params, fetch, cookies }){
    const id = params.id
    const user = locals?.user
    locals.cookies = cookies
    const settings = await locals.settings(locals)
    const response = await fetch(`${locals.apiUrl}/api/post/${id}`)
    const { post } = await response.json()
    const authorId = post.author
    const response2 = await fetch(`${locals.apiUrl}/api/user/${authorId}`)
    const { author } = await response2.json()
    const authorName = author.title
    const response3 = await fetch(`${locals.apiUrl}/api/post/${id}?amount=7`)
    const { randomPosts } = await response3.json()
    const thumb = post.thumb
    const title = post.title
    
    return {post, user, authorName, randomPosts, settings, thumb, title}
}