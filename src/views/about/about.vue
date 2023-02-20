<template>
  <a-card title='关于公司' :bordered='false'>
    <a-form
      :label-col="{ span: 3 }" :wrapper-col="{ span: 19 }"
      :form='form'
      v-bind='formItemLayout'
      @submit='handleSubmit'
    >
      <a-form-item label='标题'>
        <a-input placeholder='请输入标题' v-decorator="['title']" />
      </a-form-item>
      <a-form-item label='英文标题'>
        <a-input placeholder='请输入英文标题'  v-decorator="['enTitle']"/>
      </a-form-item>
      <a-form-item label='描述'>
        <a-textarea placeholder='请输入描述' :rows='4'  v-decorator="['copywriting']" />
      </a-form-item>
      <a-form-item label='附件' extra='此处上传关于公司的背景图片'>
        <a-upload
          v-decorator="['upload',{valuePropName: 'fileList',getValueFromEvent: normFile}]"
          name='logo'
          action='/upload.do'
          list-type='picture'
        >
          <a-button type='primary'>
            <a-icon type='upload' />
            点击上传
          </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item :wrapper-col='{ span: 5, offset: 19 }'>
        <a-button type='primary' html-type='submit' style='margin-right:10px'>确定</a-button>
        <a-button @click='handleCancel'>取消</a-button>
      </a-form-item>
    </a-form>
  </a-card>

</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 }
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'validate_other' })
  },
  methods: {
    handleCancel () {
      this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    normFile (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    }
  }
}
</script>

<style>
</style>
