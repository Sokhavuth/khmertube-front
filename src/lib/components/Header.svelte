<script>
    let { data } = $props()
    let date = new Date()
    let datetime = $state('')

    var i = 0
    function move() {
        if (i == 0) {
            i = 1
            var elem = document.getElementById("myBar")
            var width = 1
            var id = setInterval(frame, 10)
            function frame() {
                if (width >= 100) {
                clearInterval(id)
                i = 0
                } else {
                    width++;
                    elem.style.width = width + "%"
                }
            }
        }
    }
    
    $effect(()=>{
        move()
    })

    function startTime() {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        datetime =  h + ":" + m + ":" + s;
        setTimeout(startTime, 1000);
    }

    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }

    $effect(() => (
        startTime()
    ))
</script>

<div id="myProgress">
  <div id="myBar"></div>
</div>
<header>
    <div class="inner region">
        <div class="date">
            <span>
                <p>{ date.toLocaleDateString('it-IT') }</p>
                <p>{ datetime }</p>
            </span>
        </div>
        <div class='title-wrapper'>
            <a class="title" href='/' aria-label="title">
                <h1>{ data.settings.siteTitle }</h1>
            </a>
        </div>
        <form class="search" method="post" action="/search?/search">
            <input type="text" name="q" placeholder="Search..." required />
            <input type="submit" value="ស្វែង​រក" />
        </form>
    </div>
</header>

<style>
    #myProgress {
        width: 100%;
        background-color: transparent;
    }
    #myBar {
        width: 1%;
        height: 5px;
        background-color: var(--color);
    }
    header{
        border-bottom: 5px solid var(--color);
    }
    header .inner{
        display: grid;
        grid-template-columns: 25% auto 25%;
        align-items: center;
        padding: 30px 0;
    }
    header .inner .date span{
        text-align: center;
        width:auto;
    }
    header .inner .title{
        text-align: center;
        color: rgb(88, 88, 88);
        font-family: Moul;
        font-size: 25px;
    }
    header .inner .search{
        text-align: right;
        display: grid;
        grid-template-columns: auto 25%;
    }
    header .inner .search input{
        font-family: Vidaloka, OdorMeanChey;
        padding: 1px 5px;
    }

    @media only screen and (max-width: 600px){
        header .inner{
            grid-template-columns: 100%;
            padding: 30px 10px;
            grid-gap: 20px;
        }
        header .inner .date{
            text-align: center;
        }
    }
</style>