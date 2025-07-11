import { redirect } from '@sveltejs/kit'

export async function load({ locals, url, cookies }){
    locals.cookies = cookies
    const user = locals.user
    if(!user){throw redirect(307, '/login')}

    const settings = await locals.settings(locals)
    const delObj = { success: url.searchParams.get('success'), type: url.searchParams.get('type') }
    const access_token = cookies.get('khmertube_access_token')
    const response = await fetch(`${locals.apiUrl}/api/admin/user?amount=${settings.dashboard}`,{
        method: "GET",
        headers: {
            'X-User-Header': `${access_token}`
        }
    })
    const { count, items } = await response.json()
    const pageNumber = Math.ceil(count/settings.dashboard)
    const title = "ទំព័រ​អ្នក​និពន្ធ"
    
    return {user, count, settings, items, info:"អ្នក​និពន្ធ", type:"user", pageNumber, delObj, title}
}

export const actions = {
	create: async ({ request, locals, cookies }) => {
        if(locals.user.role !== 'Admin'){
            return { success: false, message: 'អ្នក​គ្មាន​សិទ្ធ​ចុះ​ឈ្មោះ​អ្នក​និពន្ធ​​​ទេ!' }
        }

		const data = await request.formData()
        
        const title = data.get('title')
        const content = data.get('content')
        const role = data.get('role')
        const email = data.get('email')
        const password = data.get('password')
        const thumb = data.get("thumb")
        const date = data.get("datetime")

        const validate = (
            typeof title === 'string' && title !== '' &&
            typeof content === 'string' &&
            typeof role === 'string' && role !== '' &&
            typeof email === 'string' && email !== '' &&
            typeof password === 'string' && password !== '' &&
            typeof thumb === 'string' && thumb !== '' &&
            typeof date === 'string' && date !== ''
        )
        
		if(validate){
            const user = {title, content, role, email, password, thumb, date}
            const access_token = cookies.get('khmertube_access_token')
            const option = {
			    method: 'POST',
			    body: JSON.stringify(user),
			    headers: { 
                    'Content-Type': 'application/json',
                    'X-User-Header': `${access_token}`
                }
		    }
            const response = await fetch(`${locals.apiUrl}/api/admin/user`, option)
            if(response.ok){
                return { success: true, message: 'អ្នក​និព្ធ​ម្នាក់​ត្រូវ​បាន​ចុះ​ឈ្មោះ​!' }
            }
        }else{
            return { success: false, message: "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!" }
        }
	}
}