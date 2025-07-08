<script>
    import Ad from "$lib/components/Ad.svelte"
    import jq from 'jquery'
    let { data } = $props()
    let posts = $state(data.latestPosts)
    const dark = 'brightness(20%)'
    const normal = 'brightness(100%)'
    const laodingVideo = 'NcQQVbioeZk'
    const pageAmount = Math.ceil(data.count/data.settings.frontend)

    const column = data.screenPosition.column
    const row = data.screenPosition.row

    function parseVideos(posts){
        let videos = []
        let thumbs = []
        for(let post of posts){
            videos.push(JSON.parse(post.videos))
            thumbs.push(post.thumb)
        }
        videos.thumbs = thumbs
        return videos
    }
    
    let latestVideos = parseVideos(data.latestPosts)
    latestVideos.category = 'latest'
    let latestMovies = parseVideos(data.postsByCategory[0])
    latestMovies.category = 'movie'
    let latestTravel = parseVideos(data.postsByCategory[1])
    latestTravel.category = 'travel'
    let latestGame = parseVideos(data.postsByCategory[2])
    latestGame.category = 'game'
    let latestSport = parseVideos(data.postsByCategory[3])
    latestSport.category = 'sport'
    let latestDoc = parseVideos(data.postsByCategory[4])
    latestDoc.category = 'doc'
    let latestDistraction = parseVideos(data.postsByCategory[5])
    latestDistraction.category = 'distraction'
    let latestMusic = parseVideos(data.postsByCategory[6])
    latestMusic.category = 'music'
    let latestFood = parseVideos(data.postsByCategory[7])
    latestFood.category = 'food'
    
    let rawPlaylist = $state({
        latest: data.latestPosts,
        movie: data.postsByCategory[0],
        travel: data.postsByCategory[1],
        game: data.postsByCategory[2],
        sport: data.postsByCategory[3],
        doc: data.postsByCategory[4],
        distraction: data.postsByCategory[5],
        music: data.postsByCategory[6],
        food: data.postsByCategory[7]
    })

    let videoPlaylists = $state({
        latest: latestVideos,
        movie: latestMovies,
        travel: latestTravel,
        game: latestGame,
        sport: latestSport,
        doc: latestDoc,
        distraction: latestDistraction,
        music: latestMusic,
        food: latestFood
    })

    let playlistThumbs = $state({
        movie: rawPlaylist['movie'][0].thumb,
        travel: rawPlaylist['travel'][0].thumb,
        game: rawPlaylist['game'][0].thumb,
        sport: rawPlaylist['sport'][0].thumb,
        doc: rawPlaylist['doc'][0].thumb,
        distraction: rawPlaylist['distraction'][0].thumb,
        music: rawPlaylist['music'][0].thumb,
        food: rawPlaylist['food'][0].thumb,
    })

    async function getRandomPlaylist(category, thumbs){
		const response = await fetch(`/post/playlist/${category}`, {
			method: 'POST',
			body: JSON.stringify({ thumbs }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const newPlaylist_ = await response.json()
        posts = newPlaylist_
        rawPlaylist[category] = newPlaylist_
        playlistThumbs[category] = newPlaylist_[0].thumb
        let newPlaylist = parseVideos(newPlaylist_)
        newPlaylist.category = category
        videoPlaylists[category] = newPlaylist
        return newPlaylist
	}

    async function newPlaylist(){
        player.unMute()
        if(player.playlist.category !== 'latest'){
            player.loadVideoById(laodingVideo)
            player.playlist = await getRandomPlaylist(player.playlist.category, player.playlist.thumbs) 
        }
        jq(`.Home .container .wrapper:nth-child(${player.part+1}) img`).css({'filter':normal})
        jq(`.Home .container .wrapper:nth-child(${player.part+1}) p`).css({'display':'none'})
        player.part = 0
        if(player.playlist[player.part][0].type === "YouTubePlaylist"){
            player.loadVideoById(initialVideoId)
            player.loadPlaylist({list:player.playlist[player.part][0].id,listType:'playlist',index:0})
        }else{
            player.index = 0
            if(!(player.playlist[player.part].reversal)){
                player.playlist[player.part].reverse()
                player.playlist[player.part].reversal = true
            }
            player.loadVideoById(player.playlist[player.part][0].id)
        }
        
        jq(`.Home .container .wrapper:nth-child(${player.part+1}) img`).css({'filter':dark})
        jq(`.Home .container .wrapper:nth-child(${player.part+1}) p`).css({'display':'block'})
    }

    function loadVideo(playlist){
        if(playlist[0][0].type === "YouTubePlaylist"){
            player.loadPlaylist({list:playlist[0][0].id,listType:'playlist',index:0})
        }else{
            playlist[0].reverse()
            playlist[0].reversal = true
            player.loadVideoById(playlist[0][0].id)
        }
        jq('.Home .container .wrapper:nth-child(1) img').css({'filter':dark})
        jq('.Home .container .wrapper:nth-child(1) p').css({'display':'block'})
    }

    function onPlayerReady(event) {
        player.part = 0
        player.index = 0
        player.thumb = 1
        player.label = 'ព័ត៌មាន'
        player.playlist = latestVideos 
        loadVideo(latestVideos )
    }

    function changeCategory(playlist, label, obj=0, thumb=0, part=0) {
        if(obj){posts = obj}
        if(label){player.label = label}
        if(playlist){player.playlist = playlist}
        if(player.playlist.category === 'latest'){
            jq(`.random-video button:nth-child(${player.thumb}) img`).css({'filter':normal})
            jq(`.random-video button:nth-child(${player.thumb}) .playing`).css({'display':'none'})
        }
        if(thumb){
            jq(`.random-video button:nth-child(${player.thumb}) img`).css({'filter':normal})
            jq(`.random-video button:nth-child(${player.thumb}) .playing`).css({'display':'none'})
            player.thumb = thumb
            jq(`.random-video button:nth-child(${player.thumb}) img`).css({'filter':dark})
            jq(`.random-video button:nth-child(${player.thumb}) .playing`).css({'display':'block'})
        }
        jq(`.Home .container .wrapper:nth-child(${player.part+1}) img`).css({'filter':normal})
        jq(`.Home .container .wrapper:nth-child(${player.part+1}) p`).css({'display':'none'})
        player.part = part
        player.unMute()
        if(player.playlist[player.part][0].type === "YouTubePlaylist"){
            player.loadVideoById(initialVideoId)
            player.loadPlaylist({list:player.playlist[player.part][0].id,listType:'playlist',index:0})
            jq('.latest-video').html(player.label)
        }else{
            if(!(player.playlist[player.part].reversal)){
                player.playlist[player.part].reverse()
                player.playlist[player.part].reversal = true
            }
            player.loadVideoById(player.playlist[player.part][0].id)
            jq('.latest-video').html(player.label)
            
        }
        jq(`.Home .container .wrapper:nth-child(${player.part+1}) img`).css({'filter':dark})
        jq(`.Home .container .wrapper:nth-child(${player.part+1}) p`).css({'display':'block'})
    }

    function onPlayerError(event){
        if(player.index + 1 < player.playlist[player.part].length){
            player.index += 1
            player.loadVideoById(player.playlist[player.part][player.index].id)
        }else{
            jq(`.Home .container .wrapper:nth-child(${player.part+1}) img`).css({'filter':normal})
            jq(`.Home .container .wrapper:nth-child(${player.part+1}) p`).css({'display':'none'})
            player.part += 1
            if(player.part === player.playlist.length){
                player.part = 0
            }

            if(player.playlist[player.part][0].type === "YouTubePlaylist"){
                player.loadVideoById(initialVideoId)
                player.loadPlaylist({list:player.playlist[player.part][0].id,listType:'playlist',index:0})
            }else{
                player.index = 0
                if(!(player.playlist[player.part].reversal)){
                    player.playlist[player.part].reverse()
                    player.playlist[player.part].reversal = true
                }
                player.loadVideoById(player.playlist[player.part][0].id)
            }
            jq(`.Home .container .wrapper:nth-child(${player.part+1}) img`).css({'filter':dark})
            jq(`.Home .container .wrapper:nth-child(${player.part+1}) p`).css({'display':'block'})
        }
    }

    async function onPlayerStateChange(event) {   
        if(event.data === YT.PlayerState.ENDED){
            if(player.index + 1 < player.playlist[player.part].length){
                player.index += 1
                player.loadVideoById(player.playlist[player.part][player.index].id)
                
            }else{
                jq(`.Home .container .wrapper:nth-child(${player.part+1}) img`).css({'filter':normal})
                jq(`.Home .container .wrapper:nth-child(${player.part+1}) p`).css({'display':'none'})
                player.part += 1
                if(player.part === player.playlist.length){
                    if(player.playlist.category !== 'latest'){
                        player.loadVideoById(laodingVideo)
                        player.playlist = await getRandomPlaylist(player.playlist.category, player.playlist.thumbs)
                    }
                    player.part = 0
                }

                if(player.playlist[player.part][0].type === "YouTubePlaylist"){
                    player.loadVideoById(initialVideoId)
                    player.loadPlaylist({list:player.playlist[player.part][0].id,listType:'playlist',index:0})
                }else{
                    player.index = 0
                    if(!(player.playlist[player.part].reversal)){
                        player.playlist[player.part].reverse()
                        player.playlist[player.part].reversal = true
                    }
                    player.loadVideoById(player.playlist[player.part][0].id)
                }
                jq(`.Home .container .wrapper:nth-child(${player.part+1}) img`).css({'filter':dark})
                jq(`.Home .container .wrapper:nth-child(${player.part+1}) p`).css({'display':'block'})
            }
        }
    }

    function nextPrevious(move){
        player.unMute()
        if(move === "next"){
            if(player.index + 1 < player.playlist[player.part].length){
                player.index += 1
                player.loadVideoById(player.playlist[player.part][player.index].id)
            }else{
                jq(`.Home .container .wrapper:nth-child(${player.part+1}) img`).css({'filter':normal})
                jq(`.Home .container .wrapper:nth-child(${player.part+1}) p`).css({'display':'none'})
                player.part += 1
                if(player.part === player.playlist.length){
                    player.part = 0
                }

                if(player.playlist[player.part][0].type === "YouTubePlaylist"){
                    player.loadVideoById(initialVideoId)
                    player.loadPlaylist({list:player.playlist[player.part][0].id,listType:'playlist',index:0})
                }else{
                    player.index = 0
                    if(!(player.playlist[player.part].reversal)){
                        player.playlist[player.part].reverse()
                        player.playlist[player.part].reversal = true
                    }
                    player.loadVideoById(player.playlist[player.part][0].id)
                }
                jq(`.Home .container .wrapper:nth-child(${player.part+1}) img`).css({'filter':dark})
                jq(`.Home .container .wrapper:nth-child(${player.part+1}) p`).css({'display':'block'})
            }
        }else if(move === "previous"){
            if(player.index > 0){
                player.index -= 1
                player.loadVideoById(player.playlist[player.part][player.index].id)
            }else{
                jq(`.Home .container .wrapper:nth-child(${player.part+1}) img`).css({'filter':normal})
                jq(`.Home .container .wrapper:nth-child(${player.part+1}) p`).css({'display':'none'})
                player.part -= 1
                if(player.part < 0){
                    player.part = player.playlist.length - 1
                }

                if(player.playlist[player.part][0].type === "YouTubePlaylist"){
                    player.loadVideoById(initialVideoId)
                    player.loadPlaylist({list:player.playlist[player.part][0].id,listType:'playlist',index:0})
                }else{
                    player.index = 0
                    if(!(player.playlist[player.part].reversal)){
                        player.playlist[player.part].reverse()
                        player.playlist[player.part].reversal = true
                    }
                    player.loadVideoById(player.playlist[player.part][0].id)
                }
                jq(`.Home .container .wrapper:nth-child(${player.part+1}) img`).css({'filter':dark})
                jq(`.Home .container .wrapper:nth-child(${player.part+1}) p`).css({'display':'block'})
            }
        }
    }

    const ytPlayerId = 'youtube-player'
    let initialVideoId = 'cdwal5Kw3Fc'
    let player

    
    function load() {
        player = new YT.Player(ytPlayerId, {
            height: '390',
            width: '640',
            videoId: initialVideoId,
            playerVars: {
                'playsinline': 1,
                "enablejsapi": 1,
                "mute": 1,
                "autoplay": 1,
                "rel": 0,
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        })
    }
        
    $effect(() => {
        window.YT.ready(function() {
            if (window.YT) {
                load()
            } else {
                window.onYouTubeIframeAPIReady = load
            }
        })
    })
</script>

<svelte:head>
    <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>


<section class="main region">
    <div class="feature-post">
        <div class="random-video">
            <button  onclick={()=>changeCategory(videoPlaylists.movie, 'ភាពយន្ត​​​', rawPlaylist.movie, 1)}>
                <img alt='' src={playlistThumbs.movie} />
                <p class="news-label">ភាពយន្ត​</p>
                <span class='playing'>កំពុង​លេង...</span>
            </button>
            <button onclick={()=>changeCategory(videoPlaylists.travel, 'ដើរ​លេង​​​​​', rawPlaylist.travel, 2)}>
                <img alt='' src={playlistThumbs.travel} />
                <p class="movies-label">ដើរ​លេង</p>
                <span class='playing'>កំពុង​លេង...</span>
            </button>
            <button onclick={()=>changeCategory(videoPlaylists.game, '​ពិភព​និម្មិត​', rawPlaylist.game, 3)}>
                <img alt='' src={playlistThumbs.game} />
                <p class="movies-label">ពិភព​និម្មិត</p>
                <span class='playing'>កំពុង​លេង...</span>
            </button>
            <button onclick={()=>changeCategory(videoPlaylists.sport, '​កីឡា​​​', rawPlaylist.sport, 4)}>
                <img alt='' src={playlistThumbs.sport} />
                <p class="movies-label">កីឡា</p>
                <span class='playing'>កំពុង​លេង...</span>
            </button>
            <button onclick={()=>changeCategory(videoPlaylists.doc, 'កំរង​ឯកសារ​​​​​', rawPlaylist.doc, 5)}>
                <img alt='' src={playlistThumbs.doc} />
                <p class="movies-label">កំរង​ឯកសារ</p>
                <span class='playing'>កំពុង​លេង...</span>
            </button>
            <button onclick={()=>changeCategory(videoPlaylists.food, 'មុខ​ម្ហូប​​​​', rawPlaylist.food, 6)}>
                <img alt='' src={playlistThumbs.food} />
                <p class="news-label">​មុខ​ម្ហូប</p>
                <span class='playing'>កំពុង​លេង...</span>
            </button>
            <button onclick={()=>changeCategory(videoPlaylists.music, 'របាំ​តន្ត្រី​​​​​', rawPlaylist.music, 7)}>
                <img alt='' src={playlistThumbs.music} />
                <p class="news-label">របាំ​តន្ត្រី</p>
                <span class='playing'>កំពុង​លេង...</span>
            </button>
            <button onclick={()=>changeCategory(videoPlaylists.distraction, 'ល្បែងកំសាន្ត​​​​', rawPlaylist.distraction, 8)}>
                <img alt='' src={playlistThumbs.distraction} />
                <p class="news-label">ល្បែងកំសាន្ត​</p>
                <span class='playing'>កំពុង​លេង...</span>
            </button>
            <div class="wrapper" style="--grid-column: {column} / span 2;--grid-row: {row} / span 2;">
                <div id={ytPlayerId}></div>
                <div class="latest-video">ព័ត៌មាន</div>
                <div class="channel-logo">
                    <img src="/images/siteLogo.png" alt=''/>
                </div>
                <div class="play-all">
                    <button onclick={()=>changeCategory(latestVideos, 'ព័ត៌មាន', data.latestPosts)} class='center'>ព័ត៌មាន</button>
                    <button onclick={()=>nextPrevious('previous')}>វីដេអូមុន</button>
                    <button onclick={newPlaylist} class='new-playlist'>ដូរ​កំរង​វីដេអូ​</button>
                    <button onclick={()=>nextPrevious('next')}>វីដេអូបន្ទាប់</button>
                </div>
            </div>
            
        </div>
    </div>
    <Ad />
</section>

<section class="Home region">
    <div class="container">
        {#each posts as post, index}
            <div class="wrapper">
                <button onclick={()=>changeCategory(false, false, false, false, index)}>
                    <img src={post.thumb} alt=''/>
                    {#if post.videos.length}
                    <img class="play-icon" src="/images/play.png" alt=''/>
                    {/if}
                    <p>កំពុង​លេង...</p>
                </button>
                <div class="date">{(new Date(post.date)).toLocaleDateString('it-IT')}</div>
                <button class="title" onclick={()=>changeCategory(false, false, false, false, index)}>
                    {post.title}
                </button>
            </div>
        {/each}
    </div>
    <div class="navigation">
        <span>ទំព័រ </span>
        <select onchange={(event)=>{document.location = `/${event.target.value}`}}>
            {#each [...Array(pageAmount).keys()] as pageNumber}
                <option>{pageNumber+1}</option>
            {/each}
        </select>
        <span> នៃ {pageAmount}</span>
    </div>
</section>

<style>
    .random-video{
        display: grid;
        grid-template-columns: calc(33.33% - 6.66px) calc(33.33% - 6.66px) calc(33.33% - 6.66px);
        grid-gap: 10px;
        padding: 10px 0 0;
    }
    .random-video .wrapper{
        grid-column: var(--grid-column);
        grid-row: var(--grid-row);
        position: relative;
        padding-top: 53%;
    }
    .random-video button{
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: 54.25%;
        border: none;
    }
    .random-video button:hover{
        cursor: pointer;
        opacity: .7;
    }
    .random-video button img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .random-video button p{
        position: absolute;
        top: 0;
        left: 0;
        background: var(--background-dark);
        color: white;
        text-align: center;
        font-family: Vidaloka, OdorMeanChey;
        padding: 5px;
        width: 90px;
    }
    .random-video button .playing{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: Vidaloka, OdorMeanChey;
        color: orange;
        display: none;
    }
    .random-video .latest-video{
        position: absolute;
        top: 5px;
        left: 10px;
        color: orange;
    }
    .random-video .channel-logo img{
        position: absolute;
        top: 5px;
        right: 5px;
        width: 6%;
    }
    .random-video .wrapper .play-all{
        position: relative;
        bottom: 7px;
        text-align: center;
        visibility: hidden;
        display: flex;
        justify-content: center;
        align-content: center;
        gap: 15px;
    }
    .random-video .wrapper .play-all button{
        color: orange;
        padding-top: 0;
        width: auto;
        background-color: transparent;
        font-family: Vidaloka, OdorMeanChey;
        border: none;
    }
    .random-video .wrapper .play-all:hover{
        cursor: pointer;
    }
    .random-video .wrapper:hover .play-all{
        visibility: visible;
    }
    .random-video .wrapper #youtube-player{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .Home .container{
        display: grid;
        grid-template-columns: repeat(4, calc(100% / 4 - 11.25px));
        grid-gap: 30px 15px;
        padding: 15px 0 30px;
    }
    .Home .container .wrapper button{
        position: relative;
        padding-top: 56.25%;
        overflow: hidden;
        width: 100%;
        top: 0;
        left: 0;
        border: none;
        text-align: left;
        background: transparent;
    }
    .Home .container .wrapper .title{
        color: var(--link);
    }
    .Home button:hover,
    .Home .container .wrapper .title:hover{
        cursor: pointer;
        opacity: .7;
    }
    .Home .container .wrapper button img{
        position: absolute;
        width: 100%;
        min-height: 100%;
        top: 0;
        left: 0;
    }
    .Home .container .wrapper button .play-icon{
        position: absolute;
        width: auto;
        min-height: auto;
        width: 15%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
    }
    .Home .container .wrapper button p{
        position: absolute;
        top: 0;
        left: 0;
        padding: 2px 5px;
        color: orange;
        font-family: Vidaloka, OdorMeanChey;
        display: none;
        animation: blink 1s steps(2) infinite;
    }
    .Home .container .wrapper .title{
        padding-top: 5px;
        font-family: Vidaloka, OdorMeanChey;
    }
    .Home .navigation{
        text-align: center;
        padding-bottom: 30px;
    }
    
    @media only screen and (max-width: 600px){
        .random-video{
            grid-template-columns: 100%;
            padding: 10px;
        }
        .random-video .wrapper{
            grid-column: 1 / span 1;
            grid-row: 1 / span 1;
            padding-top: 51.2%;
        }
        .Home .container{
            grid-template-columns: 100%;
            padding: 30px 10px;
        }
    }   
</style>