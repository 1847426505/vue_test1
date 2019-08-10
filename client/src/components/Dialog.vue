<template>
    <div class="dialog">
        <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.show"
            width="30%">
            <div class="form">
              <el-form
                ref="form"
                :model="formData"
                :rules = "form_rules"
                label-width="120px"
                style="margin:10px; width:auto;"
              >
                <el-form-item lable="收支类形">
                  <el-select v-model="formData.type" placeholder="收支类型">
                      <el-option v-for="(item,index) in format_type_list" :key="index" :label="item" :value="item"> </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="describe" label="收支描述">
                    <el-input type="describe" v-model="formData.describe"></el-input>
                </el-form-item >
                <el-form-item prop="income" label="收入">
                    <el-input type="income" v-model="formData.income"></el-input>
                </el-form-item >
                <el-form-item prop="expend" label="支出">
                    <el-input type="expend" v-model="formData.expend"></el-input>
                </el-form-item >
                <el-form-item prop="cash" label="账户现金">
                    <el-input  type="cash" v-model="formData.cash"></el-input>
                </el-form-item >
                <el-form-item prop="remark" label="备注">
                    <el-input type="remark" v-model="formData.remark"></el-input>
                </el-form-item >

              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="success" @click="onSubmit('form')">提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
      return {
          
          format_type_list:[
              "提现",
              "提现手续费",
              "充值",
              "充值卷",
              "转账"],
          form_rules :{
            describe:[
              {required:true,message:'收支描述不能为空',trigger:'blur'}
            ],
            income:[
              {required:true,message:'收入不能为空',trigger:'blur'}
            ],
            expend:[
              {required:true,message:'支出不能为空',trigger:'blur'}
            ],
            cash:[
              {required:true,message:'账户现金不能为空',trigger:'blur'}
            ],
            remark:[
              {required:true,message:'备注不能为空',trigger:'blur'}
            ]
          } 
      };
    },
    props:{dialog:Object,formData:Object},
    methods: {
      onSubmit(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            const url = this.dialog.option == 'add' ? 'add':`edit/${this.formData.id}`;
            this.$axios.post(`/api/profiles/${url}`,this.formData)
              .then(res=>{
                //添加成功
                this.$message({
                  message:this.dialog.title,
                  type: 'success'
                })
                this.dialog.show = false;
                this.$emit('update')
              })
          } 
        });
      }
    }
  };
</script>