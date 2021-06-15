import UserModel from "../Models/UserModel";

export class CompaniesState {
    public companies: UserModel[] = []
}

export enum CompaniesActionType {
    Add = "Add",
    Update = "Update",
    Delete = "Delete",
    GetOne = "GetOne",
    GetAll = "GetAll"
}

export interface CompaniesAction {
    type: CompaniesActionType;
    payload: any; 
}


export function addCompanyAction(company: UserModel) : CompaniesAction {
    return { type: CompaniesActionType.Add, payload: company };
}

export function updateCompanyAction(company: UserModel) : CompaniesAction {
    return { type: CompaniesActionType.Update, payload: company };
}

export function deleteCompanyAction(id: number) : CompaniesAction {
    return {type: CompaniesActionType.Delete, payload: id };
}

export function getOneCompanyAction(id: number) : CompaniesAction {
    return {type: CompaniesActionType.GetOne, payload: id };
}

export function getAllCompaniesAction(companies: UserModel[]) : CompaniesAction {
    return {type: CompaniesActionType.GetAll, payload: companies };
}


export function companiesReducer(currentState: CompaniesState = new CompaniesState(), action: CompaniesAction): CompaniesState{
    const newState = { ...currentState }; 

    switch(action.type) {
        case CompaniesActionType.Add:
            newState.companies.push(action.payload);
            break;
        case CompaniesActionType.GetAll:
            newState.companies = action.payload;
            break;  
            
    }
    return newState;
}