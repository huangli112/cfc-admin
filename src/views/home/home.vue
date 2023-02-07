<template>
  <div style='height: 100%'>
    <a-card title="首页" :bordered="false" style='height: 100%'>
      <CarouselUpload title='首页' style='margin: 20px 0' />
    </a-card>
  </div>
</template>s

<script>
import CarouselUpload from '../../components/CarouselUpload'

export default {
  components: { CarouselUpload },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
</style>
