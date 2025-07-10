
import { redirect } from '@sveltejs/kit'

export const actions = {
	default: async ({ cookies, request, locals, fetch }) => {
		const data = await request.formData()

        const email = data.get('email')
        const password = data.get('password')

        const response = await fetch(`${locals.apiUrl}/api/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' }
        })
        const { user, message, access_token } = await response.json()
        cookies.set('khmertube_access_token', access_token, { path: '/' })
        if(user){redirect(303, '/admin')}
        return { message }
	}
}

export async function load({ locals }) {
    //await userDb.createRootUser(locals)
    const title = 'login'
    return { title }
}