<template>
	<input type="text" v-model="email" />
	<input type="text" v-model="password" />
	<button @click="register">123</button>
</template>

<script>
import { post } from '@/common/utils/request.js';

export default {
	data() {
		return {
			registerForm: {
				email: '',
				password: ''
			}
		}
	},
	onLoad() {
	},
	methods: {
		async register() {
			try {
			const res = await post('/api/auth/register', this.registerForm);
			uni.showToast({ title: '注册成功' });
			console.log('响应数据:', res);

			// 跳转到登录页或其他操作
			uni.navigateTo({ url: '/pages/auth/index/1' });
			} catch (err) {
			console.error('注册失败:', err);
			}
		}
	}
}
</script>

<style>
</style>