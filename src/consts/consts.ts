interface Consts {
    collage: string;
    products: string;
    productsAll: string;
    login: string;

    //redact
    category: string;
    family: string;
    deleteProduct: string;
    poductById: string;
    deleteCategory: string;
    deleteFamily: string;
    
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
    productsAll: "https://greenisland.herokuapp.com/admin/products",
    login: "https://greenisland.herokuapp.com/login",

    category: "https://greenisland.herokuapp.com/category",
    family: "https://greenisland.herokuapp.com/family",
    deleteProduct: "https://greenisland.herokuapp.com/admin/product",
    poductById: "https://greenisland.herokuapp.com/product",
    clientOrder: "https://greenisland.herokuapp.com/clientOrder",
    connectWithAdmin: "https://greenisland.herokuapp.com/connectWithAdmin",
    deleteCategory: "https://greenisland.herokuapp.com/admin/category",
    deleteFamily: "https://greenisland.herokuapp.com/admin/family",

    // for Dashbord
    processingClientOrders: "https://greenisland.herokuapp.com/admin/processingClientOrders",
    newClientOrders: "https://greenisland.herokuapp.com/admin/newClientOrders",
    executedClientOrders: "https://greenisland.herokuapp.com/admin/executedClientOrders",
    changeStatus: "https://greenisland.herokuapp.com/admin/changeStatus/",
    // 

    // key for localstorage
    cardName: "gardenCenterCard"
}

// const consts: Consts = {
//     collage: "http://localhost:8080/collage",

//     products: "http://localhost:8080/products",
//     productsAll: "http://localhost:8080/admin/products",

//     login: "http://localhost:8080/login",
//     category: "http://localhost:8080/category",
//     family: "http://localhost:8080/family",
//     deleteProduct: "http://localhost:8080/admin/product",
//     poductById: "http://localhost:8080/product",
//     clientOrder: "http://localhost:8080/clientOrder",
//     connectWithAdmin: "http://localhost:8080/connectWithAdmin",
//     deleteCategory: "https://localhost:8080/admin/category",
//     deleteFamily: "https://localhost:8080/admin/family",

//     // for Dashbord
//     processingClientOrders: "http://localhost:8080/admin/processingClientOrders",
//     newClientOrders: "http://localhost:8080/admin/newClientOrders",
//     executedClientOrders: "http://localhost:8080/admin/executedClientOrders",
//     changeStatus: "http://localhost:8080/admin/changeStatus/",

//     // 

//     // key for localstorage
//     cardName: "gardenCenterCard"
// }

// @ for development

// const consts: Consts = {
//     collage: "/collage",
//     products: "/products",
//     productsAll: "/admin/products",
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