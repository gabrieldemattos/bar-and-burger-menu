export interface IDeliveryDetails {
  zipCode: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  payment: string;
  comments?: string;
  change?: string;
}
