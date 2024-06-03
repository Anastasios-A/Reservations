import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import dummyReservationsData from "./DUMMY_RESERVATIONS.json";

export enum CustomerStatus {
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

export interface ICustomer {
  id: number;
  name?: string;
  email?: string;
  phone?: number;
  people?: number;
  date?: Date;
  status?: CustomerStatus;
}

export interface IDeclineModal {
  declinedReservationId: number | undefined;
  modalIsOpen: boolean;
}

export type IReservations = ICustomer[];

const mapStatusToEnum = (status: string): CustomerStatus => {
  switch (status) {
    case "pending":
      return CustomerStatus.Pending;
    case "accepted":
      return CustomerStatus.Accepted;
    case "declined":
      return CustomerStatus.Declined;
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
  reservations: IReservations;
  onChooseTab: (choosenTab: ChoosenTab) => void;
  choosenTab: ChoosenTab;
  searchCustomer: (searchTerm: string) => void;
  searchedCustomers: IReservations;
  acceptReservation: (customerId: number) => void;
  declineModal: IDeclineModal;
  openCloseDeclineForm: (customerId: number | undefined) => void;
  sendDecline: (
    customerId: number | undefined,
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
          customer?.name?.includes(searchTerm) ||
          customer?.email?.includes(searchTerm)
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
