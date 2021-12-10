<template>
	<div class="myAlert">
		<div class="main" v-for="item in notices" :key="item.name">
			<div class="content">{{ item.content }}</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
	name: "myAlert",
	props: {},
	setup() {
		let seed = 0;
		let state = reactive({
			notices: [] as any,
		});
		// state.notices = Array.from({ length: 2 }).map((v, i) => {
		// 	return {
		// 		name: i,
		// 		content: i,
		// 	};
		// });
		const getUuid = function () {
			return "alert_" + seed++;
		};
		const add = function (notice: any) {
			const name = getUuid();
			let _notice = Object.assign(
				{
					name: name,
				},
				notice
			);
			state.notices.push(_notice);
			//定时移除
			const duration = notice.duration;
			setTimeout(() => {
				remove(name);
			}, duration * 1000);
		};
		const remove = function (name: any) {
			const notices = state.notices;
			for (let i = 0; i < notices.length; i++) {
				if (notices[i].name == name) {
					state.notices.splice(i, 1);
					break;
				}
			}
		};
		return {
			add,
			remove,
			...toRefs(state),
		};
	},
});
</script>
<style scoped>
.myAlert {
	position: fixed;
	width: 100%;
	top: 16px;
	left: 0;
	text-align: center;
	pointer-events: none;
}
.content {
	display: inline-block;
	padding: 8px 16px;
	background: #fff;
	border-radius: 3px;
	box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
	margin-bottom: 8px;
}
</style>
