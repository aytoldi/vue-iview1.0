<template>
    <div>
        <Table :columns="columns2" :data="data2" border></Table>
    </div>
</template>
<script>
    import service from '../../../utils/service'
    import {Modal} from 'iview'

    export default {
        data() {
            return {
                editIndex: -1,//比如我某个删除和编辑的时候，使用某一个行对应的index(索引值)
                editVal: '',//input的临时值
                columns2: [
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, {row, index}) => { //h:createElemnt(), 某一行的数据，某一行的索引值
                            /*
                            * 列表内部的编辑按钮点击之后，1.已经隐藏了编辑按钮 ,  2.显示了正确和错误提示的icon , 3.显示了input 输入框
                            * */
                            let staticContent, edit;
                            if (this.editIndex === index) {
                                //单独的input
                                edit = [h('Input',
                                    {
                                        props: {
                                            value: row.name
                                        },
                                        on: {
                                            input: (val) => { //处理双向绑定
                                                this.editVal = val;
                                            }
                                        }
                                    })];

                                //左边的内容，两个图标
                                staticContent = [
                                    h('Icon', {
                                        props: {
                                            type: 'md-done-all',//修改操作
                                            color: '#000',
                                            size: 16
                                        },
                                        style: {
                                            margin: '10px',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                this.data2[index].name = this.editVal;
                                                this.editIndex = -1;
                                            }
                                        }
                                    }),
                                    h('Icon', {
                                        props: {
                                            type: 'md-close',//取消修改
                                            color: 'red',
                                            size: 16
                                        },
                                        style: {
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                this.editIndex = -1;
                                            }
                                        }
                                    })
                                ]
                            } else {//如果还没进行编辑的，普通行的情况下
                                edit = row.name;
                                /*
                                * A.table渲染之后，显示了修改的钢笔图标
                                * B.我点击了钢笔图标
                                * C.我点击钢笔图标之后，获取了点击行的index值和name
                                * D.临时变量接受本行的index,name
                                * */
                                staticContent = [h('Icon', {
                                    props: {
                                        type: 'md-create'
                                    },
                                    style: {
                                        cursor: 'pointer'
                                    },
                                    on: { // 通过自定义事件点击对应的某个行之后
                                        click: () => { //图标可以点击的
                                            this.editIndex = index; //点击了Icon按钮之后，本行的index值赋值给临时变量
                                            this.editVal = row.name;//不保存临时数据,不保存编辑的信息，赋值给原来请求过来的值
                                        }
                                    }
                                })]
                            }

                            //渲染对应的
                            return h('Row',
                                //如果有子节点，使用数组的方式处理
                                [
                                    h('Col', {props: {span: 18}}, edit),
                                    h('Col', {props: {span: 6}}, staticContent)
                                ]
                            )
                        }
                    },
                    {
                        title: '日期',
                        key: 'date'
                    },
                    {
                        title: '操作',
                        render: (h, {row,index}) => {
                            let self=this;
                            return h('Button', {
                                on: {
                                    click: (e) => {
                                        self.$nextTick(()=>{
                                            Modal.confirm({
                                                title: '提示',
                                                content: '确定要删除吗？',
                                                onOk: () => {
                                                    self.data2.splice(index,1)
                                                },
                                                onCancel: () => {
                                                    // 什么也不做
                                                }
                                            });
                                        });

                                    }
                                }
                            }, '删除');
                        }
                    }
                ],
                data2: []
            }
        },
        mounted() {
            this.getData();
        },
        methods: {

            getData() {
                service.renderPageList({page: 1, pageSize: 7}).then((res) => {
                    this.data2 = res.data.list
                })
            }
        }
    }
</script>