import { redirect } from '@sveltejs/kit'

export async function load({ locals, url, cookies }){
    locals.cookies = cookies
    const user = locals.user
    if(!user){throw redirect(307, '/login')}

    const settings = await locals.settings(locals)
    const access_token = cookies.get('khmertube_access_token')
    const response = await fetch(`${locals.apiUrl}/api/admin/page?amount=${settings.dashboard}`,{
        method: "GET",
        headers: {
            'X-User-Header': `${access_token}`
        }
    })
    const { count, items } = await response.json()
    const pageNumber = Math.ceil(count/settings.dashboard)
    const delObj = { success: url.searchParams.get('success'), type: url.searchParams.get('type') }
    const title = 'ទំព័រ​ស្តាទិក'

    return { user, count, settings, items, info:"ទំព័រ​ស្តាទិក", type:"page", pageNumber, delObj, title }
}

export const actions = {
	create: async ({ request, locals, cookies }) => {
        if(locals.user.role !== 'Admin'){
            return { success: false, message: 'អ្នក​គ្មាន​សិទ្ធ​បង្កើត​ទំព័រ​ស្តាទិក​​ទេ!' }
        }

		const data = await request.formData()
        
        const title = data.get('title')
        const content = data.get('content')
        const thumb = data.get("thumb")
        const date = data.get("datetime")

        const validate = (
            typeof title === 'string' && title !== '' &&
            typeof content === 'string' && content !== '' &&
            typeof thumb === 'string' && thumb !== '' &&
            typeof date === 'string' && date !== ''
        )
        
		if(validate){
            const page = {title, content, thumb, date}
            const access_token = cookies.get('khmertube_access_token')
            const option = {
			    method: 'POST',
			    body: JSON.stringify(page),
			    headers: { 
                    'Content-Type': 'application/json',
                    'X-User-Header': `${access_token}`
                }
		    }
            const response = await fetch(`${locals.apiUrl}/api/admin/page`, option)
            if(response.ok){
                return { success: true, message: 'ទំព័រ​ស្តាទិក​​មួយ​ត្រូវ​បាន​បង្កើត​ឡើង!' }
            }
        }else{
            return { success: false, message: "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!" }
        }
	}
}