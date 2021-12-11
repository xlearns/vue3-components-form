<template>
   <div class="form-item">
    <label v-if="label" :class="{ 'form-item-label-required': isRequired }">{{ label }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="form-item-message">{{ validateMessage }}</div>
    </div>
  </div>
</template>
<script lang='ts'>
  import {defineComponent,computed,provide,inject,onMounted,getCurrentInstance,onUnmounted,reactive,toRefs} from 'vue'
  import AsyncValidator from 'async-validator';

  export default defineComponent({
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: {
        type: String
      }
    },
    setup(props){
      const {proxy}  = getCurrentInstance()
      let state = reactive({
        isRequired: false,  // 是否为必填
        validateState: '',  // 校验状态
        validateMessage: '',  // 校验不通过时的提示信息
        initialValue:''
      })
      const add = inject('on-form-item-add','')
      const remove = inject('on-form-item-remove','')
      const form = inject('form')
      
      const fieldValue = computed(()=>{
        return form.modelValue[props.prop]
      })

      const getRules = function(){
        let formRules = form.rules;
        formRules = formRules ? formRules[props.prop] : [];
        return [].concat(formRules || []);
      }

      const getFilteredRule = function(trigger) {
        const rules = getRules();

        return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
      }

      const validate = function(trigger, callback = function () {}){
        let rules = getFilteredRule(trigger);
       
        if (!rules || rules.length === 0) {
          return true;
        }
        // 设置状态为校验中
        state.validateState = 'validating';

        let descriptor = {};
        descriptor[props.prop] = rules;

        const validator = new AsyncValidator(descriptor);
        let model = {};
       
        model[props.prop] = fieldValue.value
        

        validator.validate(model, { firstFields: true }, errors => {
          state.validateState = !errors ? 'success' : 'error';
          state.validateMessage = errors ? errors[0].message : '';

          callback(state.validateMessage);
        });
      }
  
      // 重置数据
      const resetField  = function () {
        state.validateState = '';
        state.validateMessage = '';
       
        form.modelValue[props.prop] = state.initialValue;
      }

      const onFieldBlur = function(){
          validate('blur')
      }

      const onFieldChange = function(){
        
        validate('change')
      }
      const setRules = function(){
        let rules = getRules();
        if (rules.length) {
             rules.every((rule) => {
               // 如果当前校验规则中有必填项，则标记出来
               state.isRequired = rule.required;
           });
        }
      }
      
      provide('on-form-blur', onFieldBlur);
      provide('on-form-change', onFieldChange);
      onMounted(()=>{
        if(props.prop){
           add(proxy)
            state.initialValue = fieldValue.value
            setRules()
        }
      })
      onUnmounted(()=>{
        remove(proxy)
      })

      return {
        resetField,
        ...toRefs(state)
      }
    }
  })
</script>
<style scoped>
  .form-item{
    display:flex;
  }
  .form-item-label-required:before {
    content: '*';
    color: red;
  }
  .form-item-message {
    color: red;
  }
</style>