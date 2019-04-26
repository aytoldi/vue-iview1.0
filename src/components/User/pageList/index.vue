<template>
    <div class="tabContainer1">
        <!--        :height="tableHeight" 自定义高度-->
        <Table border :columns="columns1" :data="data1" :loading="loading" size="small"></Table>
        <div class="text_center _pagenation">
            <Page
                    :total="total"
                    :current.sync="current"
                    show-sizer
                    @on-change="getData"
                    @on-page-size-change="handleChange"
            ></Page>
        </div>
        <Modal title="查看大图" v-model="visible" class-name="fl-image-modal">
            <img :src="imgUrl" v-if="visible" style="width: 100%"/>
        </Modal>
    </div>

</template>
<script>
    import service from '../../../utils/service'

    export default {
        data() {
            return {
                imgUrl: '', visible: false,
                columns1: [
                    {
                        title: 'Id',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        align: 'center',
                    }, {
                        title: 'Date',
                        key: 'date',
                        align: 'center',
                    },
                    {
                        title: 'urlImg',
                        key: 'urlImg',
                        align: 'center',
                        render: (h, params) => {
                            return h('img', {
                                style: {
                                    width: '100px',
                                    paddingLeft: '0!important',
                                    paddingRight: '0!important'
                                },
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                attrs: {
                                    src: params.row.urlImg, style: `height:65px;`
                                },
                                on: {
                                    click: (e) => {
                                        this.handleView(e.srcElement.currentSrc)
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: 'Price',
                        key: 'price',
                        align: 'center',
                    },
                    {
                        title: 'Num',
                        key: 'num',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'name',
                        width: 130,
                        render: (h,params) => {
                            if(params.row.num>4){
                                return h('Button', '空闲中')
                            }else{
                                return h('Button' ,{
                                    props: {
                                        type: 'primary',
                                        shape: 'circle',
                                    }
                                },'游戏中')
                            }

                        }
                    }
                ],//每一行
                data1: [],//表格数据
                loading: false,//表格加载中的状态
                total: 0,//当前数据总共多条
                current: 1,//当前第几页数据，current和表格双向绑定的
                //show-sizer 切换每页多少条的显示空间
                pageSize: 10
            }
        },
        mounted() {
            this.getData();

        },
        methods: {
            handleView(url) {
                this.imgUrl = url;
                this.visible = true;
            },
            //切换的时候监听
            handleChange(val) {
                this.pageSize = val;
                //注意点，异步的过程
                this.$nextTick(() => {
                    this.getData();
                });
            },
            //分页按钮点击的时候获取数据
            getData() {
                if (this.loading) {
                    return;
                }
                this.loading = true;
                service.renderPageList({page: this.current, pageSize: this.pageSize}).then((res) => {
                    this.data1 = res.data.list;
                    this.total = res.data.total;
                    this.loading = false;
                })

            }
        }
    }
</script>
<style scoped>
    ._pagenation{
        margin-top: 30px;
    }
</style>