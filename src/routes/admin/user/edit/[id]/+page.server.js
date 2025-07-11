import { redirect } from '@sveltejs/kit'

export async function load({ locals, params, url, cookies }){
    locals.cookies = cookies
    const user = locals.user
    if(!user){throw redirect(307, '/login')}

    const id = params.id
    const navPage = url.searchParams.get('p')
    const settings = await locals.settings(locals)
    const access_token = cookies.get('khmertube_access_token')
    const response = await fetch(`${locals.apiUrl}/api/admin/user/edit/${id}?amount=${settings.dashboard}&page=${navPage}`, {
        method: "GET",
        headers: {
            'X-User-Header': `${access_token}`
        }
    })
    const { count, author, items } = await response.json()
    const pageNumber = Math.ceil(count/settings.dashboard)
    const title = "កែប្រែ​អ្នក​និពន្ធ"

    return {user, count, settings, author, items, info:"អ្នក​និពន្ធ", type:"user", pageNumber, navPage, title}
}

export const actions = {
    update: async ({ request, locals, cookies }) => {
        
        if(locals.user.role !== 'Admin'){
            return { success: false, message: 'អ្នក​គ្មាន​សិទ្ធ​កែប្រែ​អ្នក​និពន្ធ​​​ទេ!' }
        }
        const data = await request.formData()

        const id = data.get('id')

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
            const response = await fetch(`${locals.apiUrl}/api/admin/user/edit/${id}`, {
                method: "PUT",
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-Header': `${access_token}`
                }
            })
            if(response.ok){
                return { success: true, message: 'ការ​កែប្រែ​​សំរេច​បាន​ដោយ​ជោគជ័យ' }
            }
        }else{
            return { success: false, message: "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!" }
        }
    }
}