
export async function load({ locals, fetch, cookies }) {
    locals.cookies = cookies
    const settings = await locals.settings(locals)
    const response = await fetch(`${locals.apiUrl}/api?amount=${settings.frontend}`)
    const data = await response.json()

    data.settings = settings
    data.pageURL = '/'
    data.title = 'ទំព័រដើម'

    return data
}