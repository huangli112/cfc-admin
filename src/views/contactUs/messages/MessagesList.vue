<template>
  <div>
    <a-card title='留言列表' :bordered='false'>
      <div class='table-search-wrapper'>
        <a-form>
          <a-row :gutter='48'>
            <a-col :md='8' :sm='24'>
              <a-form-item label='姓名' v-bind='formItemLayout'>
                <a-input v-model='form.name' />
              </a-form-item>
            </a-col>
            <a-col :md='8' :sm='24'>
              <a-form-item label='电话' v-bind='formItemLayout'>
                <a-input v-model='form.tel' />
              </a-form-item>
            </a-col>
            <a-col :md='8' :sm='24'>
              <a-form-item label='邮箱' v-bind='formItemLayout'>
                <a-input v-model='form.email' />
              </a-form-item>
            </a-col>

            <a-col :md='8' :sm='24'>
              <a-form-item label='模块' v-bind='formItemLayout'>
                <a-cascader v-model='form.modular' :display-render='displayRender' :options='options'
                            placeholder='请选择' />
              </a-form-item>
            </a-col>

            <a-col :md='formFold && 8 || 24' :sm='24'>
              <span
                class='search-buttons'
                :style="!formFold && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type='primary' icon='search' @click='handleSearch'>查询</a-button>
                <a-button icon='sync' @click='handleResetForm' style='margin-left: 8px'>重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <a-table
        :columns='columns'
        :dataSource='rows'
        rowKey='id'
        :pagination='pagination'
        :loading='tableLoading'
        @change='handleTableChange'
      >
        <span slot='serial' slot-scope='text, record, index'>{{ serial + index + 1 }}</span>

        <template slot='content' slot-scope='text'>
          <a-tooltip placement='topLeft' :title='text'>
            <span>{{ text }}</span>
          </a-tooltip>
        </template>

        <div slot='actions' slot-scope='record'>
          <a @click='onDelete(record.id)' href='javascript:0;'>删除</a>
        </div>

      </a-table>
    </a-card>
  </div>
</template>

<script>
import { queryFormMixin, tableMixin } from '@/mixins'
import { deleteMessage, getMessageList, getModuleList } from '@/api/common'

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'username',
    align: 'center'
  },
  {
    title: '电话',
    dataIndex: 'contacts',
    align: 'center'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'center'
  },
  {
    title: '模块',
    dataIndex: 'module',
    width: 200,
    align: 'center'
  },
  {
    title: '内容',
    dataIndex: 'content',
    scopedSlots: { customRender: 'content' },
    align: 'center'
  },
  {
    title: '更新时间',
    dataIndex: 'createdTime',
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
  name: 'MessagesList',
  mixins: [queryFormMixin, tableMixin],
  components: {},
  data () {
    return {
      // 查询条件
      form: {},
      // 角色下拉框 备选项
      messageList: [],
      moduleOptions: [],
      visible: false,
      currentAccount: null
    }
  },
  computed: {
    options () {
      return this.handleOptions(this.moduleOptions)
    }
  },
  methods: {
    handleOptions (data) {
      return data.map(item => {
        const obj = {}
        if (item.child) {
          obj.value = item.modular ? item.modular : item
          obj.label = item.modular ? item.modular : item
          obj.children = this.handleOptions(item.child)
        } else {
          obj.value = item.modular ? item.modular : item
          obj.label = item.modular ? item.modular : item
        }
        return obj
      })
    },
    handleResetForm () {
      this.form = {}
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    async search () {
      let params = { ...this.form }
      if (this.form.modular) {
        params.modular = this.form.modular[this.form.modular.length - 1]
      }

      this.tableLoading = true
      const { current, pageSize } = this.pagination
      const res = await getMessageList(
        { pageNumber: current, pageSize: pageSize },
        { ...params }
      )
      this.rows = res.list
      this.pagination.total = res.total
      this.tableLoading = false
    },
    handleSearch () {
      this.pagination.current = 1
      this.search()
    },
    async onDelete (id) {
      const self = this
      this.$confirm({
        title: '删除',
        content: `确定要删除该留言吗？`,
        okText: '删除',
        okType: 'danger',
        async onOk () {
          await deleteMessage(id)
          self.$message.success('删除成功')
          self.search()
        },
        onCancel () {
          self.$message.warning('取消删除')
        }
      })
    },
    async queryModuleOptions () {
      const res = await getModuleList()
      this.moduleOptions = res
    }
  },
  created () {
    this.columns = columns
    this.search()
    this.queryModuleOptions()
  }
}
</script>
