<template>
  <a-modal
    :visible='show'
    okText='保存'
    @cancel="() => { $emit('cancel') }"
    @ok="() => { $emit('create') }"
  >
    <a-form layout='vertical' :form='form'>
      <a-form-item label='主标题'>
        <a-input
          v-decorator="[
              'title',
              {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              }
            ]"
        />
      </a-form-item>
      <a-form-item label='副标题'>
        <a-input
          v-decorator="[
              'subheading',
              {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              }
            ]"
        />
      </a-form-item>
      <a-form-item label='英文标题'>
        <a-input
          v-decorator="[
              'enTitle',
              {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              }
            ]"
        />
      </a-form-item>
      <a-form-item label='内容'>
        <a-input
          type='textarea'
          v-decorator="['copywriting']"
        />
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'business-modal',
  props: ['btnText', 'visible'],
  data () {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleCreate () {
      const form = this.$refs.collectionForm.form
      form.validateFields((err, values) => {
        if (err) {
          return
        }
        console.log('Received values of form: ', values)
        form.resetFields()
        this.visible = false
      })
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
