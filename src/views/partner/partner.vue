<template>
  <a-card title='合作伙伴' :bordered='false'>
    <div class='operate-wrapper'>
      <a-button type='primary' @click='showModal'>新增</a-button>
    </div>

    <a-list :grid='{ gutter: 16, column: 4 }' :data-source='listData'>
      <a-list-item slot='renderItem' slot-scope='item'>
        <a-card>
          <div style='width: 100%'>
            <div style='display: flex; justify-content: end '>
              <a-button type='primary' size='small' @click='showModal'>编辑</a-button>
            </div>
            <img :src='item.attachment' alt='' style='width: 100%; height: 60px;'>
          </div>
          <div>

          </div>
        </a-card>
      </a-list-item>
    </a-list>
    <file-upload
      ref="uploadForm"
      :visible='visible'
      @create="handleCreate"
      @cancel='handleCloseModal'
      label-name="合作图片"
    />
  </a-card>
</template>

<script>
import imgLogo from '../../assets/images/p2.png'
import imgLogo1 from '../../assets/images/p1.png'
import imgLogo3 from '../../assets/images/p3.png'
import FileUpload from '../../components/FileUpload/FileUpload'
const data = [
  {
    title: 'Title 1',
    attachment: imgLogo1
  },
  {
    title: 'Title 2',
    attachment: imgLogo
  },
  {
    title: 'Title 3',
    attachment: imgLogo3
  },
  {
    title: 'Title 4',
    attachment: imgLogo
  },
  {
    title: 'Title 4',
    attachment: imgLogo
  },
  {
    title: 'Title 4',
    attachment: imgLogo
  }
]
export default {
  components: { FileUpload },
  data () {
    return {
      listData: data,
      visible: false
    }
  },
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
    }
  }
}

</script>

<style scoped>
</style>
