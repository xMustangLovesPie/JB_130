import UserModel from "../Models/UserModel";

export class CustomersState {
    public customers: UserModel[] = [];
}


export enum CustomersActionType {
    Add = "Add",
    Update = "Update",
    Delete = "Delete",
    GetOne = "GetOne",
    GetAll = "GetAll"
}


export interface CustomersAction {
    type: CustomersActionType;
    payload: any; 
}

export function addCustomerAction(customer: UserModel) : CustomersAction {
    return { type: CustomersActionType.Add, payload: customer };
}

export function updateCustomerAction(customer: UserModel) : CustomersAction {
    return { type: CustomersActionType.Update, payload: customer };
}

export function deleteCustomerAction(id: number) : CustomersAction {
    return {type: CustomersActionType.Delete, payload: id };
}

export function getOneCustomerAction(id: number) : CustomersAction {
    return {type: CustomersActionType.GetOne, payload: id };
}

export function getAllCustomersAction(customers: UserModel[]) : CustomersAction {
    return {type: CustomersActionType.GetAll, payload: customers };
}



export function customersReducer(currentState: CustomersState = new CustomersState(), action: CustomersAction): CustomersState{
    const newState = { ...currentState }; 

    switch(action.type) {
        case CustomersActionType.Add:
            newState.customers.push(action.payload);
            break;
        case CustomersActionType.GetAll:
            newState.customers = action.payload;
            break;  
            

    }
    return newState;
}