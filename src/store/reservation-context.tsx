import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
//import dummyReservationsData from "./DUMMY_RESERVATIONS.json";
import { updateReservationState } from "../Utils/updateReservationFunction";
import { getReservations } from "../Utils/firebaseFunctions";

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

const parsedReservations: IReservations = (dummyReservationsData || []).map(
  (customer) => ({
    ...customer,
    date: new Date(customer.date),
    status: mapStatusToEnum(customer.status),
  })
);

type ReservationsContextValue = {
  reservations: IReservation[];
  onChooseTab: (choosenTab: ChoosenTab) => void;
  choosenTab: ChoosenTab;
  searchCustomer: (searchTerm: string) => void;
  searchedCustomers: IReservation[];
  acceptReservation: (customerId: string) => void;
  declineModal: IDeclineModal;

  openCloseDeclineForm: (customerId: number | undefined) => void;
  sendDecline: (
    customerId: number | undefined,
    subject?: string,
    message?: string
  ) => void;


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
  customerArray: IReservations,
  selectedCustomerId?: number
): IReservations => {
  return (customerArray || []).map((customer) => {
    if (customer.id === selectedCustomerId) {
      return { ...customer, status: CustomerStatus.Accepted };
    }
    return customer;
  });
};

export default function ReservationsContextProvider(
  props: IReservationsContextProviderProps
) {
  const [reservations, setReservations] =

    useState<IReservations>(parsedReservations);
  const [searchedCustomers, setSearchedCustomer] = useState<IReservations>([]);


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
    (selectedCustomerID: number): void => {
      const updatedReservations = updateCustomerInputs(
        reservations,
        selectedCustomerID
      );
      const updatedSearchList = updateCustomerInputs(
        searchedCustomers,
        selectedCustomerID
      );

      updateReservationState(updatedReservation);
      setReservations(updatedReservations);
      setSearchedCustomer(updatedSearchList);
      console.log(reservations);
    },
    [reservations, searchedCustomers]
  );


  const openCloseDeclineForm = (selectedCustomerID?: number): void => {
    setDeclineModal((prevState) => ({

      declinedReservationId: selectedCustomerID,
      modalIsOpen: !prevState.modalIsOpen,
    }));
  };

  const fetchData = useCallback(async () => {
    try {
      // Make API call to fetch reservations
      const response: IReservation[] = await getReservations();

      setReservations(response.map((customer: any) => ({
        ...customer,
        date: new Date(customer.date),
        status: mapStatusToEnum(customer.status),
      })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const sendDecline = useCallback(

    (selectedCustomerID?: number, subject?: string, message?: string): void => {
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
