<script>
    let { data, children } = $props()
    import Header from "$lib/components/Header.svelte"
    import Menu from "$lib/components/Menu.svelte"
    import Ad from "$lib/components/Ad.svelte"
    import Footer from "$lib/components/Footer.svelte"
</script>

<svelte:head>
    <title>{ data.title }</title>
    <link href="/fonts/setup.css" rel="stylesheet" />
    <link href="/styles/base-frontend.css" rel="stylesheet" />
</svelte:head>

<Header { data } />
<Menu { data } />
<Ad />
<img style='display:none;' src={data.thumb} alt='' />
{@render children()}
<Footer />