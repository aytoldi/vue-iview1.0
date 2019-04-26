<template>
    <div class="container">
        <Row>
            <Col span="8" offset="12" class="list">
                <h1 class="text_center">后台系统</h1>
                <Form ref="userRef" :model="ruleFrom" :rules="userRules" :label-width="80">
                    <FormItem label="手机号" prop="uphone"><!--prop:我们绑定的属性ruleFrom里面的哪一项-->
                        <Input type="text" v-model="ruleFrom.uphone"/>
                    </FormItem>
                    <FormItem label="密码" prop="upass">
                        <Input type="password" v-model="ruleFrom.upass"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit">提交</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
</template>
<style scoped>
    .container {
        padding-top: 100px;
    }

    .list {
        background: #fff;
        padding: 40px 50px 40px 20px;
    }

    .list h1 {
        margin-bottom: 30px;
    }
</style>
<script>
    export default {
        data() {
            return {
                ruleFrom: { //绑定
                    uphone: '',
                    upass: ''
                },
                userRules: {//校验规则, 校验规则的时候使用input里面绑定的属性
                    uphone: [
                        {
                            required: true,//如果input必填数据情况下
                            message: '必填数据'
                        },
                        {
                            trigger: 'blur',//比如数据填写的时候，数据变化的时候，监听change事件
                            type: 'string',//input数据的类型
                            validator: this.uPhoneValidate //验证的方法
                        }
                    ],
                    upass: [
                        {
                            required: true,//如果input必填数据情况下
                            message: '必填数据'
                        },
                        {
                            trigger: 'blur',
                            type: 'string',//input数据的类型
                            validator: this.uPassValidate //验证的方法
                        }
                    ]
                }
            }
        },
        methods: {
            uPhoneValidate(rule, value, callback) {
                let reg = /^1\d{10}$/;
                if (!value) {
                    return callback(new Error("请输入手机号"));
                } else if (!reg.test(value)) {
                    return callback(new Error("请输入正确的手机号"))
                } else {
                    callback();
                }
            },
            uPassValidate(rule, value, callback) {
                let reg = /^[a-zA-Z]\w{4}$/;
                if (!value) {
                    return callback(new Error("请输入密码"));
                } else if (!reg.test(value)) {
                    return callback(new Error("请输入正确的密码"))
                } else {
                    callback();
                }
            },
            handleSubmit() {
                this.$refs.userRef.validate((valid) => {
                    if (valid) {
                        let {uphone, upass} = this.ruleFrom;
                        this.$store.dispatch('login', {
                            username: uphone,
                            password: upass
                        }).then((res) => {
                            if (res.data.data.token) {
                                this.$router.push('/home');
                            }
                        })

                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>