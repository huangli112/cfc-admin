<template>
  <a-card title='企业信息化' :bordered='false'>
    <div class='operate-wrapper'>
      <a-button  @click='handleAdd' type='primary'>新增</a-button>
    </div>

      <a-table :columns='columns' :data-source='dataSource'>
        <template slot='operation' slot-scope='text, record'>
          <a @click='Edit(record)'>编辑</a>
          <a-divider type='vertical' />
          <a>删除</a>
        </template>
      </a-table>
      <!-- 新增表单 -->
      <a-modal v-model='visible' title='新增企业信息化' okText='保存' @cancel='ModalCancel' @ok='ModalOk'>
        <a-form :form='form'>
          <a-form-item
            :label-col='formItemLayout.labelCol'
            :wrapper-col='formItemLayout.wrapperCol'
            label='标题'
          >
            <a-input v-decorator="['username']" placeholder='请输入标题' />
          </a-form-item>
          <a-form-item
            :label-col='formItemLayout.labelCol'
            :wrapper-col='formItemLayout.wrapperCol'
            label='描述'
          >
            <a-input v-decorator="['nickname']" placeholder='请输入描述' />
          </a-form-item>
          <a-form-item
            label='附件图'
            :label-col='formItemLayout.labelCol'
            :wrapper-col='formItemLayout.wrapperCol'
          >
            <a-upload
              list-type='picture'
              v-decorator="['files']"
              :file-list='fileList'
              :remove='handleRemove'
              :before-upload='beforeUpload'
            >
              <a-button>
                <a-icon type='upload' />
                点击上传
              </a-button>
            </a-upload>
          </a-form-item>
        </a-form>
      </a-modal>
  </a-card>

</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}
export default {
  data () {
    return {
      /* 新增表单Modal */
      visible: false,
      formItemLayout,
      form: this.$form.createForm(this, { name: 'infomationForm' }),
      /* 表格列 */
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
          width: '30%',
          fix: 'left'
        },
        {
          title: '描述',
          dataIndex: 'description'
        },
        {
          title: '附件图',
          dataIndex: 'image'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      /* 表格数据 */
      dataSource: [
        {
          key: '0',
          title: 'Edward King 0',
          description: '32',
          image: 'London, Park Lane no. 0'
        }
      ]
    }
  },
  methods: {
    /* 附件 */
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    /* 附件 */
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    /* 新增Modal */
    handleAdd () {
      this.visible = true
    },
    /* 表单提交 */
    ModalOk (e) {
      console.log('提交')
      this.visible = false
      this.form.resetFields()
    },
    /* 表单取消 */
    ModalCancel (e) {
      console.log('取消')
      this.visible = false
      this.form.resetFields()
    },
    Edit (record) {
      this.visible = true
      this.infomationForm.setFieldsValue(record)
      console.log(record, 'record')
    }
  }
}
</script>

<style>
</style>
