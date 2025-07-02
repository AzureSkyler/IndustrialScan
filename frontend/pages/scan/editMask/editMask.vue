<template>	
	<view class="fillMax">
		<view class="previewView">
			<image id="basePhoto" mode="widthFix" :src="src" v-show="src" style="overflow: hidden;">
				<canvas id="mask" canvas-id="mask" disable-scroll="false" hidpi="true" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"></canvas>
			</image>
		</view>
		<view class="takeTools">
			<view class="takePhoto" @click="takePhoto"></view>	
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				points: [
					{ x: 0, y: 0 },
					{ x: 0, y: 0 },
					{ x: 0, y: 0 },
					{ x: 0, y: 0 }
				],
				draggingIndex: null,
				canvasWidth: 0,
				canvasHeight: 0
			}
		},
		onLoad(option) {
			this.src = option.src
		},
		onReady() {
			this.$nextTick(()=>{
				uni.createSelectorQuery()
				.select('#mask')
				.boundingClientRect(res => {
					if (res) {
						this.canvasWidth = res.width;
						this.canvasHeight = res.height;
						console.log(this.canvasWidth);
						console.log(this.canvasHeight);
						let offsetWidth = this.canvasWidth*0.1
						let offsetHeight = this.canvasHeight*0.1
						this.points = [
							{ x: 0+offsetWidth					, y: 0+offsetHeight },
							{ x: this.canvasWidth-offsetWidth	, y: 0+offsetHeight },
							{ x: this.canvasWidth-offsetWidth	, y: this.canvasHeight-offsetHeight },
							{ x: 0+offsetWidth					, y: this.canvasHeight-offsetHeight }
						],
						this.draw(uni.createCanvasContext('mask', this));
					}
				})
				.exec();
			})
		},
		methods: {
			
			takePhoto() {
				console.log(this.src);
				uni.saveImageToPhotosAlbum({
					filePath: this.src,
					success: function () {
						console.log('save success');
					}
				});
			},
			draw(ctx){	
				if (!ctx) return;
				
				ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
				const points = this.points;
				ctx.beginPath();
				// 移动到第一个点
				ctx.moveTo(points[0].x, points[0].y);
				for (let i = 1; i < points.length; i++) {
					// 连接到其他点
					ctx.lineTo(points[i].x, points[i].y); 
				}
				// 自动连回第一个点形成闭合图形
				ctx.closePath();
			    // 设置样式
			    ctx.setStrokeStyle('red');
			    ctx.setLineWidth(1);
			    ctx.setFillStyle('rgba(255, 0, 0, 0.0)');
				
				// 填充
				// ctx.fill();
				// 描边
				ctx.stroke(); 

				// 刷新画布
				ctx.draw();
			},
			
			    
			handleTouchStart(e) {
				const touch = e.touches[0];
				const points = this.points;
				let closestPoint = null;
				let minDist = 20; // 拖动点的感应范围
				for (let i = 0; i < points.length; i++) {
					const dist = Math.sqrt(Math.pow(touch.x - points[i].x, 2) + Math.pow(touch.y - points[i].y, 2));
					if (dist < minDist) {
						minDist = dist;
						closestPoint = i;
					}
				}
				this.draggingIndex = closestPoint !== undefined ? closestPoint : null;
			},

			handleTouchMove(e) {
				if (this.draggingIndex !== null) {
					const touch = e.touches[0];
					this.points[this.draggingIndex] = { x: touch.x, y: touch.y };
					const ctx = uni.createCanvasContext('mask', this);
					this.draw(ctx);
				}
			},

			handleTouchEnd() {
				this.draggingIndex = null;
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
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 13;
	}
	.takeTools{
		flex: 1;
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
		content: '√';
		aspect-ratio:1/1;
		height: 95%;
		background-color: #ffffff;
		border-radius: 50%;
	}
	
	
	image{
		position: relative;
		width: 90%;
	}
	#mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>