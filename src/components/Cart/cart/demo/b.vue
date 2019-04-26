<template>
    <div>
        <Table @on-selection-change="selectItemChange"
               @on-select="staticItemSelect"
               @on-select-all="selectAllChange" ref="selection"
               :columns="columns6"
               :data="data6" border></Table>
        <Card :bordered="false">
            <p slot="title">No border title</p>
            <Row>
                <Col span="4">
                    <Checkbox @on-change="footerAllSelect" v-model="isingle">全选</Checkbox>
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
                isingle: false,
                sumPrice: 0,
                columns6: [
                    {
                        type: 'selection',
                        key: 'state',
                        align: 'center',
                        width: '50px'
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
                                            click: (e) => {
                                                this.plusHanlde(row, e);
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
                    let result = res.data.data.list;
                    result.forEach((item) => {
                        item._checked = false;
                    })
                    this.data6 = result;
                })
            },
            footerAllSelect(status) {
                this.$refs.selection.selectAll(status);
            },
            //A.
            selectItemChange(selectionArray) {
                console.log(selectionArray);
                // console.log(selectionArray, "selectionArray arr item");
                /*
                * 1.全选处理和footer的全选处理的时候使用@on-selection-change  自定义事件
                * 它会监听每一项的是否选择，还有监听每一项，类型是数组[{},{}...];
                * */
                let result = 0;
                //2.如果选择的每项的长度等于总数据长度
                if (selectionArray.length === this.data6.length) {
                    //3.遍历选择的项，类型是数组
                    selectionArray.forEach((item) => {
                        result += item.price;
                    });
                    //4.改变footer checkbox的状态
                    this.isingle = true
                } else {
                    //5.遍历选择的项，类型是数组
                    selectionArray.forEach((item) => {
                        result += item.price;
                    })
                    //6.改变footer checkbox的状态
                    this.isingle = false
                }
                this.sumPrice = result;
            },
            //B . 累加事件

            selectAllChange() {

            },
            staticItemSelect(row) {
                // console.log(row, 5);
            }
        }
    }
</script>