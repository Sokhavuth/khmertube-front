
export async function load({ locals, params, fetch, cookies }) {
    locals.cookies = cookies
    const settings = await locals.settings(locals)
    const category = params.category
    const page = params.page
    const response = await fetch(`${locals.apiUrl}/api/${category}/${page}?amount=${settings.categories}`)
    const { posts, count } = await response.json()
    const currentPage = parseInt(page)
    const lastPage = Math.ceil(count/settings.categories)

    const title = category
    let pageURL = ''

    if(category === 'national'){
        pageURL = 'news'
    }else if(category === 'global'){
        pageURL = 'news'
    }else if(category === 'opinion'){
        pageURL = 'opinion'
    }else if(category === 'doc'){
        pageURL = 'doc'
    }else if(category === 'sport'){
        pageURL = 'sport'
    }else if(category === 'Khmer'){
        pageURL = 'movie'
    }else if(category === 'Thai'){
        pageURL = 'movie'
    }else if(category === 'Chinese'){
        pageURL = 'movie'
    }else if(category === 'Korean'){
        pageURL = 'movie'
    }else if(category === 'world'){
        pageURL = 'movie'
    }else if(category === 'movie'){
        pageURL = 'movie'
    }else if(category === 'travel'){
        pageURL = 'travel'
    }else if(category === 'game'){
        pageURL = 'game'
    }else if(category === 'food'){
        pageURL = 'entertainment'
    }else if(category === 'music'){
        pageURL = 'entertainment'
    }else if(category === 'distraction'){
        pageURL = 'entertainment'
    }else if(category === 'Node.js'){
        pageURL = 'web'
    }else if(category === 'Python'){
        pageURL = 'web'
    }

    return {posts, count, category, settings, currentPage, lastPage, pageURL, title}
}