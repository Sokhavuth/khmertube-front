import { redirect } from '@sveltejs/kit'

export async function GET({ locals, params, cookies }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}

    if(locals.user.role !== 'Admin'){
        redirect(307, '/admin/category?success=no&type=category')
    }
    
    const id = params.id
    const access_token = cookies.get('khmertube_access_token')
    const response = await fetch(`${locals.apiUrl}/api/admin/category/delete/${id}`,{
        method: "DELETE",
        headers: {
            'X-User-Header': `${access_token}`
        }
    })
    if(response.ok){
        redirect(307, '/admin/category?success=yes&type=category')
    }
}