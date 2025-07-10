import { redirect } from '@sveltejs/kit'

export async function load({ locals, url, fetch, cookies }) {
    const user = locals.user
    if(!user){throw redirect(307, '/login')}
    const settings = await locals.settings(locals)
    const access_token = cookies.get('khmertube_access_token')
    const response = await fetch(`${locals.apiUrl}/api/admin/post?amount=${settings.dashboard}`,{
        method: "GET",
        headers: {
            'X-User-Header': `${access_token}`  // Or 'Authorization': 'Bearer YOUR_API_KEY'
        }
    })
    const { count, items, categories } = await response.json()
    const pageNumber = Math.ceil(count/settings.dashboard)
    const delObj = { success: url.searchParams.get('success'), type: url.searchParams.get('type') }
    const title = 'ទំព័រ​ការផ្សាយ'

    return { user, count, settings, items, categories, title, info:"ការផ្សាយ", type:"post", pageNumber, delObj }
}

export const actions = {
	create: async ({ request, locals, cookies }) => {
        const settings = await locals.settings(locals)
		const data = await request.formData()
        
        const title = data.get('title')
        const content = data.get('content')
        const categories = data.get('categories')
        const thumb = data.get("thumb")
        const date = data.get("datetime")
        const videos = data.get("videos")
        const author = locals.user.id

        const validate = (
            typeof title === 'string' && title !== '' &&
            typeof content === 'string' &&
            typeof categories === 'string' && categories !== '' &&
            typeof thumb === 'string' && thumb !== '' &&
            typeof date === 'string' && date !== '' &&
            typeof videos === 'string' &&
            typeof author === 'string' && author !== ''
        )
        
		if(validate){
            const body = {title, content, categories, thumb, date, videos, author}
            const access_token = cookies.get('khmertube_access_token')
            const option = {
			    method: 'POST',
			    body: JSON.stringify(body),
			    headers: { 
                    'Content-Type': 'application/json',
                    'X-User-Header': `${access_token}`
                }
		    }
            const response = await fetch(`${locals.apiUrl}/api/admin/post`, option)
            if(response.ok){
                return {success: true, message: 'ការផ្សាយ​មួយ​ត្រូវ​បាន​បង្កើត​ឡើង'}
            }
        }else{
            return {success: false, message: "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!"}
        }
	}
}