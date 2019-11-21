<template>
	<el-badge :value ="msgTotal" class="item" >
		<svg id="icon-bell"   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="icon svg" viewBox="0 0 1025 1024" width="100%" height="100%"><path d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"></path></svg>
	</el-badge>
</template>

<style scoped>
.svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 30px;
  height: 30px;
  vertical-align: 10px;
}
</style>

<script>
	import store from '@/store/'
	
	export default {
		data() {
			return {
				stopTimer:false,
				lockReconnect:false,
				websock: null,
				heartCheck:null,
				msgCount: 10
			}
		},
		computed:{
		  msgTotal () {
			return this.msgCount;
		  }
		},
		mounted() {
		  this.loadData()
		  this.initWebSocket();
		  this.heartCheckFun();
		},
		methods:{
			loadData (){
				try {
				  // 获取系统消息
				  //getAction(this.url.listCementByUser).then((res) => {
					//if (res.success) {
					  //this.announcement1 = res.result.anntMsgList;
					  //this.msg1Count = res.result.anntMsgTotal;
					  //this.msg1Title = "通知(" + res.result.anntMsgTotal + ")";
					  //this.announcement2 = res.result.sysMsgList;
					  //this.msg2Count = res.result.sysMsgTotal;
					  //this.msg2Title = "系统消息(" + res.result.sysMsgTotal + ")";
					//}
				  //}).catch(error => {
					//console.log("系统消息通知异常",error);//这行打印permissionName is undefined
					//this.stopTimer = true;
					//console.log("清理timer");
				  //});
				  this.msgCount=12
				} catch (err) {
				  this.stopTimer = true;
				  console.log("通知异常",err);
				}
			},
			initWebSocket: function () {
				// WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
				var userId = store.getters.user.id;
				var url = process.env.VUE_APP_BASE_API.replace("https://","wss://").replace("http://","ws://")+"websocket/"+userId;
				console.log(url);
				this.websock = new WebSocket(url);
				this.websock.onopen = this.websocketonopen;
				this.websock.onerror = this.websocketonerror;
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onclose = this.websocketclose;
			},
			websocketonopen: function () {
				console.log("WebSocket连接成功");
				//心跳检测重置
				this.heartCheck.reset().start();
			},
			websocketonerror: function (e) {
				console.log("WebSocket连接发生错误");
				//心跳检测重置
				this.reconnect();
			},
			websocketonmessage:function(e){
				console.log("-----接收消息-------",e.data);
				var data = eval("(" + e.data + ")"); //解析对象
				this.loadData();
				//心跳检测重置
				this.heartCheck.reset().start();
			},
			websocketsend(text) { // 数据发送
				try {
					this.websock.send(text);
				} catch (err) {
					console.log("send failed (" + err.code + ")");
				}
			
			},
			websocketclose: function (e) {
				console.log("connection closed (" + e.code + ")");
				this.reconnect();
			},
			reconnect() {
				var that = this;
				if(that.lockReconnect) return;
				that.lockReconnect = true;
				//没连接上会一直重连，设置延迟避免请求过多
				setTimeout(function () {
					console.info("尝试重连...");
					that.initWebSocket();
					that.lockReconnect = false;
				}, 5000);
			},
			heartCheckFun(){
				var that = this;
				//心跳检测,每20s心跳一次
				that.heartCheck = {
				  timeout: 20000,
				  timeoutObj: null,
				  serverTimeoutObj: null,
				  reset: function(){
					clearTimeout(this.timeoutObj);
					//clearTimeout(this.serverTimeoutObj);
					return this;
				  },
				  start: function(){
					var self = this;
					this.timeoutObj = setTimeout(function(){
					  //这里发送一个心跳，后端收到后，返回一个心跳消息，
					  //onmessage拿到返回的心跳就说明连接正常
					  that.websocketsend("HeartBeat");
					  console.info("客户端发送心跳");
					  //self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
					  //  that.websock.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
					  //}, self.timeout)
					}, this.timeout)
				  }
				}
		  }
		}
		
	}
</script>