import Alert from './alert.vue';
import { createApp,defineComponent } from 'vue'


const dialogCom = function (options:any){
  //单例
  const props = options || {};
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const Instance = createApp(Alert,props)
  const component = Instance.mount(mountNode)
  return component
}

let messageInstance:any;

const getMessageInstance = function(){
  messageInstance = messageInstance || dialogCom();
  return messageInstance;
}
const notice = function(options:any){
     let content = options&&options.content||''
     let duration = options&&options.duration||1.5
     let instance = getMessageInstance();
     instance.add({
      content: content,
      duration: duration
    });
}
export default defineComponent({
  msg(options:any){
      return notice(options)
  }
})