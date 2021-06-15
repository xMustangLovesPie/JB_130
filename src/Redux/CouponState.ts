import CouponModel from "../Models/CouponModel";

export class CouponsState{
    public coupons: CouponModel[] = [];  
}


export enum CouponsActionType { 
    Add = "Add",
    Update = "Update",
    Delete = "Delete",
    GetOne = "GetOne",
    GetAll = "GetAll"
}


export interface CouponAction {
    type: CouponsActionType;
    payload: any;
}

export function addCouponAction(coupon: CouponModel) : CouponAction {
    return { type: CouponsActionType.Add, payload: coupon };
}

export function couponUpdatedAction(coupon: CouponModel) : CouponAction {
    return { type: CouponsActionType.Update, payload: coupon };
}

export function couponDeletedAction(id: number) : CouponAction {
    return { type: CouponsActionType.Delete, payload: id };
}

export function getOneCouponAction(coupons: CouponModel) : CouponAction {
    return { type: CouponsActionType.GetOne, payload: coupons };
}

export function getAllCouponsAction(coupons: CouponModel[]) : CouponAction {
    return { type: CouponsActionType.GetAll, payload: coupons };
}



export function couponsReducer(currentState: CouponsState = new CouponsState(), action: CouponAction): CouponsState {

    const newState = {...currentState};

    switch(action.type) {
        case CouponsActionType.Add:
            newState.coupons.push(action.payload);
            break;
        // case CouponsActionType.GetOne:
        //     newState.coupons = action.payload;
        //     break;
        case CouponsActionType.GetAll:
            newState.coupons = action.payload;
            break;
    }

    return newState;
}