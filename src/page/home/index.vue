<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: calc(100vh);
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .layout-footer-center {
        text-align: center;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff'}">
                            <Menu active-name="activeName" theme="light" width="auto" :open-names="['1']">
                                <Submenu name="1">
                                    <template slot="title">
                                        <Icon type="ios-navigate"></Icon>
                                        用户中心
                                    </template>
                                    <MenuItem name="/home" to="/home">基本信息</MenuItem>
                                    <MenuItem name="/home/innerEdit" to="/home/innerEdit">内部编辑</MenuItem>
                                    <MenuItem name="/home/rowEdit" to="/home/rowEdit">各种编辑</MenuItem>
                                    <MenuItem name="/home/rowAdd" to="/home/rowAdd">添加信息</MenuItem>
                                    <MenuItem name="/home/rowLink" to="/home/rowLink">增删改查</MenuItem>
                                </Submenu>
                                <Submenu name="2">
                                    <template slot="title">
                                        <Icon type="ios-keypad"></Icon>
                                        购物车
                                    </template>
                                    <MenuItem name="/home/cart" to="/home/cart">购物车</MenuItem>
                                    <MenuItem name="/home/resultCart" to="/home/resultCart">计算</MenuItem>
                                    <MenuItem  name="/home/todo" to="/home/todo">TODO</MenuItem>
                                </Submenu>
                                <Submenu name="3">
                                    <template slot="title">
                                        <Icon type="ios-analytics"></Icon>
                                        可视化
                                    </template>
                                    <MenuItem  name="/home/chart1" to="/home/chart1">chart 1</MenuItem>
                                    <MenuItem name="3-2">Option 2</MenuItem>
                                </Submenu>
                                <Submenu name="4">
                                    <template slot="title">
                                        <Icon type="md-analytics"/>
                                        地图
                                    </template>
                                    <MenuItem name="4-1">Option 1</MenuItem>
                                    <MenuItem name="4-2">Option 2</MenuItem>
                                </Submenu>
                            </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <router-view></router-view>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import service from '../../utils/service'

    export default {
        data() {
            return {
                activeName: this.$route.path
            }
        },
        watch: {
            $route() {
                this.activeName = this.$route.path
            }
        }
    }
</script>