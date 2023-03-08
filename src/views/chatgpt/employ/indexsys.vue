<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
                  <el-form-item label="是否展示" prop="isShow">
                    <el-select v-model="queryParams.isShow" placeholder="请选择是否展示" clearable>
                      <el-option
                          v-for="dict in dict.type.is_use"
                          :key="dict.value"
                          :label="dict.label"
                          :value="dict.value"
                      />
                    </el-select>
                  </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['chatgpt:employ:sys:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['chatgpt:employ:sys:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['chatgpt:employ:sys:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['chatgpt:employ:sys:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="employList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
              <el-table-column label="名单主键" align="center" prop="anserId" />
              <el-table-column label="询问名称" align="center" prop="anserTitle"  :show-overflow-tooltip="true"  />
              <el-table-column label="询问内容" align="center" prop="anserContent"  :show-overflow-tooltip="true"  />
              <el-table-column label="是否展示" align="center" prop="isShow">
                <template slot-scope="scope">
                      <dict-tag :options="dict.type.is_use" :value="scope.row.isShow"/>
                </template>
              </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['chatgpt:employ:edit']"
          >修改</el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['chatgpt:employ:remove']"
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

    <!-- 添加或修改回答收录列对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="询问名称" prop="anserTitle">
                          <el-input v-model="form.anserTitle" type="textarea" placeholder="请输入内容" />
                        </el-form-item>
                        <el-form-item label="询问内容">
                          <editor v-model="form.anserContent" :min-height="192"/>
                        </el-form-item>
                        <el-form-item label="是否展示" prop="isShow">
                          <el-select v-model="form.isShow" placeholder="请选择是否展示">
                            <el-option
                                v-for="dict in dict.type.is_use"
                                :key="dict.value"
                                :label="dict.label"
                                :value="parseInt(dict.value)"
                            ></el-option>
                          </el-select>
                        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { listEmploysys, getEmploysys, delEmploysys, addEmploysys, updateEmploysys } from "@/api/chatgpt/employ";

  export default {
    name: "Employ",
        dicts: ['is_use'],
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 回答收录列表格数据
              employList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
                        anserTitle: null,
                        anserContent: null,
                        isShow: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询回答收录列列表 */
      getList() {
        this.loading = true;
        listEmploysys(this.queryParams).then(response => {
          this.employList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
                        anserId: null,
                        anserTitle: null,
                        anserContent: null,
                        userId: null,
                        isShow: null,
                        createBy: null,
                        createTime: null,
                        updateBy: null,
                        updateTime: null,
                        remark: null
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.anserId)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加回答收录列";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const anserId = row.anserId || this.ids
        getEmploysys(anserId).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改回答收录列";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.anserId != null) {
              updateEmploysys(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addEmploysys(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const anserIds = row.anserId || this.ids;
        this.$modal.confirm('是否确认删除回答收录列编号为"' + anserIds + '"的数据项？').then(function() {
          return delEmploysys(anserIds);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
  /** 导出按钮操作 */
  handleExport() {
    this.download('chatgpt/employ/sys/export', {
      ...this.queryParams
    }, `employ_${new Date().getTime()}.xlsx`)
  }
  }
  };
</script>
