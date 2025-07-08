import { redirect } from '@sveltejs/kit'

export function GET({ cookies }){
    cookies.delete("khmertube_access_token", { path: "/" })
    redirect(307, '/login')
}