<template>
  <a-modal
    :visible="visible"
    @ok="onSubmit"
    @cancel="closeModal(false)"
    :maskClosable="false"
    :keyboard="false"
    :confirmLoading="loading"
    :width="550"
    :title="module ? '编辑软件模块' : '新增软件模块'"
  >
    <a-form
      :label-col='{ span: 5 }' :wrapper-col='{ span: 14 }'
      :form='form'
      v-bind='formItemLayout'
    >
      <a-form-item label='标题'>
        <a-input placeholder='请输入标题' v-decorator="['title']" />
      </a-form-item>
      <a-form-item label='副标题'>
        <a-input placeholder='请输入副标题' v-decorator="['subheading']" />
      </a-form-item>
      <a-form-item label='内容'>
        <a-textarea placeholder='请输入描述' :rows='4' v-decorator="['cotent']" />
      </a-form-item>
      <a-form-item label='内容标签' extra='标签之间用英文逗号隔开'>
        <a-textarea placeholder='请输入描述,' :rows='4' v-decorator="['contentDescription']" />
      </a-form-item>
      <a-form-item label='附件' extra='此处上传产品板块轮播图'>
        <a-upload
          v-decorator="['upload',{valuePropName: 'fileList'}]"
          action='http://114.67.199.59/cfc/file/upload'
          list-type='text'
        >
          <a-button type='primary'>
            <a-icon type='upload' />
            点击上传
          </a-button>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { createModule, modifyModule } from '@/api/form'
import ATextarea from 'ant-design-vue/es/input/TextArea'

export default {
  components: { ATextarea },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    module: Object
  },
  data () {
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
    async handleCreateModule (params) {
      await createModule(params)
      this.loading = false
      this.$message.success('创建软件模块成功')
      this.closeModal(true)
    },
    async handleModifyModule (params) {
      await modifyModule(params)
      this.loading = false
      this.$message.success('编辑软件模块成功')
      this.closeModal(true)
    },
    onSubmit () {
      this.form.validateFields((err, values) => {
        if (err) return

        this.loading = true
        const params = { ...this.module, ...values }
        if (params.id) {
          this.handleModifyModule(params)
        } else {
          this.handleCreateModule(params)
        }
      })
    },
    closeModal (isRefresh) {
      this.form.resetFields()
      this.$emit('close', isRefresh)
    }
  }
}
</script>
