<template>
  <a-modal v-model='show' title='编辑轮播图'
           :destroyOnClose='true'
           :okText="uploading ? '上传中' : '开始上传'"
           @cancel='cancel'
           @ok='handleUpload'>
    <a-form
      :form='form'
      name='validate-form'
      v-bind='formItemLayout'
    >
      <a-form-item label='text'>
        <a-input
          v-decorator="['username']"
        ></a-input>
      </a-form-item>
      <a-form-item label='附件'>
        <a-upload
          list-type='picture'
          v-decorator="['files']"
          :file-list='fileList' :remove='handleRemove' :before-upload='beforeUpload'
        >
          <a-button>
            <a-icon type='upload' />
            点击上传
          </a-button>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>

</template>

<script>
export default {
  props: ['visible'],
  data () {
    return {
      value: '',
      form: this.$form.createForm(this),
      show: this.visible,
      fileList: [],
      uploading: false,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleUpload () {
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('files[]', file)
      })
      this.uploading = true
      // console.log(this.fileList, this.form.getFieldsValue())
      // 请求放到外层父组件
      this.$emit('create')
    }
  },
  watch: {
    visible () {
      this.show = this.visible
    }
  }
}
</script>

<style scoped>
</style>
