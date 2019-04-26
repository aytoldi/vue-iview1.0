<template>
  <div>
    <Table :columns="columns6" :data="data6" border></Table>
    <Card :bordered="false">
      <p slot="title">No border title</p>
      <Row>
        <Col span="4">
          <Checkbox @on-change="allItemChange(allSingle)" v-model="allSingle">全选</Checkbox>
        </Col>
        <Col span="6">取消全选</Col>
        <Col span="6">计算总价</Col>
        <Col span="6">
          计算总数:
          <strong>{{resultSum}}</strong>
        </Col>
        <Col span="2" align="right">
          <Button type="success">结账</Button>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
import service from "../../../utils/service";
import { Modal } from "iview";

export default {
  data() {
    return {
      sumPrice: 0, //下面的计算总价格
      allSingle: false, //是否全选
      changeNumber: 0, //点击次数，动态值，比如累加，减少
      columns6: [
        {
          key: "state",
          align: "center",
          width: "50px",
          renderHeader: h => {
            let self = this;
            return h("div", [
              h("Checkbox", {
                props: {
                  value: this.allSingle
                },
                on: {
                  input: state => {
                    this.allItemChange(state);
                  }
                }
              })
            ]);
          },
          render: (h, { row, index }) => {
            let self = this;
            return h("Checkbox", {
              props: {
                value: row._checked
              },
              on: {
                input: state => {
                  self.itemChange(state, row, index);
                }
              }
            });
          }
        },
        {
          title: "编号",
          key: "id",
          align: "center"
        },
        {
          title: "商品名称",
          align: "center",
          key: "name"
        },
        {
          title: "价格",
          key: "price",
          align: "center"
        },
        {
          title: "数量",
          key: "number",
          align: "center",
          render: (h, { row, index }) => {
            return [
              h(
                "Button",
                {
                  props: { type: "primary" },
                  on: {
                    click: () => {
                      this.plusHanlde(row);
                    }
                  }
                },
                "+"
              ),
              h("span", { style: { margin: "10px" } }, row.number),
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.minusHandle(row);
                    }
                  }
                },
                "-"
              )
            ];
          }
        },
        {
          title: "总金额",
          align: "center",
          render: (h, { row, index }) => {
            return h("span", {}, row.sum);
          }
        },
        {
          title: "操作",
          align: "center",
          render: (h, { row, index }) => {
            return h(
              "Button",
              {
                on: {
                  click: () => {
                    this.deleteItem(row, index);
                  }
                }
              },
              "删除"
            );
          }
        }
      ],
      data6: [],
      status: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  computed: {
    resultSum() {
      if (this.sumPrice) {
        return this.sumPrice.toFixed(2);
      } else {
        return this.sumPrice;
      }
    }
  },
  methods: {
    getData() {
      service.cart().then(res => {
        //A.每个item是否被选
        let result = res.data.data.list;
        result.forEach(item => {
          item._checked = false;
        });
        this.data6 = result;
      });
    },
    //B.每个item是否被选
    itemChange(state, row, index) {
      //如果被点击，返回true的情况下
      if (state) {
        //累加操作
        this.changeNumber++;
        //判断是否等这些
        if (this.changeNumber == this.data6.length) {
          this.allSingle = true; //被全选
        }
        //被选
        this.data6[index]._checked = true;
      } else {
        //如果取消被选
        this.allSingle = false; //取消全选
        this.data6[index]._checked = false;
        this.changeNumber--;
      }
    },
    //C.全选
    allItemChange(state) {
      //如果全选按钮被选
      if (state) {
        let val = 0;
        this.data6.forEach(item => {
          item._checked = true;
          //J 如果全选的时候每一个行的数量等于0的情况下
          if (item.number === 0) {
            item.number = 1;
            item.sum = item.number * item.price;
          }
          //J.全选的时候计算每个行的sum的值
          val += item.number * item.price;
        });
        //C属于
        this.changeNumber = this.data6.length;
        this.allSingle = true;
        //M计算下面的值：总计算
        this.sumPrice = val;
      } else {
        this.data6.forEach(item => {
          item._checked = false;
        });
        this.changeNumber = 0;
        this.allSingle = false;
        //N计算下面的值：总计算
        this.sumPrice = 0;
      }
    },
    footerAllSelect() {
      console.log(1);
    },
    //D.add操作
    plusHanlde(row) {
      console.log(row);
      this.data6[row._index]._checked = true;
      this.data6[row._index].number++;
      //如果false，全部false
      let newState = this.data6.every(item => {
        return item._checked === true; //如果返回true
      });
      //如果true
      if (newState) {
        this.allSingle = true;
      }
      //H.行中计算加上的值sum的
      this.data6[row._index].sum =
        this.data6[row._index].number * this.data6[row._index].price;
      //O
      this.sumPrice += this.data6[row._index].price;
      // this.sumPrice=this.sumPrice.toFixed(2)
    },
    //E.减少
    minusHandle(row) {
      if (this.data6[row._index].number < 1) {
        return;
      }
      this.data6[row._index].number--;
      if (this.data6[row._index].number < 1) {
        this.data6[row._index].number = 0;
        this.data6[row._index]._checked = false; //如果返回true
      }
      //如果false，全部false
      let newState = this.data6.every(item => {
        return item._checked === false; //如果返回true
      });
      //如果true
      if (newState) {
        this.allSingle = false;
      }
      //I.行中计算加上的值sum的
      this.data6[row._index].sum =
        this.data6[row._index].number * this.data6[row._index].price;
      //P计算总价
      this.sumPrice -= this.data6[row._index].price;
    },
    //G
    deleteItem: function(row, index) {
      console.log(row, "aaa");
      Modal.confirm({
        title: "提示",
        content: "确定要删除吗？",
        onOk: () => {
          //Z
          this.sumPrice -= this.data6[row._index].price;
          //删除之后重新计算下面的总价格
          //G
          this.data6.splice(row._index, 1);
        },
        onCancel: () => {
          // 什么也不做
        }
      });
    }
  }
};
</script>