<template>
    <div>
        <Table :columns="columns2" :data="data3" border></Table>
    </div>
</template>
<script>
    import service from '../../../utils/service'
    import tools from '../../../utils/tool'

    export default {
        data() {
            return {
                currentIndex: -1,// 哪一行的数据进行编辑
                currentNameValue: '',
                currentDateValue: {},
                columns2: [
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, {row, index}) => {
                            let edit;
                            if (this.currentIndex === index) {
                                //渲染各种输入框，比如Input，Data-picker
                                edit = [
                                    h('Input', {
                                        props: {
                                            value: row.name
                                        },
                                        on: {
                                            input: (val) => {
                                                this.currentNameValue = val;
                                            }
                                        }
                                    })
                                ]
                            }
                            //否则，默认的情况下
                            else {
                                edit = row.name;
                            }

                            return h('div', [edit])
                        }
                    },
                    {
                        title: '日期',
                        key: 'date',
                        render: (h, {row, index}) => {
                            let edit;
                            if (this.currentIndex === index) {
                                //渲染各种输入框，比如Input，Data-picker
                                edit = [
                                    h('DatePicker', {
                                        props: {
                                            props: {
                                                type: 'date',
                                                format: 'yyyy-MM-dd',
                                                value: tools.formatDate(new Date(row.date), 'yyyy-MM-dd ')
                                            },
                                        },
                                        on: {
                                            'on-change': (val) => {
                                                // this.currentDateValue=formatDate(new Date(val),'yyyy-MM-dd hh')
                                                this.currentDateValue = tools.formatDate(new Date(val), 'yyyy-MM-dd ')
                                            }
                                        }
                                    })
                                ]
                            }
                            //否则，默认的情况下
                            else {
                                edit = row.date;
                            }
                            return h('div', [edit])
                        }
                    },
                    {
                        title: '操作',
                        render: (h, {row, index}) => {
                            if (this.currentIndex === index) {
                                //有两个按钮
                                return [
                                    h('Button', {
                                        props: {
                                            type: 'success'
                                        },
                                        style: {
                                            margin: '10px'
                                        },
                                        on: {
                                            //保存和取消按钮显示以后，还原index的值
                                            click: () => {
                                                this.data3[index].name = this.currentNameValue;
                                                this.data3[index].date = this.currentDateValue
                                                this.currentIndex = -1;
                                            }
                                        }
                                    }, '保存'),
                                    h('Button',
                                        {
                                            on: {
                                                click: () => {
                                                    this.currentIndex = -1;
                                                }
                                            }
                                        }, '取消'),
                                ]
                            } else {
                                //只能显示修改的按钮
                                return h('Button', {
                                    on: {
                                        click: () => {
                                            //A.点击以后获取当前行的数据
                                            this.currentIndex = index;
                                            this.currentNameValue = row.name;
                                            this.currentDateValue = row.date;
                                        }
                                    }
                                }, '修改');
                            }

                        }
                    }
                ],
                data3: []
            }
        },
        mounted() {
            this.getData();
        },
        methods: {

            getData() {
                service.renderPageList({page: 1, pageSize: 7}).then((res) => {
                    this.data3 = res.data.list
                })
            }
        }
    }
</script>