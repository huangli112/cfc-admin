<template>
  <div>
    <a-card title='联系我们Banner图' :bordered='false'>
      <CarouselUpload title='联系我们Banner图' code='CONTACT_US' :id='16' />
    </a-card>
    <a-card title='联系信息' :bordered='false'>
      <editList />
      <MessagesList />
    </a-card>
  </div>

</template>

<script>
import MessagesList from './messages/MessagesList'
import CarouselUpload from '@/components/CarouselUpload'
import { getContactInfo } from '@/api/common'
import { UploadUrl } from '@/utils/constant'
import editList from '@/views/contactUs/editList/editList'

export default {
  components: { MessagesList, CarouselUpload, editList },
  data () {
    return {
      action: UploadUrl,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 }
      },
      formData: {},
      loading: false,
      fieldId: ''
    }
  },
  mounted () {
    // 获取联系信息详情
    this.getFormInfo()
  },
  methods: {
    async getFormInfo () {
      this.formData = await getContactInfo()
      console.log(this.formData)
    },
    handleFileChange (info) {
      console.log(info)
    },
    handleCancel () {
      this.form.resetFields()
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          // 发送请求
        }
      })

      // d
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
