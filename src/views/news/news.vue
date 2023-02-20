<template>
  <div>
    <a-card title='新闻动态Banner图' :bordered='false'>
      <CarouselUpload title='新闻动态banner图' code='NEWS_INFORMATION' :id='14' />
    </a-card>

    <a-card title='新闻动态列表' :bordered='false'>
      <div class='operate-wrapper'>
        <a-button type='primary' @click='linkNews()'>新增新闻动态</a-button>
      </div>
      <a-table
        :columns='columns'
        :dataSource='rows'
        rowKey='id'
        :pagination='pagination'
        @change='handleTableChange'
      >
        <template slot='copywriting' slot-scope='text'>
          <a-tooltip placement='topLeft' :title='text'>
            <span>{{ text }}</span>
          </a-tooltip>
        </template>
        <div slot='actions' slot-scope='record'>
          <a @click='linkNews(record.id)' href='javascript:0;'>编辑</a>
          <a-divider type='vertical' />
          <a @click='onDelete(record.id)' href='javascript:0;'>删除</a>
        </div>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { queryFormMixin, tableMixin, rangePickerMixin } from '@/mixins'
import CarouselUpload from '../../components/CarouselUpload/'

const columns = [
  {
    title: '标题',
    id: '12wwewewe3',
    dataIndex: 'title',
    align: 'center'
  },
  {
    title: '优先级',
    id: '135e111we3',
    dataIndex: 'number',
    align: 'center'
  },
  {
    title: '时间',
    id: '135ewe3333',
    dataIndex: 'date',
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
  components: { CarouselUpload },
  mixins: [queryFormMixin, tableMixin, rangePickerMixin],
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
          title: '企业IT规划发展的三个时期',
          number: '1',
          date: '2010.10.1'
        },
        {
          title: '企业IT规划发展的三个时期',
          number: '2',
          date: '2010.12.1'
        }
      ]
    }
  },
  computed: {},
  methods: {
    linkNews (id) {
      this.$router.push({
        path: `/news/detail/${id}`
      })
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
