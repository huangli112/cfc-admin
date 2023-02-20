<template>
  <div>
    <a-card title="软件产品" :bordered="false">
      <div class="table-search-wrapper">
        <a-form>
          <a-row>
            <a-col :md="4" :sm="24">
              <a-form-item label="模块名" v-bind="formItemLayout">
                <a-select v-model="selectModuleIndex" :options="moduleList" @change="onSelectChange"></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="10" :sm="24" :offset="1">
              <a-button type="primary" icon="plus" @click="onAdd">新增子模块</a-button>
              <a-button type="default" @click="editModal" style='margin: 0 10px'>编辑选中模块</a-button>
              <a-button type="danger"  @click="onDelete">删除选中模块</a-button>
            </a-col>

          </a-row>
        </a-form>
      </div>

      <a-divider>模块内容</a-divider>

      <a-table
        style="margin-top: 40px;"
        :columns="columns"
        :dataSource="[selectModule]"
        rowKey="name"
        :pagination="false"
        :loading="tableLoading"
      >
        <span slot="updateTime" slot-scope="updateTime">
          {{ new Date(updateTime) | formatDate('yyyy-MM-dd hh:mm:ss') }}
        </span>

        <div slot="actions" slot-scope="record">
          <a @click="onEditContent(record)" href="javascript:0;">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDeleteContent(record.id)" href="javascript:0;">删除</a>
        </div>

      </a-table>

      <soft-modal :visible="visible" :module="selectModule" @close="onModalClose"></soft-modal>
    </a-card>
  </div>
</template>

<script>
import { tableMixin } from '@/mixins'
import { getModule, deleteModule } from '@/api/form'
import SoftModal from './components/SoftModal'

const columns = [
  {
    title: '模块名',
    dataIndex: 'name',
    align: 'center',
    width: 100
  },
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center'
  },
  {
    title: '副标题',
    dataIndex: 'subheading',
    align: 'center'
  },
  {
    title: '内容',
    dataIndex: 'des',
    align: 'center'
  },
  {
    title: '内容描述',
    dataIndex: 'des',
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
const complate = {
  name: '',
  title: '',
  subTitle: '',
  des: ''
}

export default {
  mixins: [tableMixin],
  components: { SoftModal },
  data () {
    return {
      moduleList: [
        {
          value: 0,
          label: '好会计'
        },
        {
          value: 1,
          label: '好业财'
        },
        {
          value: 2,
          label: '好生意'
        },
        {
          value: 3,
          label: '易代帐'
        }
      ],
      moduleData: [
        {
          name: '好会计',
          title: '好会计-一级标题',
          subTitle: '好会计-二级标题',
          des: '好会计-描述'
        },
        {
          name: '好业财',
          title: '好业财-一级标题',
          subTitle: '好业财-二级标题',
          des: '好业财-描述'
        },
        {
          name: '好生意',
          title: '好生意-一级标题',
          subTitle: '好生意-二级标题',
          des: '好生意-描述'
        },
        {
          name: '易代帐',
          title: '易代帐-一级标题',
          subTitle: '易代帐-二级标题',
          des: '易代帐-描述'
        }
      ],
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      selectModule: null,
      selectModuleIndex: 0,
      visible: false
    }
  },
  computed: {

  },
  methods: {
    async getModuleList () {
      this.tableLoading = true
      let res = await getModule()
      this.moduleData = res
      this.moduleList = this.moduleData.map((item, index, arr) => {
        return { value: index, label: item.name }
      })
      this.tableLoading = false
    },
    onAdd () {
      this.moduleList.push({ value: this.moduleList.length, label: 'new module' })
      this.selectModuleIndex = this.moduleList.length - 1
      this.selectModule = complate
    },
    editModal () {

    },
    onEditContent (row) {
      console.log(row)
      this.currentAccount = row
      this.visible = true
    },
    async onDeleteContent (id) {
      const self = this
      this.$confirm({
        title: '删除',
        content: `确定要删除该模块吗？`,
        okText: '删除',
        okType: 'danger',
        async onOk () {
          await deleteModule(id)
          self.$message.success('删除成功')
        },
        onCancel () {
          self.$message.warning('取消删除')
        }
      })
    },
    onModalClose (isRefresh) {
      if (isRefresh) {
        this.getModule()
      }
      this.selectModule = this.moduleData[0]
      this.selectModuleIndex = 0
      this.visible = false
    },
    onSelectChange (index) {
      this.selectModule = this.moduleData[index] || complate
    }
  },
  created () {
    this.columns = columns
    this.selectModule = this.moduleData[0] || complate
    // this.getModuleList()
  }
}
</script>
