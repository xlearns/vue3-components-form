<template>
	<div>hello world</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import alertTs from "@/components/alert";
export default defineComponent({
	setup() {
		onMounted(() => {
			Array.from({ length: 10 }).forEach((v, i) => {
				setTimeout(() => {
					alertTs.msg({
						content: "哈哈" + i,
						duration: i,
					});
				}, i * 100);
			});
		});
	},
});
</script>
