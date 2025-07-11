import { redirect } from '@sveltejs/kit'

export async function GET({ locals, params, cookies }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}
    let response = {}
    if(user.role === 'Admin'){
        const access_token = cookies.get('khmertube_access_token')
        response = await fetch(`${locals.apiUrl}/api/admin/user/delete/${params.id}`,{
            method: "DELETE",
            headers: {
                'X-User-Header': `${access_token}` 
            }
        })
    }
    
    if(response.ok){
        redirect(307, '/admin/user?success=yes&type=user')
    }else{
        redirect(307, `/admin/user?success=no&type=user`)
    } 
}