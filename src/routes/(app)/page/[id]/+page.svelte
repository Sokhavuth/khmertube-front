<script>
    let { data } = $props()
    import Layout from '$lib/components/Layout.svelte'
    import Page from '$lib/components/Page.svelte';
</script>

<Layout { data } >
    <Page { data } />
</Layout>