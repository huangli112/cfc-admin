<template>
  <div>
    <a-card title='实训板块列表' :bordered='false'>
      <div class='operate-wrapper'>
        <a-button type='primary' @click='showModal'>新增实训板块</a-button>
      </div>
      <a-table
        :columns='columns'
        :dataSource='rows'
        rowKey='id'
        :pagination='pagination'
        @change='handleTableChange'
      >
        <template slot='copywriting'  slot-scope='text'>
          <a-tooltip  placement="topLeft" :title='text'>
           <span>{{text}}</span>
          </a-tooltip>
        </template>
        <div slot='actions' slot-scope='record'>
          <a @click='onEdit(record)' href='javascript:0;'>编辑</a>
          <a-divider type='vertical' />
          <a @click='onDelete(record.id)' href='javascript:0;'>删除</a>
        </div>
      </a-table>
    </a-card>

    <business-modal :visible='visible'
                    @create="handleCreate"
                    @cancel='handleCloseModal' />
  </div>
</template>

<script>
import { queryFormMixin, tableMixin, rangePickerMixin } from '@/mixins'
import BusinessModal from '../../components/BusinessModal/BusinessModal'

const columns = [
  {
    title: '主标题',
    dataIndex: 'title'

  },
  {
    title: '英文标题',
    dataIndex: 'enTitle'

  },
  {
    title: '内容',
    dataIndex: 'copywriting',
    ellipsis: true,

    scopedSlots: { customRender: 'copywriting' }
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'actions' },
    width: 120,
    fixed: 'right'
  }
]

export default {
  mixins: [queryFormMixin, tableMixin, rangePickerMixin],
  components: { BusinessModal },
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
      visible: false,
      rows: [
        {
          title: '财会实训',
          enTitle: 'ACCOUNTING PRACTICE',
          copywriting: '好会计拥有智能记账与保税、多维度财务核算等功能，提升财做账效率 好会计拥有智能记账与保税、多维度财务核算等功能，提升财做账效率'
        },
        {
          title: '软件编程',
          enTitle: 'SOFTWARE PROGRAMMING',
          copywriting: '好会计拥有智能记账与保税、多维度财务核算等功能，提升财做账效率 好会计拥有智能记账与保税、多维度财务核算等功能，提升财做账效率'
        }
      ]
    }
  },
  computed: {},
  methods: {
    handleCloseModal () {
      this.visible = false
    },
    showModal () {
      this.visible = true
    },
    // 保存数据 发送请求
    handleCreate () {
      this.visible = false
    },
    onEdit (row) {
      this.currentAccount = row
      this.visible = true
    },
    async onDelete (id) {
      const self = this
      this.$confirm({
        title: '删除',
        content: `确定要删除该选项吗？`,
        okText: '删除',
        okType: 'danger',
        onOk () {
          this.visible = false
        },
        onCancel () {
          self.$message.warning('取消删除')
        }
      })
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
  }

}
</script>
