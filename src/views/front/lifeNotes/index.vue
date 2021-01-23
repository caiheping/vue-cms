<template>
  <div class="lifeNotes">
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="item.createdAt" placement="top" v-for="item in notes" :key="item.id">
          <el-card>
            <h4>标题：{{item.title}}</h4>
            <p>{{item.content}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
// import { findNote } from '@/api/front/user'
// import dayjs from 'dayjs'
export default {
  data () {
    return {
      notes: [
        {
          title: 'lala',
          createdAt: '2020-10-11'
        }
      ]
    }
  },
  methods: {
    getDatas () {
      // findNote({ u_id: this.$route.params.u_id }).then(res => {
      //   if (res.code === 0) {
      //     res.data.forEach(item => {
      //       item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
      //     })
      //     this.notes = res.data
      //   }
      // })
    }
  },
  mounted () {
    this.getDatas()
  }
}
</script>

<style scoped lang="scss">
  .lifeNotes{
    display: flex;
    background: #fff;
    padding: 30px;
    min-height: calc(100vh - 260px);
    box-sizing: border-box;
  }
</style>
