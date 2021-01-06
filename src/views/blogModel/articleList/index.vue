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
            :value="item.title"
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

    <div>
      博客模仿地址： https://www.zfsphp.com/
    </div>
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
      <el-table-column label="类型" align="center" prop="type" />
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

    <!-- 添加或修改公告对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1200px" append-to-body :close-on-click-modal="false">
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
                  :value="item.title"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容">
              <Editor v-model="form.content" height="320px" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-top:20px">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getArticle, getArticleById, addArticle, updateArticle, delArticle } from '@/api/blog/article'
  import { getAllType } from '@/api/blog/articleType'
  import Editor from '@/components/Editor'

  export default {
    name: 'Notice',
    components: {
      Editor
    },
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
          type: undefined,
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
      init () {
        this.getType()
        this.getList()
      },
      getType () {
        getAllType().then(res => {
          this.typeList = res.data.rows
        })
      },
      /** 查询公告列表 */
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
        this.title = '添加公告'
      },
      /** 修改按钮操作 */
      handleUpdate (row) {
        this.reset()
        const id = row.id || this.ids
        getArticleById(id).then(res => {
          this.form = res.data
          this.open = true
          this.title = '修改公告'
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
        this.$confirm('是否确认删除公告编号为"' + ids + '"的数据项?', '警告', {
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
