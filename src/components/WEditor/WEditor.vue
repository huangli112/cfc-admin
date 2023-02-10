<template>
  <div style='border: 1px solid #ccc; '>
    <Toolbar
      style='border-bottom: 1px solid #ccc'
      :editor='editor'
      :defaultConfig='toolbarConfig'
      :mode='mode'
    />
    <Editor
      style='height: 500px; overflow-y: hidden;'
      v-model='html'
      :defaultConfig='editorConfig'
      :mode='mode'
      @onCreated='onCreated'
    />
  </div>
</template>

<script>
/* eslint-disable space-before-function-paren */
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错}
    }
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = '<p>IT规划不是摆设，它必须在得到切实可行的实施之后，才能发挥出促进业务、提升管理的作用，否则就是一堆废纸。因此，“落地”环节对IT规划关重要。如今IT规划已经不是个新鲜IT规划不是摆设，它必须在得到切实可行的实施之后，才能发挥出促进业务、提升管理的作用，否则就是一堆废纸。因此，“落地”环节对IT规划关重要。如今IT规划已经不是个新鲜...IT规划不是摆设，它必须在得到切实可行的实施之后，才能发挥出促进业务、提升管理的作用，否则就是一堆废纸。因此，“落地”环节对IT规划关重要。如今IT规划已经不是个新鲜IT规划不是摆设，它必须在得到切实可行的实施之后，才能发挥出促进业务、提升管理的作用，否则就是一堆废纸。因此，“落地”环节对IT规划关重要。如今IT规划已经不是个新鲜...IT规划不是摆设，它必须在得到切实可行的实施之后，才能发挥出促进业务、提升管理的作用，否则就是一堆废纸。因此，“落地”</p>'
    }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style src='@wangeditor/editor/dist/css/style.css'></style>
<style>
/deep/ .w-e-full-screen-container{
  z-index: 999 !important;
}
</style>

<style scoped>

</style>
