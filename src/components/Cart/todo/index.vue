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
                ],
                data6:[]
            }
        },
        methods:{
            getData(){
                // data 项设置特殊 key _checked: true 可以默认选中当前项。
                
            }
        }
    }
</script>