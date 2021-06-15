import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { couponsReducer } from "./CouponState";
import { companiesReducer } from "./CompaniesState";
import { customersReducer } from "./CustomersState";


const reducers = combineReducers({couponsState: couponsReducer, authState: authReducer, companiesState: companiesReducer, customersState: customersReducer/*, employeesState: employeesReducer, customersState: customersReducer*/});
const store = createStore(reducers);

export default store;