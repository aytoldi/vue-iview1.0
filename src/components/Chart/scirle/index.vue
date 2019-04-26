<template>
    <div>
        <Row>
            <Col span="24">
                <div id="chart5" :style="{width: '100%', height: '450px'}"></div>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        mounted() {
            this.metLine5();
        },
        methods: {
            metLine5() {
                var option = {
                    title: {
                        text: 'ECharts 数据统计'
                    },
                    series: [{
                        name: '访问量',
                        type: 'pie',
                        radius: '60%',
                        data: [
                            {value: 500, name: 'Android'},
                            {value: 200, name: 'IOS'},
                            {value: 360, name: 'PC'},
                            {value: 100, name: 'Ohter'}
                        ]
                    }]
                };
                let myCharts5 = this.$echarts.init(document.getElementById("chart5"));
                myCharts5.setOption(option);
            },
        }
    };
</script>





