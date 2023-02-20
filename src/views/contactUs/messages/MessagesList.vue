<template>
  <div>
    <a-card title='留言列表' :bordered='false'>
      <div class='table-search-wrapper'>
        <a-form>
          <a-row :gutter='48'>
            <a-col :md='8' :sm='24'>
              <a-form-item label='姓名' v-bind='formItemLayout'>
                <a-input v-model='form.username' />
              </a-form-item>
            </a-col>
            <a-col :md='8' :sm='24'>
              <a-form-item label='电话' v-bind='formItemLayout'>
                <a-input v-model='form.contacts' />
              </a-form-item>
            </a-col>
            <a-col :md='8' :sm='24'>
              <a-form-item label='邮箱' v-bind='formItemLayout'>
                <a-input v-model='form.email' />
              </a-form-item>
            </a-col>
            <template v-if='!formFold'>
              <a-col :md='8' :sm='24'>
                <a-form-item label='模块' v-bind='formItemLayout'>
                  <a-select v-model='form.customsId' :options='roleOptions' allowClear placeholder='请选择'></a-select>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md='formFold && 8 || 24' :sm='24'>
              <span
                class='search-buttons'
                :style="!formFold && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type='primary' icon='search' @click='handleSearch'>查询</a-button>
                <a-button icon='sync' @click='handleResetForm' style='margin-left: 8px'>重置</a-button>
                <a @click='toggleFold' style='margin-left: 8px'>
                  {{ formFold ? '展开' : '收起' }}
                  <a-icon :type="formFold ? 'down' : 'up'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <a-table
        :columns='columns'
        :dataSource='rows'
        :rowSelection='rowSelection'
        rowKey='id'
        :pagination='pagination'
        :loading='tableLoading'
        @change='handleTableChange'
      >
        <span slot='serial' slot-scope='text, record, index'>{{ serial + index + 1 }}</span>

        <span slot='' slot-scope='roleId'>{{ roleId | roleFilter(roleOptions) }}</span>

        <template slot='content' slot-scope='text'>
          <a-tooltip placement='topLeft' :title='text'>
            <span>{{ text }}</span>
          </a-tooltip>
        </template>

        <span slot='updateTime' slot-scope='updateTime'>
          {{ new Date(updateTime) | formatDate('yyyy-MM-dd hh:mm:ss') }}
        </span>

        <div slot='actions' slot-scope='record'>
          <a @click='onDelete(record.id)' href='javascript:0;'>删除</a>
        </div>

      </a-table>
    </a-card>
  </div>
</template>

<script>
import { queryFormMixin, tableMixin, rangePickerMixin } from '@/mixins'
import { deleteAccount, getRoles, getUsers } from '@/api/form'
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
    dataIndex: 'updateTime',
    scopedSlots: { customRender: 'updateTime' },
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
  mixins: [queryFormMixin, tableMixin, rangePickerMixin],
  components: {},
  filters: {
    roleFilter (roleId, roleOptions) {
      let role = null
      roleOptions.forEach(item => {
        if (item.value === roleId) {
          role = item
        }
      })
      return role.label
    }
  },
  data () {
    return {
      // 查询条件
      form: {},
      // 当前选中行
      selectedRowKeys: [],

      // 角色下拉框 备选项
      roleOptions: [],

      visible: false,
      currentAccount: null
    }
  },
  computed: {
    rowSelection () {
      const self = this
      return {
        selectedRowKeys: self.selectedRowKeys,
        onChange: (keys, rows) => {
          self.selectedRowKeys = keys
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.status === 1
          }
        })
      }
    },
    isDisabled () {
      return this.selectedRowKeys.length === 0
    }
  },
  methods: {
    async search () {
      this.tableLoading = true
      const { current, pageSize } = this.pagination
      const res = await getUsers({
        ...this.form,
        current,
        pageSize
      })
      this.rows = res
      this.pagination.total = res.length
      this.tableLoading = false
    },
    handleSearch () {
      this.pagination.current = 1
      this.search()
    },
    onCreate () {
      this.visible = true
    },
    onEdit (row) {
      this.currentAccount = row
      this.visible = true
    },
    async onDelete (id) {
      const self = this
      this.$confirm({
        title: '删除',
        content: `确定要删除选该用户吗？`,
        okText: '删除',
        okType: 'danger',
        async onOk () {
          await deleteAccount(id)
          self.$message.success('删除成功')
          self.search()
        },
        onCancel () {
          self.$message.warning('取消删除')
        }
      })
    },
    async queryRoles () {
      const res = await getRoles()
      this.roleOptions = res
    },
    onModalClose (isRefresh) {
      // 如果子组件要求父组件刷新
      if (isRefresh) {
        this.search()
      }
      // 关闭 modal时清空currentAccount，防止 新增/修改 混乱
      this.currentAccount = null
      this.visible = false
    }
  },
  created () {
    this.columns = columns
    this.queryRoles()
    this.search()
  }
}
</script>
