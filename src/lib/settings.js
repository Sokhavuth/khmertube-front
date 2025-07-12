//settings.js

async function setup(locals){
    const response = await fetch(`${locals.apiUrl}/api/setting?amount=1`)
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