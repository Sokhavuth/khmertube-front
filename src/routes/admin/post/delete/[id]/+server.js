import { redirect } from '@sveltejs/kit'

export async function GET({ locals, params, cookies }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}
    
    const access_token = cookies.get('khmertube_access_token')
    const response = await fetch(`${locals.apiUrl}/api/admin/post/delete/${params.id}`,{
        method: "DELETE",
        headers: {
            'X-User-Header': `${access_token}` 
        }
    })
    
    if(response.ok){
        redirect(307, '/admin/post?success=yes&type=post')
    }else{
        redirect(307, `/admin/post?success=no&type=post`)
    }
}