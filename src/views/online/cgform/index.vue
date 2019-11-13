<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input  v-model="query.value" placeholder="输入表名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <div  style="display: inline-block;margin: 0px 2px;">
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="dialog = true;isAdd = true" >新增</el-button>
      </div>
      <div style="display: inline-block;">
        <el-button
          :disabled="data.length === 0 || $refs.table.selection.length === 0"
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="doCgformButton"
        >自定义按钮</el-button>
      </div>
      <div style="display: inline-block;">
        <el-button 
          :disabled="data.length === 0 || $refs.table.selection.length === 0"
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="doEnhanceJs"
        >JS增强</el-button>
      </div>
      <div style="display: inline-block;">
        <el-button
          :disabled="data.length === 0 || $refs.table.selection.length === 0"
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="doEnhanceSql"
        >SQL增强</el-button>
      </div>
      <div style="display: inline-block;">
        <el-button
          :disabled="data.length === 0 || $refs.table.selection.length === 0"
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="doEnhanceJava"  >Java增强</el-button>
      </div>
      <div style="display: inline-block;">
        <el-button
          :disabled="data.length === 0 || $refs.table.selection.length === 0"
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-upload"
          @click="importOnlineForm" >从数据库导入表单</el-button>
      </div>
      <div  style="display: inline-block;margin: 0px 2px;">
        <el-button
          :disabled="data.length === 0 || $refs.table.selection.length === 0"
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="goGenerateCode" >代码生成</el-button>
      </div>
    <!--Form表单-->
    <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" :title="isAdd ? '新增任务' : '编辑任务'" append-to-body width="800px">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
        <el-form-item label="任务名称" prop="jobName">
          <el-input v-model="form.jobName" style="width: 460px;"/>
        </el-form-item>
        <el-form-item label="Bean名称" prop="beanName">
          <el-input v-model="form.beanName" style="width: 460px;"/>
        </el-form-item>
        <el-form-item label="执行方法" prop="methodName">
          <el-input v-model="form.methodName" style="width: 460px;"/>
        </el-form-item>
        <el-form-item label="参数内容">
          <el-input v-model="form.params" style="width: 460px;"/>
        </el-form-item>
        <el-form-item label="Cron表达式" prop="cronExpression">
          <el-input v-model="form.cronExpression" style="width: 460px;"/>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-radio v-model="form.isPause" label="false">启用</el-radio>
          <el-radio v-model="form.isPause" label="true" >暂停</el-radio>
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input v-model="form.remark" style="width: 460px;" rows="2" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
      <!--表格渲染-->
      <el-table v-loading="loading" ref="table" :data="data" size="small" style="width: 100%;">
        <el-table-column type="selection" width="55" />
        <el-table-column :show-overflow-tooltip="true" prop="id" width="100px" label="表名" />
        <el-table-column :show-overflow-tooltip="true" prop="tableName" width="100px" label="表名" />
        <el-table-column :show-overflow-tooltip="true" prop="tableType" width="100px" label="表类型" />
        <el-table-column :show-overflow-tooltip="true" prop="tableTxt" width="100px" label="表描述" />
        <el-table-column :show-overflow-tooltip="true" prop="tableVersion" width="100px" label="版本" />
        <el-table-column :show-overflow-tooltip="true" prop="jobName"  width="140px" label="同步数据库状态"/>
        <el-table-column label="操作" width="180px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button 
              size="mini"
              style="margin-right: 3px;"
              type="text"
              @click="edit(scope.row)" >编辑</el-button>
            <el-button 
              size="mini"
              style="margin-left: -2px"
              type="text"
              @click="execute(scope.row.id)"
            >执行</el-button>
            <el-button 
              size="mini"
              style="margin-left: 3px"
              type="text"
              @click="updateStatus(scope.row.id, scope.row.isPause ? '恢复' : '暂停')"
            >{{ scope.row.isPause ? "恢复" : "暂停" }}</el-button>
            <el-popover 
              :ref="scope.row.id"
              placement="top"
              width="200"
            >
              <p>确定停止并删除该任务吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                <el-button
                  :loading="delLoading"
                  type="primary"
                  size="mini"
                  @click="subDelete(scope.row.id)"
                >确定</el-button>
              </div>
              <el-button slot="reference" type="text" size="mini">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page + 1"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange" />
  </div>

