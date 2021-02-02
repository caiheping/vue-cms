<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="status">
        <el-select v-model="queryParams.type" placeholder="类型" clearable size="small" @change="handleQuery">
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.title"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-has-permi="['blog:article:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-has-permi="['blog:article:update']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-has-permi="['blog:article:delete']"
        >删除</el-button>
      </el-col>
    </el-row>

<!--    <div>-->
<!--      博客模仿地址： https://www.zfsphp.com/-->
<!--    </div>-->
    <el-table v-loading="$store.state.app.loading" :data="dataList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="标题"
        align="center"
        prop="title"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="副标题"
        align="center"
        prop="subTitle"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="类型" align="center" :formatter="typeFormatter" prop="type" />
      <el-table-column label="热度" align="center" prop="hot" width="100" />
      <el-table-column label="创建者" align="center" prop="createdBy" width="100" />
      <el-table-column label="创建时间" align="center" prop="createdAt" :formatter="dateFormatter" width="200"> </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-has-permi="['blog:article:update']"
          >修改</el-button>
          <el-button
            class="delete"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-has-permi="['blog:article:delete']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-drawer
      size="100%"
      :title="title"
      :visible.sync="open"
      :append-to-body="true"
      :before-close="cancel"
      direction="rtl">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" placeholder="请输入标题" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="副标题" prop="subTitle">
              <el-input v-model="form.subTitle" placeholder="请输入副标题" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="类型" prop="type">
              <el-select v-model="form.type" placeholder="类型">
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.title"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容">
              <mavon-editor
                :toolbars="markdownOption"
                style="height: 600px;"
                v-model="form.content"
                ref="md"
                :imageFilter = "uploadBefore"
                @imgAdd="handleEditorImgAdd"
                @imgDel="handleEditorImgDel" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="drawerOps">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getArticle, getArticleById, addArticle, updateArticle, delArticle } from '@/api/admin/blog/article'
import { getAllType } from '@/api/admin/blog/articleType'
import { uploadAvatar } from '@/api/admin/base'
import { baseImgUrl } from '@/utils/config'

export default {
  data () {
    return {
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 公告表格数据
      dataList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      typeList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: undefined,
        type: undefined
      },
      imgFile: [],
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        subTitle: [
          { required: true, message: '副标题不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    typeFormatter (row, column) {
      let str = ''
      this.typeList.forEach(item => {
        if (item.key === row.type) {
          str = item.title
        }
      })
      return str
    },
    uploadBefore (f) {
      if (f.size > (1024 * 1024 * 0.5)) {
        this.$httpResponse('图片不能大于500K', 'warning')
        return false
      } else {
        return true
      }
    },
    handleEditorImgAdd (pos, file) {
      this.imgFile[pos] = file
      const formData = new FormData()
      formData.append('file', file)
      uploadAvatar(formData).then(res => {
        this.$httpResponse(res.message)
        console.log(baseImgUrl + res.data.path)
        if (res.code === 0) {
          this.$refs.md.$imglst2Url([[pos, baseImgUrl + res.data.path]])
        } else {
          this.$httpResponse('上传失败', 'error')
        }
      })
    },
    handleEditorImgDel (pos) {
      delete this.imgFile[pos]
    },
    init () {
      this.getType()
      this.getList()
    },
    getType () {
      getAllType().then(res => {
        this.typeList = res.data.rows
      })
    },
    /** 查询列表 */
    getList () {
      getArticle(this.queryParams).then(res => {
        this.dataList = res.data.rows
        this.total = res.data.count
      })
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset () {
      this.form = {
        id: undefined,
        title: undefined,
        subTitle: undefined,
        content: undefined,
        type: undefined
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset()
      this.open = true
      this.title = '添加文章'
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset()
      const id = row.id || this.ids
      getArticleById(id).then(res => {
        this.form = res.data
        this.open = true
        this.title = '修改文章'
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.userId = this.$store.state.user.userInfo.user.id
          if (this.form.id !== undefined) {
            updateArticle(this.form).then(res => {
              this.$httpResponse(res.message)
              this.open = false
              this.getList()
            })
          } else {
            addArticle(this.form).then(res => {
              this.$httpResponse(res.message)
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delArticle(ids)
      }).then(() => {
        this.getList()
        this.$httpResponse('删除成功')
      }).catch(function () {})
    }
  }
}
</script>

<style scoped lang="scss">
  .drawerOps{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>
