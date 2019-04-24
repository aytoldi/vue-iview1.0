<template>
    <Row>
        <Col span="10">
            <Form ref="createNewFormData1" :model="createNewFormData1" :rules="formRules" :label-width="80">
                <FormItem label="请输入" prop="name">
                    <Input type="text" v-model="createNewFormData1.name"/>
                </FormItem>
                <FormItem label="日期" prop="date">
                    <DatePicker v-model="createNewFormData1.date" format="yyyy年MM月dd日" type="date"
                                placeholder="Select date"></DatePicker>
                </FormItem>
                <FormItem label="性别">
                    <RadioGroup v-model="createNewFormData1.sex">
                        <Radio label="0">女</Radio>
                        <Radio label="1">男</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="城市" prop="city">
                    <Select v-model="createNewFormData1.city">
                        <Option value="1">New York</Option>
                        <Option value="2">London</Option>
                        <Option value="3">Sydney</Option>
                    </Select>
                </FormItem>
            </Form>

        </Col>
        <Col span="15">
            <Button type="primary" @click="submitHandle">提交</Button>
            <Button @click="cancelHandle">取消</Button>
        </Col>
    </Row>
</template>
<script>

    import service from '../../../utils/service'
    import {Message} from 'iview';


    export default {
        data() {
            return {
                createNewFormData1: {
                    id: -1,
                    name: '',
                    sex: '1',
                    date: new Date(),
                    city: ''
                },
                formRules: {
                    name: [
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
                    sex: [{
                        type: 'string', required: true, message: '性别不能为空', trigger: 'change'
                    }],
                    date: [
                        {
                            type: 'date', required: true,
                            message: '日期不能为空', trigger: 'change'
                        }
                    ],
                    city: [
                        {
                            type: 'string', required: true, message: '城市不能为空', trigger: 'change'
                        }
                    ],
                },
            }
        },
        methods: {
            submitHandle() {
                this.$refs.createNewFormData1.validate(val => {
                    if (val) {
                        let d = new Date(this.createNewFormData1.date);
                        let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                        let newDate = {date: youWant};
                        let addApply = Object.assign({}, this.createNewFormData1, {date: youWant});
                        service.linkAdd(addApply).then((res) => {
                            if (res.data.code === 0) {
                                Message.success('Clicked ok');
                                this.$router.push('/home/rowLink');
                            }
                        });

                    } else {
                        Message.error('error');
                    }
                })
            },
            cancelHandle() {
                console.log(2);
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
