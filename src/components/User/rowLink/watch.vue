<template>
    <Card style="width:350px">
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            Classic film
        </p>
        <ul>
            <li><span>姓名:</span><strong>{{ this.createNewFormData1.name }}</strong></li>
            <li>性别: <strong>{{ this.createNewFormData1.sex==='0'?'女':'男' }}</strong></li>
            <li>日期: <strong>{{ this.createNewFormData1.date }}</strong></li>
            <li>城市: <strong>{{ reversedMessage }}</strong></li>
        </ul>
    </Card>
</template>
<script>
    import service from '../../../utils/service'

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
            }
        },
        computed: {
            reversedMessage: function () {
                console.log(this.createNewFormData1.city,5554);
                let temp = '';
                if (this.createNewFormData1.city === '1') {
                    temp = 'New York'
                } else if (this.createNewFormData1.city === '2') {
                    temp = 'London'
                } else if (this.createNewFormData1.city === '3') {
                    temp = 'America'
                }
                return temp
            }
        },
        mounted() {
            let getId = this.$route.params.id;
            console.log(getId, 'hello');
            service.linkEdit(getId).then((res) => {
                let requestData = res.data.data;
                console.log(requestData, 555);
                this.createNewFormData1 = {
                    name: requestData.name,
                    date: requestData.date,
                    sex: `${requestData.sex}`,
                    city: `${requestData.city}`
                };
                this.createNewFormData1 = Object.assign({}, this.createNewFormData1);
            })
        },
    }
</script>