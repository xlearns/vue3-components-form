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

         const validate = function(callback) {
            return new Promise(resolve => {
              let valid = true;
              let count = 0;
              state.fields.forEach(field => {
                field.validate('change', errors => {
                  if (errors) {
                    valid = false;
                  }

                  if (++count === state.fields.length) {
                      // 全部完成
                      resolve(valid);
                    if (typeof callback === 'function') {
                      callback(valid);
                    }
                  }
                });
              });
            });
          }

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
            validate,
            resetFields,
          	...toRefs(state)
          }
        }
	})
</script>