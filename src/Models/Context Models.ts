export enum CustomerStatusEnum {
    Pending = "pending",
    Accepted = "accepted",
    Declined = "declined",
  }
  
  export enum ChoosenTab {
    All = "all",
    Pending = "pending",
    Accepted = "accepted",
    Declined = "declined",
  }
  
  export interface IStore {
    id?: string;
    name: string;
    description: string;
    budget: string;
    lat?: number;
    lng?: number;
    isFood: boolean;
    days?: string[];
    categories?: string[];
    supportsReservation?: boolean;
  }
  
  export class Store implements IStore {
    id?: string;
    name: string = "";
    description: string = "";
    budget: string = "";
    lat?: number;
    lng?: number;
    isFood: boolean = false;
    days?: string[];
    categories?: string[];
    supportsReservation?: boolean;
  }
  export interface IStoreDetails {
    id: string;
    storeId: string;
    slots: number[];
    discount: number;
    email: string;
    emailSubjectTemplate: string;
    emailTextTemplate: string;
    logoUrl: string;
    menuUrl: string;
  }
  
  export class StoreDetails implements IStoreDetails {
    id: string = "";
    storeId: string = "";
    slots: number[] = [];
    discount: number = 0;
    email: string = "";
    emailSubjectTemplate: string = "";
    emailTextTemplate: string = "";
    logoUrl: string = "";
    menuUrl: string = "";
  }
  
  export interface IReservation {
    id: string;
    userEmail: string;
    userName: string;
    shopEmail: string;
    status: CustomerStatusEnum;
    shopName: string;
    people: string;
    storeId: string;
    userId: string;
    date: Date;
    isToUser: boolean;
    reasonOfCancelation?: string;
  }
  
  export interface IDeclineModal {
    declinedReservationId: string | undefined;
    modalIsOpen: boolean;
  }