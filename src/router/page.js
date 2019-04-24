let page = {
    Home: () => import('../page/home'),
    Login: () => import('../page/login'),
    Err: () => import('../page/err'),
};


let User = {
    PageList: () => import('../components/User/pageList'),
    InnerEdit: () => import('../components/User/innerEdit'),
    RowEdit: () => import('../components/User/rowEdit'),
    RowAdd: () => import('../components/User/rowAdd'),
    RowLink: () => import('../components/User/rowLink'),
    LinkAdd: () => import('../components/User/rowLink/add'),
    LinkEdit: () => import('../components/User/rowLink/edit'),
    LinkWatch: () => import('../components/User/rowLink/watch'),
}

let Cart = {
    Cart: () => import('../components/Cart/cart'),
    TODO: () => import('../components/Cart/todo'),
    ResultCart: () => import('../components/Cart/resultCart')
}

let Chart = {
    Chart1: () => import('../components/Chart/chart1'),
}

let components = {
    ...User,
    ...Cart,
    ...Chart
}

export default {
    ...page,
    ...components
}