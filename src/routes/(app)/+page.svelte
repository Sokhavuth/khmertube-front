<script>
    let { data } = $props()
    import Layout from '$lib/components/Layout.svelte'
    import Home from "$lib/components/Home.svelte"
</script>

<Layout { data } >
    <Home { data } />
</Layout>