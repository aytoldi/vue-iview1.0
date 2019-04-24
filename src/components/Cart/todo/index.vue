<template>
    <div>
        <Table :columns="columns6"
               :data="data6" border></Table>
        <Card :bordered="false">
            <p slot="title">No border title</p>
            <Row>
                <Col span="4">
                    <Checkbox @on-change="allItemChange(allSingle)" v-model="allSingle">全选</Checkbox>
                </Col>
                <Col span="6">取消全选</Col>
                <Col span="6">计算总价</Col>
                <Col span="6">计算总数: <strong>{{resultSum}}</strong></Col>
                <Col span="2" align="right">
                    <Button type="success">结账</Button>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
    import service from '../../../utils/service'
    import {Modal} from 'iview'
    export default {
        data(){
            return{
                columns6:[
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
                                        input: (state) => {
                                            this.allItemChange(state);
                                        }
                                    }
                                }),
                            ])
                        },
                        render: (h, {row, index}) => {
                            let self = this;
                            return h('Checkbox', {
                                props: {
                                    value: row._checked
                                },
                                on: {
                                    input: (state) => {
                                        self.itemChange(state, row, index);
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
                                h('Button', {
                                    on: {
                                        click: () => {
                                            this.minusHandle(row);
                                        }
                                    }
                                }, '-')
                            ]
                        }
                    },
                    {
                        title: '总金额',
                        align: 'center',
                        render: (h, {row, index}) => {
                            return h('span', {}, row.sum)
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, {row, index}) => {
                            return h('Button', {
                                on: {
                                    click: () => {
                                        this.deleteItem(row, index);
                                    }
                                }
                            }, '删除')
                        }
                    }
                ],
                data6:[],
                sumPrice: 0,//下面的计算总价格
                allSingle: false,//是否全选
                changeNumber: 0,//点击次数，动态值，比如累加++，减少--
            }
        },
        computed:{
            resultSum(){
                if(this.sumPrice){
                    return this.sumPrice.toFixed(2)
                }else{
                    return this.sumPrice
                }

            }
        },
        mounted() {
            this.$nextTick(() => {
                this.getData();
            });
        },
        methods:{
            // data 项设置特殊 key _checked: true 可以默认选中当前项。
            getData() {
                service.cart().then((res) => {
                    //A.每个item是否被选
                    let result = res.data.data.list; // [ {},{},{}....]
                    result.forEach((item) => {
                        item._checked = false;
                    })
                    this.data6 = result;
                })
            },
            //B.每个item是否被选
            itemChange(state, row, index) {
                //如果被点击，返回true的情况下
                if (state) {
                    //累加操作
                    this.changeNumber++;
                    //判断是否等这些
                    if (this.changeNumber == this.data6.length) {
                        this.allSingle = true;//被全选
                    }
                    //被选
                    this.data6[index]._checked = true;
                } else { //如果取消被选
                    this.allSingle = false;//取消全选
                    this.data6[index]._checked = false;
                    this.changeNumber--;
                }
            },
            //C.全选
            allItemChange(state) {
                //如果全选按钮被选
                if (state) {

                    this.data6.forEach((item) => {
                        item._checked = true;
                    });
                    //C属于
                    this.changeNumber = this.data6.length;
                    this.allSingle = true;
                }
            }
        }
    }
</script>