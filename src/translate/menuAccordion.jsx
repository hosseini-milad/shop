const menutrans ={
title:{
    english:"DkMehr",
    persian:"داده کاوان",
    icon:"fa-eercast",
    href:"https://dkmehr.com"
    
},
menu:[
    {
        english: "OverView",
        persian: "OverView",
        index:0,
        icon:"fa-dashboard",
        href:"#",
        children:[
        {
            english: "Dashboard",
            persian: "داشبورد",
            index:0,
            icon:"fa-dashboard",
            href:"/",
            url:""
        },
        {
            english: "Tasks",
            persian: "وظایف و پیگیری",
            index:1,
            icon:"fa-bar-chart",
            href:"/crm",
            url:"crm"
        },
        ]
    },
    {
        english: "Customers",
        persian: "مشتریان",
        index:1,
        icon:"fa-users",
        href:"#",
        children:[
            {
                english: "Customers",
                persian: "مدیریت مشتریان",
                index:0,
                icon:"fa-users",
                href:"/users",
                url:"users"
            },
            ]
    },
    {
        english: "Orders",
        persian: "سفارشات",
        index:2,
        icon:"fa-tasks",
        href:"#",
        children:[
            {
                english: "Orders",
                persian: "سفارشات",
                index:0,
                icon:"fa-tasks",
                href:"/orders",
                url:"orders"
            },
            {
                english: "Transactions",
                persian: "تراکنش ها",
                index:0,
                icon:"fa-tasks",
                href:"/transactions",
                url:"transactions"
            },
            ]
    },
    {
        english: "Products",
        persian: "محصولات و خدمات",
        index:3,
        icon:"fa-bar-chart",
        href:"#",
        children:[
            {
                english: "Products",
                persian: "محصولات",
                index:0,
                icon:"fa-dashboard",
                href:"/products",
                url:"products"
            },
            {
                english: "Services",
                persian: "خدمات",
                index:1,
                icon:"fa-bar-chart",
                href:"/services",
                url:"services"
            },
            {
                english: "Brands",
                persian: "برندها",
                index:1,
                icon:"fa-bar-chart",
                href:"/brands",
                url:"brands"
            },
            {
                english: "Category",
                persian: "دسته بندی ها",
                index:1,
                icon:"fa-bar-chart",
                href:"/category",
                url:"category"
            },
            ]
    },
    {
        english: "Configuration",
        persian: "تنظیمات",
        index:0,
        icon:"fa-dashboard",
        href:"#",
        children:[
        {
            english: "Sepidar",
            persian: "سپیدار",
            index:0,
            icon:"fa-dashboard",
            href:"/config/sepidar",
            url:"config"
        },
        {
            english: "Sliders",
            persian: "اسلایدرها",
            index:0,
            icon:"fa-dashboard",
            href:"/sliders",
            url:"sliders"
        }
        ]
    },
],
setting:[
    {
        english: "Access",
        persian: "دسترسی ها",
        index:0,
        icon:"fa-key",
        href:"/access",
        url:"access"
    },
    {
        english: "Filters",
        persian: "فیلترها",
        index:1,
        icon:"fa-key",
        href:"/filter",
        url:"filter"
    }
]
}
export default menutrans