<template>
  <a-modal
    :visible="visible"
    @ok="onSubmit"
    @cancel="closeModal(false)"
    :maskClosable="false"
    :keyboard="false"
    :confirmLoading="loading"
    :width="480"
    :title="module ? '编辑软件模块' : '新增软件模块'"
  >
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout" label="模块名">
        <a-input v-decorator="[
          'name',
          {
            initialValue: module && module.name,
            rules: [
              { required: true, message: '请输入模块名!' }
            ]
          }
        ]" :disabled="!!module" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="一级标题">
        <a-input v-decorator="[
          'title',
          {
            initialValue: module && module.title,
            rules: [{ required: true, message: '请输入一级标题!' }]
          }
        ]" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="二级标题">
        <a-input v-decorator="[
          'subTitle',
          {
            initialValue: module && module.subTitle,
            rules: [{ required: true, message: '请输入二级标题!' }]
          }
        ]" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="描述">
        <a-textarea v-decorator="[
          'des',
          {
            initialValue: module && module.des,
            rules: [ {required: true, message: '请输入描述!'} ]
          }
        ]" :autosize="{ minRows: 2, maxRows: 6 }" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="轮播图">
        <carousel-upload></carousel-upload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { createModule, modifyModule } from '@/api/form'
import ATextarea from 'ant-design-vue/es/input/TextArea'
import CarouselUpload from '@/components/CarouselUpload'

export default {
  components: { ATextarea, CarouselUpload },
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
