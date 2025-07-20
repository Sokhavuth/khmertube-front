
export async function load({ locals, fetch, cookies }) {
    locals.cookies = cookies
    const settings = await locals.settings(locals)
    const response = await fetch(`${locals.apiUrl}/api?amount=${settings.frontend}`)
    const data = await response.json()
/*
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const token = cookies.get('screen_position')
    let screenPosition = {column: getRandomIntInclusive(1, 2), row: getRandomIntInclusive(1, 3)}
    
    if(!token){
        cookies.set('screen_position', JSON.stringify(screenPosition), { path: '/' })
    }else{
        while(true){
            const column = getRandomIntInclusive(1, 2)
            const row = getRandomIntInclusive(1, 3)
            if((column !== JSON.parse(token).column) || (row !== JSON.parse(token).row)){
                screenPosition.column = column
                screenPosition.row = row
                cookies.set('screen_position', JSON.stringify(screenPosition), { path: '/' })
                break
            }
            continue
        }
    }
*/
    data.settings = settings
    data.pageURL = '/'
    data.title = 'ទំព័រដើម'
    //data.screenPosition = screenPosition

    return data
}