</template>
<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import { parseTime, downloadFile } from "@/utils/index";
export default {
  name: "cgform",
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      isAdd: false,
      loading: false,
      dialog: false,
      form: {
        jobName: "",
        beanName: "",
        methodName: "",
        params: "",
        cronExpression: "",
        isPause: "false",
        remark: ""
      },
      permissionIds: [],
      rules: {
        jobName: [
          { required: true, message: "请输入任务名称", trigger: "blur" }
        ],
        beanName: [
          { required: true, message: "请输入Bean名称", trigger: "blur" }
        ],
        methodName: [
          { required: true, message: "请输入方法名称", trigger: "blur" }
        ],
        cronExpression: [
          { required: true, message: "请输入Cron表达式", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = "api/cgform/list";
      const sort = "id,desc";
      const query = this.query;
      const value = query.value;
      this.params = { page: this.page, size: this.size, sort: sort };
      if (value) {
        this.params["tableName"] = value;
      }
      return true;
    },
    execute(id) {
      execution(id)
        .then(res => {
          this.$notify({
            title: "执行成功",
            type: "success",
            duration: 2500
          });
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    updateStatus(id, status) {
      updateIsPause(id)
        .then(res => {
          this.init();
          this.$notify({
            title: status + "成功",
            type: "success",
            duration: 2500
          });
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    doCgformButton() {
      console.log("doCgformButton");
    },
    doEnhanceJs() {
      console.log("doEnhanceJs");
    },
    doEnhanceSql() {
      console.log("doEnhanceSql");
    },
    importOnlineForm() {
      console.log("importOnlineForm");
    },
    doEnhanceJava() {
      console.log("doEnhanceJava");
    },
    goGenerateCode() {
      console.log("goGenerateCode");
    },
    subDelete(id) {
      this.delLoading = true;
      del(id)
        .then(res => {
          this.delLoading = false;
          this.$refs[id].doClose();
          this.dleChangePage();
          this.init();
          this.$notify({
            title: "删除成功",
            type: "success",
            duration: 2500
          });
        })
        .catch(err => {
          this.delLoading = false;
          this.$refs[id].doClose();
          console.log(err.response.data.message);
        });
    },
    toQuery() {
      this.page = 0;
      this.init();
    },
    doLog() {
      this.$refs.log.dialog = true;
      this.$refs.log.doInit();
    },
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.isAdd) {
            this.doAdd();
          } else this.doEdit();
        } else {
          return false;
        }
      });
    },
    doAdd() {
      add(this.form)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "添加成功",
            type: "success",
            duration: 2500
          });
          this.loading = false;
          this.init();
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    doEdit() {
      edit(this.form)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500
          });
          this.loading = false;
          this.init();
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        jobName: "",
        beanName: "",
        methodName: "",
        params: "",
        cronExpression: "",
        isPause: "false",
        remark: ""
      };
    },
    edit(data) {
      console.log(data)
      this.isAdd = false;
      this.form = {
        id: data.id,
        jobName: data.jobName,
        beanName: data.beanName,
        methodName: data.methodName,
        params: data.params,
        cronExpression: data.cronExpression,
        remark: data.remark
      };
      this.dialog = true;
    },
    download() {
      this.beforeInit();
      this.downloadLoading = true;
      downloadJobs(this.params)
        .then(result => {
          downloadFile(result, "任务列表", "xlsx");
          this.downloadLoading = false;
        })
        .catch(() => {
          this.downloadLoading = false;
        });
    }
  }
};
</script>