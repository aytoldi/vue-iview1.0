<template>
    <div>
        <Table :columns="columns6"
               :data="data6" border></Table>
        <Card :bordered="false">
            <p slot="title">No border title</p>
            <Row>
                <Col span="4">
                    <Checkbox @on-change="footerAllSelect" v-model="lastSingle">全选</Checkbox>
                </Col>
                <Col span="6">取消全选</Col>
                <Col span="6">计算总价</Col>
                <Col span="6">计算总数: <strong>{{sumPrice}}</strong></Col>
                <Col span="2" align="right">
                    <Button type="success">结账</Button>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
    import service from '../../../utils/service'

    export default {
        data() {
            return {
                sumPrice: 0,
                allSingle: false,
                lastSingle: false,
                changeNumber: 0,
                changeItemFlag: false,
                columns6: [
                    {
                        key: 'state',
                        align: 'center',
                        width: '50px',
                        renderHeader: (h) => {
                            let self = this;
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value: this.allSingle
                                    },
                                    on: {
                                        input: (state, e) => {
                                            this.allItemChange(state);
                                        }
                                    }
                                }),
                            ])
                        },
                        render: (h, {row, index}) => {
                            this.changeItemFlag = row.state === 0 ? false : true;
                            let self = this;
                            return h('Checkbox', {
                                props: {
                                    value: this.changeItemFlag
                                },
                                on: {
                                    input: (state) => {
                                        self.itemChange(state, row);
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '商品名称',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '价格',
                        key: 'price',
                        align: 'center',
                    },
                    {
                        title: '数量',
                        key: 'number',
                        align: 'center',
                        render: (h, {row, index}) => {
                            return [
                                h('Button',
                                    {
                                        props: {type: 'primary'},
                                        on: {
                                            click: () => {
                                                this.plusHanlde(row);
                                            }
                                        }
                                    }, '+'),
                                h('span', {style: {margin: '10px'}}, row.number),
                                h('Button', '-')
                            ]
                        }
                    },
                    {
                        title: '总金额',
                        key: 'sum',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h) => {
                            return h('Button', '删除')
                        }
                    }
                ],
                data6: [],
                status: false
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.getData();
            });
        },
        methods: {
            getData() {
                service.cart().then((res) => {
                    this.data6 = res.data.data.list;
                })
            },
            //A.每个item是否被选
            itemChange(state, row) {
                //如果被点击，返回true的情况下
                if (state) {
                    this.changeNumber++
                    //先判断被选的次数和data6的size是否等
                    if (this.changeNumber === this.data6.length) {
                        this.data6.forEach((item) => {
                            if (item.state == 0) {
                                item.state = 1
                            }
                        })
                        console.log(this.changeNumber, 10);
                        this.allSingle = true;
                        this.lastSingle = true;
                    }else{ //如果不等，继续累加
                        console.log(this.changeNumber,'aaaa...');
                        this.allSingle = false;
                        this.lastSingle = false;

                    }

                } else { //如果取消被选
                    this.allSingle = false;
                    this.lastSingle = false;
                    this.changeNumber--;
                }
            },
            allItemChange(state) {
                if (state) {
                    this.data6.forEach((item) => {
                        item.state = 1
                    });
                    this.changeNumber = this.data6.length
                    this.allSingle = true;
                    this.lastSingle = true;
                } else {
                    this.data6.forEach((item) => {
                        item.state = 0
                    });
                    this.changeNumber = 0;
                    this.allSingle = false;
                    this.lastSingle = false;
                }
            },
            footerAllSelect() {
                console.log(1);
            }
        }
    }
</script>