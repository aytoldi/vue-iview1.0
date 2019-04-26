<template>
    <div>
        <Button type="primary" class="addBtn" @click="addBtnHandle1">添加</Button>
        <Table :columns="columns4" :data="data4" border></Table>
        <Modal
                v-model="modal1"
                title="Common Modal dialog box title"
        >
            <Row>
                <Col span="22">
                    <Form ref="createNewFormData1" :model="createNewFormData1" :rules="formRules" :label-width="80">
                        <FormItem label="请输入" prop="name1">
                            <Input type="text" v-model="createNewFormData1.name1"/>
                        </FormItem>
                        <FormItem label="日期" prop="value1">
                            <DatePicker v-model="createNewFormData1.value1" format="yyyy年MM月dd日" type="date"
                                        placeholder="Select date"></DatePicker>
                        </FormItem>
                        <FormItem label="性别">
                            <RadioGroup v-model="createNewFormData1.radio1">
                                <Radio label="0">女</Radio>
                                <Radio label="1">男</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="城市" prop="city1">
                            <Select v-model="createNewFormData1.city1">
                                <Option value="1">New York</Option>
                                <Option value="2">London</Option>
                                <Option value="3">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
            <Button slot="footer" type="primary" @click="handleAddSubmit1">提交</Button>
            <Button slot="footer" @click="closeSubmit1">取消</Button>
        </Modal>

        <Modal v-model="modal2" title="Common Modal dialog box title2">
            <Row>
                <Col span="22">
                    <Form ref="createNewFormData2" :model="createNewFormData1" :rules="formRules" :label-width="80">
                        <FormItem label="请输入" prop="name1">
                            <Input type="text" v-model="createNewFormData1.name1"/>
                        </FormItem>
                        <FormItem label="日期" prop="value1">
                            <DatePicker v-model="createNewFormData1.value1" format="yyyy年MM月dd日" type="date"
                                        placeholder="Select date"></DatePicker>
                        </FormItem>
                        <FormItem label="性别" prop="radio1">
                            <RadioGroup v-model="createNewFormData1.radio1">
                                <Radio label="0">女</Radio>
                                <Radio label="1">男</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="城市" prop="city1">
                            <Select v-model="createNewFormData1.city1">
                                <Option value="1">New York</Option>
                                <Option value="2">London</Option>
                                <Option value="3">America</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
            <Button slot="footer" type="primary" @click="editHandleSubmit2">提交</Button>
            <Button slot="footer" @click="editCloseSubmit2">取消</Button>
        </Modal>
    </div>
</template>
<script>
    import service from '../../../utils/service'
    import {Message} from 'iview'
    import tools from '../../../utils/tool'

    const defaultForm = {
        name1: '',
        radio1: '1',
        value1: new Date(),
        city1: ''
    }

    const eidtDefForm = {
        name1: '',
        radio1: '',
        value1: {},
        city1: ''
    }
    export default {
        data() {
            return {
                modal1: false,
                modal2: false,
                createNewFormData1: {
                    id: -1,
                    name1: '',
                    radio1: '1',
                    value1: new Date(),
                    city1: ''
                },
                formRules: {
                    name1: [
                        {
                            required: true,//如果input必填数据情况下
                            message: '请输入名称'
                        },
                        {
                            trigger: 'blur',//比如数据填写的时候，数据变化的时候，监听change事件
                            type: 'string',//input数据的类型
                            validator: this.nameValidate //验证的方法
                        }
                    ],
                    radio1: [{
                        type: 'string', required: true, message: '性别不能为空', trigger: 'change'
                    }],
                    value1: [
                        {
                            type: 'date', required: true,
                            message: '日期不能为空', trigger: 'change'
                        }
                    ],
                    city1: [
                        {
                            type: 'string', required: true, message: '城市不能为空', trigger: 'change'
                        }
                    ],
                },
                data4: [],
                columns4: [
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '城市',
                        key: 'city',
                        render: (h, {row, index}) => {
                            if (row.city === 1) {
                                return h('span', 'New York')
                            } else if (row.city === 2) {
                                return h('span', 'London')
                            } else if (row.city === 3) {
                                return h('span', 'America')
                            }
                        }
                    },
                    {
                        title: '日期',
                        key: 'date'
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        render: (h, {row, index}) => {
                            if (row.sex === 1) {
                                return h('span', '男')
                            } else {
                                return h('span', '女')
                            }
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, {row, index}) => {
                            return h('Button', {
                                on: {
                                    click: () => {
                                        this.createNewFormData1 = Object.assign({}, eidtDefForm);
                                        this.modal2 = true;
                                        this.createNewFormData1.id1 = row.id;
                                        this.createNewFormData1.name1 = row.name;
                                        this.createNewFormData1.value1 = row.date;
                                        this.createNewFormData1.radio1 = `${row.sex}`;
                                        this.createNewFormData1.city1 = `${row.city}`;
                                    }
                                }
                            }, '编辑')
                        }
                    }
                ],
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                service.renderPageList({page: 1, pageSize: 7}).then((res) => {
                    this.data4 = res.data.list
                })
            },
            addBtnHandle1() {
                this.modal1 = true
                this.createNewFormData1 = JSON.parse(JSON.stringify(defaultForm))
                this.$nextTick(() => {
                    this.$refs.createNewFormData1.resetFields();
                })
            },
            handleAddSubmit1() {
                this.$refs.createNewFormData1.validate(val => {
                    if (val) {
                        console.log(this.createNewFormData1)
                        let addApply = Object.assign({}, this.createNewFormData1)
                        let createData = {
                            id: this.data4.length + 1,
                            name: addApply.name1,
                            sex: addApply.radio1,
                            date: tools.formatDate(addApply.value1, 'yyyy-MM-dd'),
                            city: addApply.city1
                        }
                        this.data4.push(createData)
                        Message.success('Clicked ok');
                        this.modal1 = false;
                    } else {
                        Message.error('error');
                    }
                })

            },
            closeSubmit1() {
                this.modal1 = false;
            },
            editHandleSubmit2() {
                this.$refs.createNewFormData1.validate(val => {
                    console.log(val, 222);
                });
            },
            editCloseSubmit2() {
                this.modal2 = false;
            },
            nameValidate(rule, value, callback) {
                let reg = /^[\u4E00-\u9FA5]+$/;

                if (!value) {
                    return callback(new Error("请输入名称"));
                } else if (!reg.test(value)) {
                    return callback(new Error("请输入正确的名称"))
                } else {
                    callback();
                }
            },

        }
    }
</script>
<style scoped>
    .addBtn {
        margin-bottom: 20px;
    }
</style>