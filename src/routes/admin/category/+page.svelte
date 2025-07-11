<script>
    import Layout from '$lib/components/admin/Layout.svelte'
    import Items from '$lib/components/admin/Items.svelte'
    let { data, form } = $props()
</script>

<Layout {data}>
    {#snippet editor()}
    <section class="category" slot="editor">
        <form method="post" action="/admin/category?/create" >
            <span>ឈ្មោះ​ជំពូកៈ</span><input type="text" name="label" required />
            <span>រូប​សញ្ញាៈ</span><input type="text" name="thumb" required />
            <span>ពេល​បង្កើតៈ</span><input type="datetime-local" step="1" name="datetime" required />
            <span></span><input type="submit" value="បញ្ជូន" />
            <span></span>
        </form>
    </section>
    {/snippet}
    {#snippet items(data)}
        <Items {data} {form} />
    {/snippet}
</Layout>

<style>
    .category{
        padding: 20px;
        background: var(--background);
        height: 100%;
    }
    .category form{
        display: grid;
        grid-template-columns: 80px 300px;
        grid-gap: 5px 2px;
        align-items: center;
    }
    .category form span{
        text-align: right;
        color: black;
    }
    .category form input{
        font: var(--body-font);
        padding: 2px 5px
    }
    
</style>