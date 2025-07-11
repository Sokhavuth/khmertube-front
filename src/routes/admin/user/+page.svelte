<script>
    import Layout from "$lib/components/admin/Layout.svelte"
    import Items from "$lib/components/admin/Items.svelte"
    import { browser } from '$app/environment'

    let { data, form } = $props()
</script>

<Layout {data}>
    {#snippet editor()}
    <div class="Editor">
        <form action="?/create" method="post">
            <input type="text" name="title" requried placeholder="ឈ្មោះ" />
            <div class="wrapper">
                <textarea name="content" id="editor"></textarea>
            </div>
            <div class="frame">
                <select name="role" required >
                    <option>Author</option>
                    <option>Editor</option>
                    <option>Admin</option>
                </select>
                <input type="email" name="email" required placeholder="Email" />
                <input type="password" name="password" required />
                <input type="text" name="thumb" required placeholder="រូប​​តំណាង" />
                <input type="datetime-local" step="1" name="datetime" required />
                <input type="submit" value="បញ្ចូល" />
            </div>
            {#if browser}
                <script src="/scripts/ckeditor/config-user.js"></script>
            {/if}
        </form>
    </div>
    {/snippet}
    {#snippet items(data)}
        <Items {data} {form} />
    {/snippet}
</Layout>

<style>
    .Editor{
        background-color: white;
        height: 100%;
        position: relative;
    } 
    .Editor .wrapper{
        height: 350px;
    }
    .Editor input{
        width: 100%;
        font: var(--body-font);
        padding: 3px 5px;
    }
    .Editor .frame{
        display: grid;
        grid-template-columns: 8% auto auto auto 23% 10%;
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    @media only screen and (max-width: 600px){
        .Editor .frame{
            grid-template-columns: 100%
        }
    }
</style>
