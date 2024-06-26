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
import {
  ChoosenTab,
  CustomerStatusEnum,
  IDeclineModal,
  IReservation,
  IStore,
  IStoreDetails,
  Store,
  StoreDetails,
} from "../Models/ContextModels";

export const mapStatusToEnum = (status: string): CustomerStatusEnum => {
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
  isLoading: boolean;
  storeDetails: IStoreDetails;
  onChooseTab: (choosenTab: ChoosenTab) => void;
  fetchData: () => Promise<void>;
  choosenTab: ChoosenTab;
  searchCustomer: (searchTerm: string) => void;
  searchedCustomers: IReservation[];
  acceptReservation: (customerId: string) => void;
  declineModal: IDeclineModal;
  changeStoreDetails: (value: IStoreDetails) => void;
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
  status: CustomerStatusEnum,
  selectedCustomerId?: string
): IReservation[] => {
  return (customerArray || []).map((customer: IReservation) => {
    if (customer.id === selectedCustomerId) {
      return { ...customer, status: status };
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    (reservationID: string): void => {
      const updatedReservations: IReservation[] = updateCustomerInputs(
        reservations,
        CustomerStatusEnum.Accepted,
        reservationID
      );
      const updatedSearchList = updateCustomerInputs(
        reservations,
        CustomerStatusEnum.Accepted,
        reservationID
      );

      const reservationToBeUpdated = updatedReservations?.find(
        (res: IReservation) => res.id === reservationID
      );

      updateReservationState({
        id: reservationToBeUpdated?.id || "",
        status: CustomerStatusEnum.Accepted,
        isFromUser: false,
      });
      setReservations(updatedReservations);
      setSearchedCustomer(updatedSearchList);
      console.log(reservations);
    },
    [reservations]
  );

  const openCloseDeclineForm = (selectedCustomerID?: string): void => {
    setDeclineModal((prevState) => ({
      declinedReservationId: selectedCustomerID,
      modalIsOpen: !prevState.modalIsOpen,
    }));
  };

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      let storeEmail = "";
      if (!!authContext?.user) {
        storeEmail = authContext?.user;
      }
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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }, [authContext?.user]);

  useEffect(() => {
    fetchData();
  }, [authContext?.user, fetchData]);

  const changeStoreDetails = (shopDetails: IStoreDetails): void => {
    setStoreDetails(shopDetails);
  };

  const sendDecline = useCallback(
    (selectedCustomerID?: string, subject?: string, message?: string): void => {
      const updatedReservations = updateCustomerInputs(
        reservations,
        CustomerStatusEnum.Declined,
        selectedCustomerID || ""
      );
      const updatedSearchList = updateCustomerInputs(
        searchedCustomers,
        CustomerStatusEnum.Declined,
        selectedCustomerID
      );

      setReservations(updatedReservations);
      setSearchedCustomer(updatedSearchList);

      updateReservationState({
        id: selectedCustomerID || "",
        status: CustomerStatusEnum.Declined,
        isFromUser: false,
        reasonOfCancelation: message,
      });

      console.log("CUSTOMER DECLIENED");
      console.log(
        "CustomerID  : ",
        selectedCustomerID,
        " subject  : ",
        subject,
        "message  : ",
        message
      );

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
    isLoading,
    fetchData,
    storeDetails,
    searchCustomer,
    changeStoreDetails,
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
