<template>
  <div>
    <a-card title='新闻动态详情' :bordered='false'>
      <a-form :form="form"  :label-col="{ span: 3 }" :wrapper-col="{ span: 19 }" @submit="handleSubmit">
        <a-form-item label="标题">
          <a-input
            v-decorator="['title', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>

        <a-form-item label="序号">
          <a-input
            v-decorator="['showIndex', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
        <a-form-item label="日期">
          <a-date-picker
            v-decorator="['date', { rules: [{ required: true, message: 'Please input your note!' }] }]"
            />
        </a-form-item>

        <a-form-item label='新闻内容'>
          <WEditor />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 5, offset: 18 }">
          <a-button type="default" style='margin-right: 10px' @click='cancel()'>
            取消
          </a-button>
          <a-button type="primary" html-type="submit">
            确定
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import WEditor from '../../components/WEditor/WEditor'

export default {
  components: { WEditor },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log(this.$route.params.id)
  },
  methods: {
    handleSubmit () {

    },
    cancel () {
      this.form.resetFields()
      this.$router.push({
        path: `/news`
      })
    }
  }
}
</script>

<style scoped>
</style>
