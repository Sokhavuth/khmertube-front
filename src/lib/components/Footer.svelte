<!--src/layouts/Footer.svelte-->
<section class="Footer">
    <footer class="wrapper">
        <p class="login"><a href="/admin">ចូល​ក្នុង</a> | <a href="/admin/user">ចុះ​ឈ្មោះ</a></p>
        <p>Copyright &copy;2025 Khmer Web</p>
        <p>Powered by <a target="_blank" href="https://kit.svelte.dev/">Sveltekit</a> & <a target="_blank" href="https://hono.dev/">Hono</a> & <a target="_blank" href="https://account.mongodb.com/">MongoDB</a></p>
    </footer>
</section>

<style>
    .Footer .wrapper{
        text-align: center;
        padding: 50px 0;
        background: rgb(44, 44, 44);
        color: white;
    }
    .Footer .wrapper a{
        color: orange;
    }
</style>