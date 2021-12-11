<template>
	<button @click='btn'>hello world</button>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import alertTs from "@/components/alert";
export default defineComponent({
	setup() {
		const btn = function(){
			alertTs.msg({
						content: "哈哈"
					});
		}
		return {
			btn
		}
	},
});
</script>
