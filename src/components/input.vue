<template>
	<input
         type="text"
         :value="currentValue"
         @input="handleInput"
         @blur="handleBlur"
         />
</template>
<script type='ts'>
	import {defineComponent,inject,toRefs,reactive} from 'vue'
	export default defineComponent({
		props:{
			modelValue:''
		},
		setup(props,{emit}){
			let state = reactive({
				currentValue:props.modelValue
			})
			let change = inject('on-form-change')
			let blur = inject('on-form-blur')
			const handleInput = function(){
				const value = event.target.value;
				state.currentValue = value;
				emit('update:modelValue', value);
				change(value)
			}
			const handleBlur = function(){
				blur(state.currentValue)
			}
			return {
				...toRefs(state),
				handleInput,
				handleBlur
			}
		}
	})
</script>
