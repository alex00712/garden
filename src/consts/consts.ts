interface Consts {
    collage: string;
    products: string;
    login: string;

    //redact
    category: string;
    family: string;
    deleteProduct: string;
    poductById: string;
    
    //order
    clientOrder: string;
    connectWithAdmin: string;

    // for Dashbord
    processingClientOrders: string;
    newClientOrders: string;
    executedClientOrders: string;
    changeStatus: string;

    // storage
    cardName: string;

}

// @ for production

const consts: Consts = {
    collage: "https://greenisland.herokuapp.com/collage",
    products: "https://greenisland.herokuapp.com/products",
    login: "https://greenisland.herokuapp.com/login",
    category: "https://greenisland.herokuapp.com/category",
    family: "https://greenisland.herokuapp.com/family",
    deleteProduct: "https://greenisland.herokuapp.com/admin/product",
    poductById: "https://greenisland.herokuapp.com/product",
    clientOrder: "https://greenisland.herokuapp.com/clientOrder",
    connectWithAdmin: "https://greenisland.herokuapp.com/connectWithAdmin",

    // for Dashbord
    processingClientOrders: "https://greenisland.herokuapp.com/admin/processingClientOrders",
    newClientOrders: "https://greenisland.herokuapp.com/admin/newClientOrders",
    executedClientOrders: "https://greenisland.herokuapp.com/admin/executedClientOrders",
    changeStatus: "https://greenisland.herokuapp.com/admin/changeStatus/",

    // 

    // key for localstorage
    cardName: "gardenCenterCard"
}

// @ for development

// const consts: Consts = {
//     collage: "/collage",
//     products: "/products",
//     login: "/login",
//     category: "/category",
//     family: "/family",
//     deleteProduct: "/admin/product",
//     poductById: "/product",
//     clientOrder: "/clientOrder",
//     connectWithAdmin: "/connectWithAdmin",
//     processingClientOrders: "/admin/processingClientOrders",
//     newClientOrders: "/admin/newClientOrders",
//     executedClientOrders: "/admin/executedClientOrders",       
//     changeStatus: "/admin/changeStatus/",
//     // key for localstorage
//     cardName: "gardenCenterCard"
// }


export default consts