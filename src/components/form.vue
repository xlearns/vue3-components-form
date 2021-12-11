<template>
	 <form>
        <slot></slot>
    </form>
</template>
<script lang='ts'>
	import {defineComponent,reactive,provide,toRefs,onMounted,getCurrentInstance} from 'vue'
	export default defineComponent({
		 props: {
            modelValue: {
                type: Object
            },
            rules: {
                type: Object
            },
        },
        setup(){
          let {proxy} = getCurrentInstance()
          let state = reactive({
          	fields:[]
          })
          const resetFields = function() {
            state.fields.forEach(field => {
              field.resetField();
            });
          }
          //parent created > child created > child mounted > parent mounted
          provide('form',proxy)
          provide('on-form-item-add',(field)=>{
          	if (field) state.fields.push(field);
          })
          provide('on-form-item-remove',(field) => {
            if (field.prop) state.fields.splice(state.fields.indexOf(field), 1);
            })

          onMounted(()=>{
          	// console.log(state.fields)
          })
          return {
            resetFields,
          	...toRefs(state)
          }
        }
	})
</script>