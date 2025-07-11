<script>
    import Layout from "$lib/components/admin/Layout.svelte"
    import Items from "$lib/components/admin/Items.svelte"
    import { browser } from '$app/environment'
    import {activePage} from "$lib/stores/page.js"
    let { data, form } = $props()
    const roles = ['Author','Editor','Admin']
</script>

<Layout {data}>
    {#snippet editor()}
    <div class="Editor">
        <form action={`?/update&p=${$activePage}`} method="post">
            <input type="hidden" name="id" value={data.author._id} />
            <input type="text" name="title" value={data.author.title} required placeholder="ឈ្មោះ" />
            <div class="wrapper">
                <textarea name="content" id="editor">{data.author.content}</textarea>
            </div>
            <div class="frame">
                <select name="role" required >
                    {#each roles as role}
                        {#if role === data.author.role}
                        <option selected>{role}</option>
                        {:else}
                        <option>{role}</option>
                        {/if}
                    {/each}
                </select>
                <input type="email" name="email" value={data.author.email} required placeholder="Email" />
                <input type="password" name="password" value={data.author.password} required />
                <input type="text" name="thumb" value={data.author.thumb} required placeholder="រូប​​តំណាង" />
                <input type="datetime-local" step="1" value={data.author.date} name="datetime" required />
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
