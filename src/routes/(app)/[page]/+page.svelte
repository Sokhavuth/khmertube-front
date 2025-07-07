<script>
    let { data } = $props()
    import Layout from '$lib/components/Layout.svelte'
    import Post_page from '$lib/components/Post-page.svelte';
</script>

<Layout { data } >
    <Post_page { data } />
</Layout>