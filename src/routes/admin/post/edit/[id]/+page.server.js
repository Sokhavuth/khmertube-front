import { redirect } from '@sveltejs/kit'

export async function load({ params, locals, url, cookies }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}
    const id  = params.id
    const navPage = url.searchParams.get('p') || 1

    const settings = await locals.settings(locals)
    const access_token = cookies.get('khmertube_access_token')
    const response = await fetch(`${locals.apiUrl}/api/admin/post/edit/${id}?amount=${settings.dashboard}&page=${navPage}`, {
        method: "GET",
        headers: {
            'X-User-Header': `${access_token}`
        }
    })
    const { count, post, items, categories } = await response.json()
    const pageNumber = Math.ceil(count/settings.dashboard)
    const title = 'កែប្រែ​ការផ្សាយ'
    

    return {user, count, settings, title, post, items, categories, info:"ការផ្សាយ", type:"post", pageNumber, navPage}
}

export const actions = {
    update: async ({ request, locals, cookies, url }) => {
        const settings = await locals.settings(locals)
        const data = await request.formData()

        const id = data.get('id')
        const navPage = url.searchParams.get('p') || 1

        if(locals.user.role !== 'Admin'){
            if(data.get('author') !== locals.user.id){
                return { success: false, message: 'អ្នក​មិន​អាច​កែប្រែ​ការផ្សាយ​របស់អ្នក​ដទៃ​បាន​ឡើយ!' }
            }
        }

        const title = data.get('title')
        const content = data.get('content')
        const categories = data.get('categories')
        const thumb = data.get("thumb")
        const date = data.get("datetime")
        const videos = data.get("videos")

        const validate = (
            typeof title === 'string' && title !== '' &&
            typeof content === 'string' &&
            typeof categories === 'string' && categories !== '' &&
            typeof thumb === 'string' && thumb !== '' &&
            typeof date === 'string' && date !== '' &&
            typeof videos === 'string'
        )
        
	    if(validate){
            const body = {title, content, categories, thumb, date, videos}
            const access_token = cookies.get('khmertube_access_token')
            const response = await fetch(`${locals.apiUrl}/api/admin/post/edit/${id}?amount=${settings.dashboard}&page=${navPage}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-Header': `${access_token}`
                }
            })
            if(response.ok){
                return { success: true, message: 'ការ​កែប្រែ​​សំរេច​បាន​ដោយ​ជោគជ័យ' }
            }else{
                return { success: false, message: "អ្នក​មិន​អាច​កែប្រែ​​ការផ្សាយ​របស់​អ្នក​ផ្សេង​​បាន​​ឡើយ!" }
            }
        }else{
            return { success: false, message: "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!" }
        }
    }
}