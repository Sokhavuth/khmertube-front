<script>
    let { data } = $props()
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
</script>

<div id="myProgress">
  <div id="myBar"></div>
</div>
<header>
    <div class="inner region">
        <div class="logo">
            <a href="/admin">
                <img src="/images/siteLogo.png" alt='' />
            </a>
            <div class='title-wrapper'>
                <a class="title" href='/admin' aria-label="title">
                    <h1>ផ្នែក​គ្រប់គ្រង</h1>
                </a>
            </div>
        </div>
        
        <form class="search" method="post" action="/admin/search?/search">
            <input type="text" name="q" placeholder="Search..." required />
            <input type="submit" value="ស្វែង​រក" />
        </form>

        <div class="logout">
            <span>{data.user.name}</span> | <a href="/">ទំព័រ​មុខ</a> | <a href="/admin/logout">ចេញ​ក្រៅ</a>
        </div>
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
        grid-template-columns: 35% auto 25%;
        align-items: center;
        padding: 30px 0;
    }
    header .inner .logo{
        display: grid;
        grid-template-columns: 50px auto;
        grid-gap: 10px;
        align-items: center;
    }
    header .inner .logo img{
        width: 100%;
    }
    header .inner .title{
        text-align: left;
        color: rgb(88, 88, 88);
        font-family: Moul;
        font-size: 25px;
    }
    header .inner .search{
        text-align: center;
        display: grid;
        grid-template-columns: auto 80px;
    }
    header .inner .search input{
        font-family: Vidaloka, OdorMeanChey;
        padding: 1px 5px;
    }
    header .inner .logout{
        text-align: right;
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