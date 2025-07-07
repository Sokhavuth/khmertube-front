//import prisma from '$lib/db/prisma.js'
//import sessionDb from '$lib/db/session.js'
//import jwt from "jsonwebtoken"
const mode = import.meta.env.MODE
import settings from "$lib/settings.js"

export async function handle({ event, resolve }) {
    if(mode === "development"){
        event.locals.apiUrl = 'http://localhost:8000'
    }else{
        event.locals.apiUrl = 'https://khmertube-api.deno.dev'
    }
    event.locals.settings = settings

    if(event.url.pathname.includes('/admin')||event.url.pathname.includes('/post/')){
        const token = event.cookies.get('khmertube_access_token')
        if(token) {
            try{
                const session = true //await sessionDb.getSession(event.locals, token)
                if(session){
                    const user = jwt.verify(session.jwt, SECRET_KEY)
                    event.locals.user = user
                }else{
                    console.log('jwt is expired!')
                }
                return await resolve(event)
            }catch(err){
                console.log(err)
                return await resolve(event)
            }
        }
    }

    return await resolve(event)
}