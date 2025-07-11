<script>
    import jq from "jquery"
    import Layout from "$lib/components/admin/Layout.svelte"

    let { data } = $props()
</script>

<Layout {data}>
    {#snippet editor()}
    <section>
      <iframe src="https://img.doerig.dev/" width="100%" height="100%" frameBorder="0" title=""></iframe>
    </section>
    {/snippet}
</Layout>

<style>
    section{
        background: var(--background);
        height: 100%;
        width: 100%
    }
</style>