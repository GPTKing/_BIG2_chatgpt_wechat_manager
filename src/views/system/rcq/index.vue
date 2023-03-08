<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="qq号" prop="rcqQqCode">
        <el-input
          v-model="queryParams.rcqQqCode"
          placeholder="请输入qq号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="qq密码" prop="rcqQqPassword">
        <el-input
          v-model="queryParams.rcqQqPassword"
          placeholder="请输入qq密码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台名称" prop="rcqPlatformName">
        <el-input
          v-model="queryParams.rcqPlatformName"
          placeholder="请输入平台名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否启动" prop="rcqIsRun">
        <el-select v-model="queryParams.rcqIsRun" placeholder="请选择是否启动" clearable>
          <el-option
            v-for="dict in dict.type.is_run"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="过期时间" prop="rcqRepireTime">
        <el-date-picker clearable
          v-model="queryParams.rcqRepireTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择过期时间">
        </el-date-picker>
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
          v-hasPermi="['system:rcq:add']"
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
          v-hasPermi="['system:rcq:edit']"
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
          v-hasPermi="['system:rcq:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:rcq:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="rcqList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="记录ID" align="center" prop="rcqId" />
      <el-table-column label="qq号" align="center" prop="rcqQqCode" />
      <el-table-column label="qq密码" align="center" prop="rcqQqPassword" />
      <el-table-column label="平台名称" align="center" prop="rcqPlatformName" />
      <el-table-column label="管理的qq群" align="center" prop="rcqManagerGorup" />
      <el-table-column label="是否启动" align="center" prop="rcqIsRun">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.is_run" :value="scope.row.rcqIsRun"/>
        </template>
      </el-table-column>
      <el-table-column label="过期时间" align="center" prop="rcqRepireTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.rcqRepireTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:rcq:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:rcq:remove']"
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

    <!-- 添加或修改机器人配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="qq号" prop="rcqQqCode">
          <el-input v-model="form.rcqQqCode" placeholder="请输入qq号" />
        </el-form-item>
        <el-form-item label="qq密码" prop="rcqQqPassword">
          <el-input v-model="form.rcqQqPassword" placeholder="请输入qq密码" />
        </el-form-item>
        <el-form-item label="平台名称" prop="rcqPlatformName">
          <el-input v-model="form.rcqPlatformName" placeholder="请输入平台名称" />
        </el-form-item>
        <el-form-item label="管理的qq群" prop="rcqManagerGorup">
          <el-input v-model="form.rcqManagerGorup" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="是否启动" prop="rcqIsRun">
          <el-select v-model="form.rcqIsRun" placeholder="请选择是否启动">
            <el-option
              v-for="dict in dict.type.is_run"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="过期时间" prop="rcqRepireTime">
          <el-date-picker clearable
            v-model="form.rcqRepireTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择过期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listRcq, getRcq, delRcq, addRcq, updateRcq } from "@/api/system/rcq";

export default {
  name: "Rcq",
  dicts: ['is_run'],
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
      // 机器人配置表格数据
      rcqList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        rcqQqCode: null,
        rcqQqPassword: null,
        rcqPlatformName: null,
        rcqManagerGorup: null,
        rcqIsRun: null,
        rcqRepireTime: null,
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
    /** 查询机器人配置列表 */
    getList() {
      this.loading = true;
      listRcq(this.queryParams).then(response => {
        this.rcqList = response.rows;
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
        rcqId: null,
        rcqQqCode: null,
        rcqQqPassword: null,
        rcqPlatformName: null,
        rcqManagerGorup: null,
        rcqIsRun: null,
        rcqRepireTime: null,
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
      this.ids = selection.map(item => item.rcqId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加机器人配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const rcqId = row.rcqId || this.ids
      getRcq(rcqId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改机器人配置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.rcqId != null) {
            updateRcq(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRcq(this.form).then(response => {
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
      const rcqIds = row.rcqId || this.ids;
      this.$modal.confirm('是否确认删除机器人配置编号为"' + rcqIds + '"的数据项？').then(function() {
        return delRcq(rcqIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/rcq/export', {
        ...this.queryParams
      }, `rcq_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
