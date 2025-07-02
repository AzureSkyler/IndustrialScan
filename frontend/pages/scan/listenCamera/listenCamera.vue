<template>
	<view class="fillMax">
		<camera class="previewView" resolution="high" device-position="back" flash="off" frame-size="max" @error="error"></camera>
		<view class="takeTools">
			<view class="takePhoto" @click="takePhoto"></view>	
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad() {

		},
		methods: {		
			 takePhoto() {
				const ctx = uni.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.src = res.tempImagePath
						uni.navigateTo({
							url: '../editMask/editMask?src='+this.src
						});
					}
				});
			},
			error(e) {
				console.log(e.detail);
			}
		}
	}
</script>

<style>
	.fillMax {
		display: flex;
		flex-direction: column;
		
		width: 100vw;
		height: 100vh;
	}
	.previewView{
		flex: 12;
	}
	.takeTools{
		flex: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000000;
	}
	.takePhoto{
		display: flex;
		justify-content: center;
		align-items: center;
		aspect-ratio:1/1;
		height: 50%;
		border: 1.5px solid #ffffff;
		border-radius: 50%;
	}
	.takePhoto::after{
		display: block;
		content: '';
		aspect-ratio:1/1;
		height: 95%;
		background-color: #ffffff;
		border-radius: 50%;
	}
</style>