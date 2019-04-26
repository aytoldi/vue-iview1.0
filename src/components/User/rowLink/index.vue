<template>
    <div>
        <Button type="primary" class="addBtn" @click="addHandle2">添加</Button>
        <Table :columns="columns4" :data="data4" border></Table>
    </div>
</template>
<script>
    import service from '../../../utils/service'

    export default {
        data() {
            return {
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
                            return [
                                h('Button', {
                                    on: {
                                        click: () => {
                                            this.editHandle2(row.id);
                                        }
                                    },
                                }, '编辑'),
                                h('Button', {
                                    on: {
                                        click: () => {
                                            this.watchHandle2(row.id);
                                        }
                                    },
                                    style: {
                                        marginLeft: '10px'
                                    },
                                    props: {
                                        type: 'primary'
                                    }
                                }, '查看')
                            ]
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
            addHandle2() {
                this.$router.push('/home/linkAdd');
            },
            watchHandle2(index) {
                this.$router.push(`/home/rowLink/linkWatch?id=${index}`);
            },
            editHandle2(index) {
                console.log(index);
                this.$router.push({
                    path: '/home/rowLink/LinkEdit', query: {
                        id: 2
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .addBtn {
        margin-bottom: 20px;
    }
</style>