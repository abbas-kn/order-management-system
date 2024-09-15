export interface NewOrder {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'New' | 'Confirmed';
  productName: string;
  quantity:number,
}
