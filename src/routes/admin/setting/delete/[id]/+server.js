import { redirect } from '@sveltejs/kit'

export async function GET({ locals, params, cookies }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}
    let response = {}
    if(user.role === 'Admin'){
        const access_token = cookies.get('khmertube_access_token')
        response = await fetch(`${locals.apiUrl}/api/admin/setting/delete/${params.id}`,{
            method: "DELETE",
            headers: {
                'X-User-Header': `${access_token}` 
            }
        })
    }
    
    if(response.ok){
        redirect(307, '/admin/setting?success=yes&type=setting')
    }else{
        redirect(307, `/admin/setting?success=no&type=setting`)
    } 
}