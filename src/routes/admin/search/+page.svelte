<script>
	import Layout from "$lib/components/admin/Layout.svelte"
	let { data } = $props()
	let Posts = $state(data.posts)
	async function getPosts(e){
        const response = await fetch(`/admin/search/${e.target.value}/${data.q}`)
        const { posts } = await response.json()
        Posts = posts
    }
</script>

<Layout {data} >
	{#snippet editor()}
	<div class="editor">
		{#each Posts as post}
		<div class="item">
			<a class="thumb" href={`/post/${post._id}`}>
				<img src={post.thumb} alt=""/>
				{#if post.videos?.length}
				<img class="play-icon" src="/images/play.png" alt=""/>
				{/if}
			</a>
			<div class="title">
				<a href={`/post/${post._id}`}>{post.title}</a>
				<div class="date">{(new Date(post.date)).toLocaleDateString("it-IT")}</div>
			</div>
			<div class="edit">
				<a href="/admin/post/delete/{post._id}">
					<img src="/images/delete.png" alt=''/>
				</a>
                <a style="padding-right:5px;" href={`/admin/post/edit/${post._id}`}>
					<img src="/images/edit.png" alt='' />
				</a>
            </div> 
		</div>
		{/each }
	</div>
	<div class="pagination">
        <span>ទំព័រ </span>
        <select onchange={ getPosts }>
            {#each [...Array(data.lastPage).keys()] as pageNumber}
                {#if pageNumber+1 == data.page}
                <option selected>{pageNumber+1}</option>
                {:else}
                <option>{pageNumber+1}</option>
                {/if}
            {/each}
        </select>
        <span> នៃ {data.lastPage}</span>
    </div>
	{/snippet}
</Layout>

<style>
	.editor{
		display: grid;
		grid-template-columns: calc(50% - 5px) calc(50% - 5px);
		grid-gap: 10px;
	}
	.editor .item{
		background: var(--background);
		display: grid;
		grid-template-columns: 100px auto;
		align-items: center;
		grid-gap: 10px;
		padding-right: 10px;
	}
	.editor .item:hover{
		grid-template-columns: 100px auto 75px;
	}
	.editor .item .thumb{
		display: block;
		position: relative;
		padding-top: 56.25%;
		overflow: hidden;
	}
	.editor .item .thumb img{
		width: 100%;
		min-height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.editor .item .thumb .play-icon{
		position: absolute;
		min-height: auto;
		width: 25%;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.editor .item .title{
		white-space: nowrap;
        overflow: hidden;
    	text-overflow: ellipsis;
	}
	.editor .item .edit{
		text-align: right;
		display: none;
	}
	.editor .item .edit a{
    	float: right;
	}
	.editor .item .edit img{
		width: 30px;
	}
	.editor .item .edit img:hover{
		cursor: pointer;
		opacity: .7;
	}
	.editor .item:hover .edit{
    	display: block;
	}

	.pagination{
    	text-align: center;
		margin-top: 10px;
    	padding: 5px 0;
		background: var(--background);
	}

	@media only screen and (max-width: 600px){
		.editor{
			grid-template-columns: 100%;
		}
	}
</style>