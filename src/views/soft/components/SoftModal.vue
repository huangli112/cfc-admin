<template>
	<a-modal
		:id="editId"
		:visible="visible"
		@ok="onSubmit"
		@cancel="closeModal(false)"
		:maskClosable="false"
		:keyboard="false"
		:confirmLoading="loading"
		:width="550"
		:title="title ? '编辑软件模块' : '新增软件模块'"
	>
		<a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 14 }" :form="form" v-bind="formItemLayout">
			<a-form-item label="标题">
				<a-input placeholder="请输入标题" v-decorator="['title']" />
			</a-form-item>
			<a-form-item label="副标题">
				<a-input placeholder="请输入副标题" v-decorator="['subheading']" />
			</a-form-item>
			<a-form-item label="内容">
				<a-textarea placeholder="请输入描述" :rows="4" v-decorator="['content']" />
			</a-form-item>
			<a-form-item label="内容标签" extra="标签之间用英文逗号隔开">
				<a-textarea placeholder="请输入内容标签" :rows="4" v-decorator="['contentDescription']" />
			</a-form-item>
			<a-form-item label="链接">
				<a-input placeholder="请输入链接" :rows="4" v-decorator="['link']" />
			</a-form-item>
			<a-form-item label="显示顺序">
				<a-input placeholder="请输入显示顺序" :rows="4" v-decorator="['showIndex']" />
			</a-form-item>
			<a-form-item label="附件" extra="此处上传产品板块轮播图">
				<a-upload
					v-decorator="['upload',{valuePropName: 'fileList'}]"
					action="http://114.67.199.59/cfc/file/upload"
					list-type="text"
				>
					<a-button type="primary">
						<a-icon type="upload" />点击上传
					</a-button>
				</a-upload>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script>
import ATextarea from 'ant-design-vue/es/input/TextArea'
import {
	addSoft,
	updateSoft,
	getSoftInfoList,
	getSoftInfo
} from '@/api/soft.js'
export default {
	components: { ATextarea },
	props: {
		visible: {
			type: Boolean,
			required: true
		},
		title: {
			type: Boolean,
			required: true
		},
		id: {
			type: String
		}
	},
	data() {
		return {
			form: this.$form.createForm(this),
			loading: false,
			formItemLayout: {
				labelCol: { span: 6 },
				wrapperCol: { span: 18 }
			}
		}
	},
	methods: {
		async getInfo() {
			if (this.editId) {
				const res = await getSoftInfo(this.editId)
				console.log(res, 'res')
			} else {
				console.log('没有找到id')
				return
			}
		},
		async getList() {
			const code = 'SOFTWARE_PRODUCT'
			const res = await getSoftInfoList(code)
			this.dataSource = res
		},
		onSubmit() {
			this.form.validateFields(async (err, values) => {
				if (err) return
				console.log(values, 'values')
				this.loading = true
				values.contentDescription = values.contentDescription.split(',')
				const params = {
					...values,
					code: 'SOFTWARE_PRODUCT'
				}
				if (!this.title) {
					const res = await addSoft(params)
					if (res.message == 'success') {
						this.closeModal()
						this.getList()
						this.$message.success('新增成功')
					}
				} else {
					const res = await updateSoft(params)
					if (res.message == 'success') {
						this.closeModal()
						this.getList()
						this.$message.success('修改成功')
					}
				}
			})
		},
		closeModal() {
			this.form.resetFields()
			this.$emit('close')
			this.title = false
		}
	}
}
</script>
