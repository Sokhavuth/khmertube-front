<script>
    let { data } = $props()
</script>

<section class="Category region" data-sveltekit-reload>
    <div class="container">
        {#each data.posts as item}
            <div class="wrapper">
                <a href="/post/{item.id}">
                    <img src={item.thumb} alt=''/>
                    <img class="play-icon" src="/images/play.png" alt=''/>
                </a>
                <div class="date">{(new Date(item.date)).toLocaleDateString("it-IT")}</div>
                <a class="title" href="/post/{item.id}">
                    <div >{item.title}</div>
                </a>
            </div>
        {/each}
    </div>
</section>

<style>
.Category .container{
    display: grid;
    grid-template-columns: repeat(4, calc(100% / 4 - 11.25px));
    grid-gap: 30px 15px;
    padding: 15px 0 30px;
}
.Category .container .wrapper a{
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    width: 100%;
    display: block;
}
.Category .container .wrapper a img{
    position: absolute;
    width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
}
.Category .container .wrapper a .play-icon{
    width: auto;
    min-height: auto;
    width: 15%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
.Category .container .wrapper .title{
    padding-top: 0;
    color: black;
}

@media only screen and (max-width:600px){
    .Category .container{
        grid-template-columns: 100%;
        padding: 30px 10px;
    }
}
</style>
