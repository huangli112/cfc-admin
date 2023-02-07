<template>
  <div>
    <a-list item-layout='horizontal' :bordered='true' :data-source='[{title}]'>
      <a-list-item slot='renderItem' slot-scope='item'>
        <a slot='actions' @click='openUpload()'>编辑</a>
        <a-list-item-meta>
          <a slot='title' href='https://www.antdv.com/'>{{ item.title }}轮播图</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <FileUpload
      ref="uploadForm"
      :visible='isShowUpload'
      @create="handleCreate"
      @cancel='handleCloseModal' />
  </div>

</template>
<script>
import FileUpload from '../FileUpload'

export default {
  props: { title: String },
  components: { FileUpload },
  data () {
    return {
      fileList: [],
      uploading: false,
      isShowUpload: false
    }
  },
  methods: {
    openUpload () {
      this.isShowUpload = true
    },
    handleCloseModal () {
      this.isShowUpload = false
    },
    handleCreate () {
      const form = this.$refs.uploadForm.form
      form.validateFields((err, values) => {
        if (err) {
          return
        }
        console.log('Received values of form: ', values)
        form.resetFields()
        this.visible = false
      })
    }
  }
}
</script>
