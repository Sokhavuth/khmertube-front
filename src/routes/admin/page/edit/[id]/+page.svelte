<script>
    import Layout from "$lib/components/admin/Layout.svelte"
    import Items from "$lib/components/admin/Items.svelte"
    import { browser } from '$app/environment'
    import {activePage} from "$lib/stores/page.js"

    let { data, form } = $props()
</script>

<Layout {data}>
    {#snippet editor()}
    <div class="Editor" slot="editor">
        <form action={`?/update&p=${$activePage}`} method="post">
            <input type="hidden" name="id" value={data.page._id} />
            <input type="text" name="title" value={data.page.title} requred placeholder="ចំណងជើង" />
            <div class="wrapper">
                <textarea name="content" id="editor">{data.page.content}</textarea>
            </div>
            <div class="frame">
                <input type="text" name="thumb" value={data.page.thumb} required placeholder="រូប​​តំណាង" />
                <input type="datetime-local" step="1" value={data.page.date} name="datetime" required />
                <input type="submit" value="ចុះ​ផ្សាយ" />
            </div>
            {#if browser}
                <script src="/scripts/ckeditor/config-page.js"></script>
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
        grid-template-columns: 45% auto 15%;
        position: absolute;
        bottom: 0;
        width: 100%;
    }
</style>
