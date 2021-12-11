<template>
	<formDom v-model="formValidate" :rules="ruleValidate" ref='formRef'>
      <formItemDom label="用户名" prop="name">
        <inputDom v-model="formValidate.name"></inputDom>
      </formItemDom>
      <formItemDom label="邮箱" prop="mail">
        <inputDom v-model="formValidate.mail"></inputDom>
      </formItemDom>
    </formDom>
    <button @click='submit'>submit</button>
    <button @click='reset'>reset</button>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref,toRefs,reactive} from "vue";
import myAlert from '@/components/alert'
import formDom from "@/components/form.vue";
import formItemDom from "@/components/formItem.vue";
import inputDom from '@/components/input.vue'
export default defineComponent({
	components:{
		formItemDom,
		formDom,
		inputDom
	},
	setup() {
		let formRef =ref()

		let state = reactive({
			formValidate: {
          name: '',
          mail: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '用户名不能为空', trigger:  ['change','blur'] }
          ],
          mail: [
            { required: true, message: '邮箱不能为空', trigger:  ['change','blur'] },
            { type: 'email', message: '邮箱格式不正确', trigger:  ['change','blur'] }
          ],
        }
		})
		const reset = function(){
			formRef.value.resetFields()
		}
		const submit = function(){
			formRef.value.validate().then(v=>{
				if(!v){
					return myAlert.msg({
						content:"fail!!"
					})
				}
				myAlert.msg({
						content:"success!!"
					})
			})
		}

		return {
			submit,
			reset,
			formRef,
			...toRefs(state)
		}
	},
});
</script>
