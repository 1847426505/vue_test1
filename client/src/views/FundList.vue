<template>
    <div class="fillContainer">
        <div>
            <el-form :inline="true" ref="add_data" :model="search_data">
                <!-- 筛选 -->
                <el-form-item label="按照时间筛选:">
                    <el-date-picker
                        v-model="search_data.startTime"
                        type="datetime"
                        placeholder="选择开始时间">
                    </el-date-picker>
                    --
                    <el-date-picker
                        v-model="search_data.endTime"
                        type="datetime"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" size="small" icon="shearch" @click="handleSearch()">查询</el-button>
                </el-form-item>

                <el-form-item class="btnRight">
                    <el-button type="primary" v-if="user.identity == 'manager'" size="small" icon="view" @click="handleAdd()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableContainer">
            <el-table
                v-if = 'tableData.length>0'
                :data="tableData"
                border
                stripe
                style="width: 100%">
                <el-table-column label="索引" type="index" width="50"> </el-table-column>
                <el-table-column  prop="date" align="center" label="日期" width="200"></el-table-column>
                <el-table-column prop="type" align="center" label="收支类型" width="100"></el-table-column>
                <el-table-column prop="describe" align="center" label="收支描述" width="180"></el-table-column>
                <el-table-column prop="income" align="center" label="收入" width="100"></el-table-column>
                <el-table-column prop="expend" align="center" label="支出" width="100"></el-table-column>
                <el-table-column prop="cash" align="center" label="账户现金" width="100"></el-table-column>
                <el-table-column prop="remark" align="center" label="备注" width="200"></el-table-column>
                <el-table-column label="操作" width="180" align='center' fixed="right" >
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
             <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="paginations.page_index"
                            :page-sizes="paginations.page_sizes"
                            :page-size="paginations.page_size"
                            :layout="paginations.layout"
                            :total="paginations.total">
                        </el-pagination>
                    </div>
                 </el-col>
             </el-row>
        </div>
        <Dialog :dialog="dialog" :formData = "formData" @update="getProfile"></Dialog>
    </div>
    

</template>
<script>
import Dialog from "../components/Dialog"
export default {
    name:'fundList',
    
    data(){
        return {
            search_data:{
                startTime:"",
                endTime:""
            },
            filterTableData:[],
            paginations:{
                page_index: 1, //当前位于哪页
                total: 0, //总数
                page_size: 5, //一页显示多少条
                page_sizes:[5,10,15,20], //每页显示多少条
                layout:'total,sizes,prev,next,jumper' //翻页属性
            },
            tableData:[],
            allTableData:[],
            dialog:{
                show:false,
                title:'',
                option:'edit'
            },
            formData:{
                type:'',
                describe:'',
                income:'',
                expend:'',
                cash:'',
                remark:'',
                id:''
            },
        }
    },
    created(){
        this.getProfile();
    },
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
    methods:{
        getProfile(){
            //获取表格数据
            this.$axios.get('/api/profiles')
                .then(res=>{
                   //this.tableData = res.data
                    this.allTableData = res.data
                    this.filterTableData = res.data
                    //设置分页
                    this.setPaginations();
                })
                .catch(err=>{
                    console.log('请求失败')
                })
        },
        setPaginations(){
            //分页属性设置
            this.paginations.total = this.allTableData.length;
            this.paginations.page_index = 1;
            this.paginations.page_size = 5;
            //设置默认的分页数据
            this.tableData = this.allTableData.filter((item,index)=>{
                return index < this.paginations.page_size;
            })
        },
        handleEdit(index, row) {
            //编辑
            this.dialog={
                show:true,
                title:'修改资金信息',
                option:'edit'
            };
            this.formData={
                type:row.type,
                describe:row.describe,
                income:row.income,
                expend:row.expend,
                cash:row.cash,
                remark:row.remark,
                id:row._id
            };
        },
        handleDelete(index, row) {
            this.$axios.delete(`/api/profiles/delete/${row._id}`)   
                .then(res=>{
                    this.$message('删除成功')
                    this.getProfile()
                })
        },
        handleAdd(){
              //添加
            this.dialog={
                show:true,
                title:'添加资金信息',
                option:'add'
            };
            this.formData={
                type:'',
                describe:'',
                income:'',
                expend:'',
                cash:'',
                remark:'',
                id:''
            };
        },
        handleSizeChange(page_size){
            //切换size
            this.paginations.page_index = 1
            this.paginations.page_size = page_size;
            this.tableData = this.allTableData.filter((item,index)=>{
                return index < page_size;
            })
        },
        handleCurrentChange(page){
            //获取当前页
            let index = this.paginations.page_size * (page - 1);
            //数据总数
            let nums = this.paginations.page_size * page
            //容器
            let tables = [];
            for(let i = index;i<nums;i++){
                if(this.allTableData[i]){
                    tables.push(this.allTableData[i])
                }
                this.tableData =tables;
            }
        },
        handleSearch(){
            //筛选
            if(!this.search_data.startTime || !this.search_data.endTime){
                this.$message({
                    type:'warning',
                    message:'请选择时间区间'
                })
                this.getProfile()
                return;
            }
            const sTime = this.search_data.startTime.getTime();
            const eTime = this.search_data.endTime.getTime();
            this.allTableData = this.filterTableData.filter(item=>{
                let date = new Date(item.date)
                let time = date.getTime()
                return time >= sTime && time<= eTime
            })
            //分页数据
            this.setPaginations();
        }
    },
    components:{
        Dialog
    },
}
</script>
<style scoped>
.fillContainer{
    padding:16px;
    box-sizing:border-box;
    
}
.btnRight{
    float: right;
}
.pagination{
    margin-top:10px;
    text-align: right; 
}
</style>

