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
  userName?: string;
  userEmail?: string;
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
// const parsedReservations:any[] = [];

type ReservationsContextValue = {
  reservations: IReservations;
  onChooseTab: (choosenTab: ChoosenTab) => void;
  choosenTab: ChoosenTab;
  searchCustomer: (searchTerm: string) => void;
  searchedCustomers: IReservations;
  acceptReservation: (customerId: number) => void;
  declineModal: IDeclineModal;
  openDeclineForm: (customerId: number) => void;
  sendDecline: (customerId: number) => void;
  cancelDeclineForm: () => void;
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
      const updatedReservations = (reservations || []).map((customer) => {
        if (customer.id === selectedCustomerID) {
          return { ...customer, status: CustomerStatus.Accepted };
        }
        return customer;
      });
      const updateSearchList = (searchedCustomers || []).map((customer) => {
        if (customer.id === selectedCustomerID) {
          return { ...customer, status: CustomerStatus.Accepted };
        }
        return customer;
      });

      setReservations(updatedReservations);
      setSearchedCustomer(updateSearchList);
      console.log(reservations);
    },
    [reservations, searchedCustomers]
  );

  const openDeclineForm = (selectedCustomerID: number): void => {
    setDeclineModal({
      declinedReservationId: selectedCustomerID,
      modalIsOpen: true,
    });
  };

  const sendDecline = useCallback(
    (selectedCustomerID: number): void => {
      const updatedReservations = (reservations || []).map((customer) => {
        if (customer.id === selectedCustomerID) {
          return { ...customer, status: CustomerStatus.Declined };
        }
        return customer;
      });
      const updateSearchList = (searchedCustomers || []).map((customer) => {
        if (customer.id === selectedCustomerID) {
          return { ...customer, status: CustomerStatus.Declined };
        }
        return customer;
      });
      setDeclineModal({
        declinedReservationId: undefined,
        modalIsOpen: false,
      });
      setReservations(updatedReservations);
      setSearchedCustomer(updateSearchList);
    },
    [reservations, searchedCustomers]
  );

  const cancelDeclineForm = () => {
    setDeclineModal({
      declinedReservationId: undefined,
      modalIsOpen: false,
    });
  };

  const ctx: ReservationsContextValue = {
    reservations,
    searchCustomer,
    searchedCustomers,
    onChooseTab,
    choosenTab,
    acceptReservation,
    sendDecline,
    declineModal,
    openDeclineForm,
    cancelDeclineForm,
  };

  return (
    <ReservationsContext.Provider value={ctx}>
      {props?.children}
    </ReservationsContext.Provider>
  );
}
