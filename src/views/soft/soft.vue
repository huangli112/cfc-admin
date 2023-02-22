<template>
	<div>
		<a-card title="软件产品" :bordered="false">
			<a-button @click="handleAdd" type="primary">新增模块</a-button>
			<a-table
				style="margin-top: 40px;"
				:columns="columns"
				:dataSource="dataSource"
				rowKey="name"
				:pagination="false"
				:loading="tableLoading"
			>
				<span
					slot="updateTime"
					slot-scope="updateTime"
				>{{ new Date(updateTime) | formatDate('yyyy-MM-dd') }}</span>

				<div slot="actions" slot-scope="record">
					<a @click="onEditContent(record.id)">编辑</a>
					<a-divider type="vertical" />
					<a @click="onDeleteContent(record.id)">删除</a>
				</div>
			</a-table>
		</a-card>
		<a-modal
			:visible="visible"
			@ok="onSubmit"
			@cancel="closeModal"
			:maskClosable="false"
			:keyboard="false"
			:confirmLoading="loading"
			:width="550"
			:title="title ? '编辑软件模块' : '新增软件模块'"
		>
			<a-form
				:label-col="{ span: 5 }"
				:wrapper-col="{ span: 14 }"
				:form="form"
				v-bind="formItemLayout"
			>
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
	</div>
</template>

<script>
import { tableMixin } from '@/mixins'
import {
	getSoftInfoList,
	deleteSoft,
	getSoftInfo,
	updateSoft,
	addSoft
} from '@/api/soft.js'

const columns = [
	{
		title: '模块名',
		dataIndex: 'title',
		align: 'center',
		width: 100
	},
	{
		title: '显示顺序',
		dataIndex: 'showIndex',
		align: 'center',
		width: 100
	},
	{
		title: '标题',
		dataIndex: 'title',
		align: 'center',
		width: 100
	},
	{
		title: '副标题',
		dataIndex: 'subheading',
		align: 'center'
	},
	{
		title: '内容',
		dataIndex: 'content',
		align: 'center'
	},
	{
		title: '内容描述',
		dataIndex: 'contentDescription',
		align: 'center'
	},
	{
		title: '链接',
		dataIndex: 'link',
		align: 'center'
	},
	{
		title: '更新时间',
		dataIndex: 'createdTime',
		scopedSlots: { customRender: 'createdTime' },
		width: 160,
		align: 'center'
	},
	{
		title: '操作',
		scopedSlots: { customRender: 'actions' },
		width: 120,
		align: 'center',
		fixed: 'right'
	}
]

export default {
	mixins: [tableMixin],
	data() {
		return {
			dataSource: [],
			formItemLayout: {
				labelCol: { span: 6 },
				wrapperCol: { span: 18 }
			},
			form: this.$form.createForm(this),
			loading: false,
			visible: false,
			title: false,
			id: ''
		}
	},
	methods: {
		/* list */
		async getList() {
			const code = 'SOFTWARE_PRODUCT'
			const res = await getSoftInfoList(code)
			res.map(item => {
				item.contentDescription = item.contentDescription.join(',')
				return item
			})
			this.dataSource = res
		},
		/* 新增Modal */
		handleAdd() {
			this.visible = true
			this.title = false
		},
		/* 关闭Modal */
		closeModal() {
			this.form.resetFields()
			this.title = false
			this.visible = false
		},
		/* 编辑Modal */
		async onEditContent(id) {
			this.visible = true
			this.title = true
			this.id = id
			const res = await getSoftInfo(id)
			this.form.setFieldsValue(res)
		},
		/* 删除 */
		async onDeleteContent(id) {
			const self = this
			this.$confirm({
				title: '删除',
				content: `确定要删除该模块吗？`,
				okText: '删除',
				okType: 'danger',
				async onOk() {
					await deleteSoft(id)
					self.$message.success('删除成功')
					self.getList()
				},
				onCancel() {
					self.$message.warning('取消删除')
				}
			})
		},
		/* 确定 */
		onSubmit() {
			this.form.validateFields(async (err, values) => {
				if (err) return
				this.loading = true

				if (!this.title) {
					values.contentDescription = values.contentDescription
						.split(',')
						.filter(item => {
							if (item != ' ') {
								return item
							}
						})
					const assParams = {
						...values,
						code: 'SOFTWARE_PRODUCT'
					}
					const res = await addSoft(assParams)
					this.closeModal()
					if (res.message == 'success') {
						this.getList()
						this.$message.success('新增成功')
					}
				} else {
					const delParams = {
						...values,
						id: this.id
					}
					const res = await updateSoft(delParams)
					this.closeModal()
					if (res.message == 'success') {
						this.getList()
						this.$message.success('修改成功')
					}
				}
			})
		}
	},
	created() {
		this.columns = columns
		this.getList()
	}
}
</script>
