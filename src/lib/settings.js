//settings.js

async function setup(locals){
    const access_token = locals.cookies.get('khmertube_access_token')
    const response = await fetch(`${locals.apiUrl}/api/admin/setting?amount=1`,{
        method: "GET",
        headers: {
            'X-User-Header': `${access_token}`
        }
    })
    const { items } = await response.json()
    
    let setting = items[0]
    let settings = {}

    if(setting){
        settings = {
            siteTitle: setting.title,
            description: setting.description,
            dashboard: setting.dashboard,
            frontend: setting.frontend,
            categories: setting.categories,
            thumb: '',
            date: ''
        }
    }else{
        settings = {
            siteTitle: 'ដំណឹង​​ស្រុក​យើង',
            description: 'description',
            dashboard: 10,
            frontend: 20,
            categories: 20,
            thumb: '',
            date: ''
        }
    }
    
    return settings
}
 
export default setup