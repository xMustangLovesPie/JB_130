class CouponModel{
    public id: number;
    public title: string;
    public category: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public amount: number;
    public price: number;
    public imageName: string;
    public image: FileList;
}

export default CouponModel;