<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
<!--                  <el-form-item label="唯一ID" prop="answeUserOpenid">-->
<!--                    <el-input-->
<!--                        v-model="queryParams.answeUserOpenid"-->
<!--                        placeholder="请输入唯一ID"-->
<!--                        clearable-->
<!--                        @keyup.enter.native="handleQuery"-->
<!--                    />-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="手机号" prop="answeUserPhone">-->
<!--                    <el-input-->
<!--                        v-model="queryParams.answeUserPhone"-->
<!--                        placeholder="请输入手机号"-->
<!--                        clearable-->
<!--                        @keyup.enter.native="handleQuery"-->
<!--                    />-->
<!--                  </el-form-item>-->
                  <el-form-item label="用户名称" prop="answeUserName">
                    <el-input
                        v-model="queryParams.answeUserName"
                        placeholder="请输入用户名称"
                        clearable
                        @keyup.enter.native="handleQuery"
                    />
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
            v-hasPermi="['chatgpt:user:sys:add']"
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
            v-hasPermi="['chatgpt:user:sys:edit']"
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
            v-hasPermi="['chatgpt:user:sys:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['chatgpt:user:sys:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
              <el-table-column label="名单主键" align="center" prop="answeUserId" />
              <el-table-column label="唯一ID" align="center" prop="answeUserOpenid"  :show-overflow-tooltip="true"  />
              <el-table-column label="用户名称" align="center" prop="answeUserName" />
              <el-table-column label="剩余次数" align="center" prop="answeUserBlanceNum" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['chatgpt:user:edit']"
          >修改</el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['chatgpt:user:remove']"
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

    <!-- 添加或修改小程序用户聊天列对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--                        <el-form-item label="唯一ID" prop="answeUserOpenid">-->
<!--                          <el-input v-model="form.answeUserOpenid" placeholder="请输入唯一ID" />-->
<!--                        </el-form-item>-->
                        <el-form-item label="手机号" prop="answeUserPhone">
                          <el-input v-model="form.answeUserPhone" placeholder="请输入手机号" />
                        </el-form-item>
                        <el-form-item label="用户名称" prop="answeUserName">
                          <el-input v-model="form.answeUserName" placeholder="请输入用户名称" />
                        </el-form-item>
                        <el-form-item label="头像" prop="answeUserAvatar">
                          <el-input v-model="form.answeUserAvatar" placeholder="请输入头像" />
                        </el-form-item>
<!--                        <el-form-item label="回答内容" prop="answeUserJson">-->
<!--                          <el-input v-model="form.answeUserJson" type="textarea" placeholder="请输入内容" />-->
<!--                        </el-form-item>-->
                        <el-form-item label="回答次数" prop="answeUserNum">
                          <el-input v-model="form.answeUserNum" placeholder="请输入回答次数" />
                        </el-form-item>
                        <el-form-item label="剩余次数" prop="answeUserBlanceNum">
                          <el-input v-model="form.answeUserBlanceNum" placeholder="请输入剩余次数" />
                        </el-form-item>
<!--                        <el-form-item label="备注" prop="remark">-->
<!--                          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />-->
<!--                        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { listUsersys, getUsersys, delUsersys, addUsersys, updateUsersys } from "@/api/chatgpt/user";

  export default {
    name: "User",
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
        // 小程序用户聊天列表格数据
              userList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
                        answeUserOpenid: null,
                        answeUserPhone: null,
                        answeUserName: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
                        answeUserOpenid: [
                    { required: true, message: "唯一ID不能为空", trigger: "blur" }
                  ],
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询小程序用户聊天列列表 */
      getList() {
        this.loading = true;
        listUsersys(this.queryParams).then(response => {
          this.userList = response.rows;
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
                        answeUserId: null,
                        answeUserOpenid: null,
                        answeUserPhone: null,
                        answeUserName: null,
                        answeUserAvatar: null,
                        answeUserJson: null,
                        answeUserNum: null,
                        answeUserBlanceNum: null,
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
        this.ids = selection.map(item => item.answeUserId)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加小程序用户聊天列";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const answeUserId = row.answeUserId || this.ids
        getUsersys(answeUserId).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改小程序用户聊天列";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.answeUserId != null) {
              updateUsersys(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addUsersys(this.form).then(response => {
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
        const answeUserIds = row.answeUserId || this.ids;
        this.$modal.confirm('是否确认删除小程序用户聊天列编号为"' + answeUserIds + '"的数据项？').then(function() {
          return delUsersys(answeUserIds);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
  /** 导出按钮操作 */
  handleExport() {
    this.download('chatgpt/user/sys/export', {
      ...this.queryParams
    }, `user_${new Date().getTime()}.xlsx`)
  }
  }
  };
</script>
