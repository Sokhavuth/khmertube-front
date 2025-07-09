
const mode = import.meta.env.MODE
import settings from "$lib/settings.js"
//
export async function handle({ event, resolve  }) {
    if(mode === "development"){
        event.locals.apiUrl = 'http://localhost:8000'
    }else{
        event.locals.apiUrl = 'https://khmertube-api.deno.dev'
    }
    event.locals.settings = settings

    if(event.url.pathname.includes('/admin')||event.url.pathname.includes('/post/')){
        const token = event.cookies.get('khmertube_access_token')
        if(token){
            const response = await event.fetch(`${event.locals.apiUrl}/api/session/${token}`)
            const { user } = await response.json()
            if(user){
                event.locals.user = user
            }else{
                console.log('No user found!')
            }
        }
    }

    return await resolve(event)
}