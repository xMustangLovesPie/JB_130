
class Globals{

}

class DevelopmentGlobals extends Globals{
    public urls = {
        images: "http://localhost:8080/pics/",
        adminCoupon: "http://localhost:8080/api/admin/coupon/",
        adminCustomer: "http://localhost:8080/api/admin/customer/",
        adminCompany: "http://localhost:8080/api/admin/company/",
        companyCoupon: "http://localhost:8080/api/company/coupon/",
        customerCoupon: "http://localhost:8080/api/customer/coupon/",
        categories: "http://localhost:3030/api/categories/",
        contactUs: "http://localhost:3030/api/contact-us/",
        login: "http://localhost:8080/login/"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        images: "http://localhost:8080/pics/",
        adminCoupon: "http://localhost:8080/api/admin/coupon/",
        adminCustomer: "http://localhost:8080/api/admin/customer/",
        adminCompany: "http://localhost:8080/api/admin/company/",
        companyCoupon: "http://localhost:8080/api/company/coupon/",
        customerCoupon: "http://localhost:8080/api/customer/coupon/",
        categories: "http://localhost:3030/api/categories/",
        contactUs: "http://localhost:3030/api/contact-us/",
        login: "http://localhost:8080/login/"
    }
}

const globals = process.env.NODE_ENV === "development" ? new DevelopmentGlobals() : new ProductionGlobals;

export default globals;