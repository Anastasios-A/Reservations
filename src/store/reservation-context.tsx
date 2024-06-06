import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { updateReservationState } from "../Utils/updateReservationFunction";
import {
  getReservations,
  getStore,
  getStoreDetails,
} from "../Utils/firebaseFunctions";
import { useAuth } from "./AuthProvider";

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

const mapStatusToEnum = (status: string): CustomerStatusEnum => {
  switch (status) {
    case "pending":
      return CustomerStatusEnum.Pending;
    case "accepted":
      return CustomerStatusEnum.Accepted;
    case "declined":
      return CustomerStatusEnum.Declined;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};

type ReservationsContextValue = {
  reservations: IReservation[];
  store: IStore;
  storeDetails: IStoreDetails;
  onChooseTab: (choosenTab: ChoosenTab) => void;
  choosenTab: ChoosenTab;
  searchCustomer: (searchTerm: string) => void;
  searchedCustomers: IReservation[];
  acceptReservation: (customerId: string) => void;
  declineModal: IDeclineModal;

  openCloseDeclineForm: (customerId: string | undefined) => void;
  sendDecline: (
    customerId: string | undefined,
    subject?: string,
    message?: string
  ) => void;
};

const ReservationsContext = createContext<ReservationsContextValue | null>(
  null
);

export function useReservationsContext() {
  const reservationsCtx = useContext(ReservationsContext);

  if (reservationsCtx === null) {
    throw new Error("ReservationsContext is null!");
  }
  return reservationsCtx;
}

interface IReservationsContextProviderProps {
  children: ReactNode;
}

const updateCustomerInputs = (
  customerArray: IReservation[],
  selectedCustomerId?: string
): IReservation[] => {
  return (customerArray || []).map((customer: IReservation) => {
    if (customer.id === selectedCustomerId) {
      return { ...customer, status: CustomerStatusEnum.Accepted };
    }
    return customer;
  });
};

export default function ReservationsContextProvider(
  props: IReservationsContextProviderProps
) {
  const authContext = useAuth();

  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [searchedCustomers, setSearchedCustomer] = useState<IReservation[]>([]);
  const [store, setStore] = useState<IStore>(new Store());
  const [storeDetails, setStoreDetails] = useState<IStoreDetails>(
    new StoreDetails()
  );

  const [choosenTab, setChoosenTab] = useState(ChoosenTab.All);
  const [declineModal, setDeclineModal] = useState<IDeclineModal>({
    declinedReservationId: undefined,
    modalIsOpen: false,
  });

  const onChooseTab = (choosenTab: ChoosenTab = ChoosenTab.All): void => {
    setChoosenTab(choosenTab);
  };

  const searchCustomer = useCallback(
    (searchTerm: string): void => {
      const filteredReservations = (reservations || []).filter(
        (customer) =>
          customer?.userName?.includes(searchTerm) ||
          customer?.userEmail?.includes(searchTerm)
      );
      setSearchedCustomer(
        filteredReservations?.length > 0 ? filteredReservations : reservations
      );
      console.log("filtereddd ", filteredReservations);
    },
    [reservations]
  );

  const acceptReservation = useCallback(
    (selectedCustomerID: string): void => {
      const updatedReservations: IReservation[] = updateCustomerInputs(
        reservations,
        selectedCustomerID
      );
      const updatedSearchList = updateCustomerInputs(
        searchedCustomers,
        selectedCustomerID
      );

      updateReservationState(
        updatedReservations?.find(
          (res: IReservation) => res.id === selectedCustomerID
        )
      );
      setReservations(updatedReservations);
      setSearchedCustomer(updatedSearchList);
      console.log(reservations);
    },
    [reservations, searchedCustomers]
  );

  const openCloseDeclineForm = (selectedCustomerID?: string): void => {
    setDeclineModal((prevState) => ({
      declinedReservationId: selectedCustomerID,
      modalIsOpen: !prevState.modalIsOpen,
    }));
  };

  const fetchData = useCallback(async (storeEmail: string) => {
    try {
      const store: IStore = await getStore(storeEmail);
      console.log("Store ", store);
      if (store?.id) {
        const storeDetails: IStoreDetails = await getStoreDetails(store?.id);
        console.log("storeDetails ", storeDetails);
        const reservations: IReservation[] = await getReservations(store?.id);
        console.log("reservations ", reservations);
        setStore(store);
        setStoreDetails(storeDetails);
        setReservations(
          reservations.map((customer: any) => ({
            ...customer,
            date: new Date(customer.date),
            status: mapStatusToEnum(customer.status),
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    if (!!authContext?.user) fetchData(authContext?.user);
  }, [authContext?.user, fetchData]);

  const sendDecline = useCallback(
    (selectedCustomerID?: string, subject?: string, message?: string): void => {
      if (typeof selectedCustomerID === "number") {
        const updatedReservations = updateCustomerInputs(
          reservations,
          selectedCustomerID
        );
        const updatedSearchList = updateCustomerInputs(
          searchedCustomers,
          selectedCustomerID
        );

        setReservations(updatedReservations);
        setSearchedCustomer(updatedSearchList);

        console.log("CUSTOMER DECLIENED");
        console.log(
          "CustomerID  : ",
          selectedCustomerID,
          " subject  : ",
          subject,
          "message  : ",
          message
        );
      } else {
        console.log("POST/SAVE NEW TEMPALTE TO FIREBASE ");
        console.log("subject  : ", subject, "message  : ", message);
      }

      setDeclineModal({
        declinedReservationId: undefined,
        modalIsOpen: false,
      });
    },
    [reservations, searchedCustomers]
  );

  const ctx: ReservationsContextValue = {
    reservations,
    store,
    storeDetails,
    searchCustomer,
    searchedCustomers,
    onChooseTab,
    choosenTab,
    acceptReservation,
    sendDecline,
    declineModal,
    openCloseDeclineForm,
  };

  return (
    <ReservationsContext.Provider value={ctx}>
      {props?.children}
    </ReservationsContext.Provider>
  );
}
