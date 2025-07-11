import { redirect } from '@sveltejs/kit'

export async function load({ locals, params, url, cookies }){
    locals.cookies = cookies
    const user = locals.user
    if(!user){throw redirect(307, '/login')}
    const id  = params.id
    const navPage = url.searchParams.get('p')

    const settings = await locals.settings(locals)
    const access_token = cookies.get('khmertube_access_token')
    const response = await fetch(`${locals.apiUrl}/api/admin/category/edit/${id}?amount=${settings.dashboard}`,{
        method: "GET",
        headers: {
            'X-User-Header': `${access_token}`
        }
    })
    const title = 'កែប្រែ​ជំពូក'
    const { count, items, category } = await response.json()
    const pageNumber = Math.ceil(count/settings.dashboard)

    return {user, count, settings, category, items, info:"ជំពូក", type:"category", pageNumber, navPage, title}
}

export const actions = {
    update: async ({ request, locals, cookies }) => {
        if(locals.user.role !== 'Admin'){
            return { success: false, message: 'អ្នក​គ្មាន​សិទ្ធ​កែប្រែ​​ជំពូក​ទេ!' }
        }

        const data = await request.formData()

        const id = data.get('id')

        const title = data.get('label')
        const thumb = data.get("thumb")
        const date = data.get("datetime")

        const validate = (
            typeof title === 'string' && title !== '' &&
            typeof thumb === 'string' && thumb !== '' &&
            typeof date === 'string' && date !== ''
        )
        
	    if(validate){
            const category = {title, thumb, date}
            const access_token = cookies.get('khmertube_access_token')
            const response = await fetch(`${locals.apiUrl}/api/admin/category/${id}`,{
                method: "PUT",
                body: JSON.stringify(category),
                headers: {
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