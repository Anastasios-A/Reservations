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
  Declined = "declined"
}

export interface ICustomer {
  id: number;
  name?: string;
  lastName?: string;
  email?: string;
  phone?: number;
  people?: number;
  date?: Date;
  status?: CustomerStatus;
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
    status: mapStatusToEnum(customer.status)
  })
);
// const parsedReservations:any[] = [];

type ReservationsContextValue = {
  reservations: IReservations;
  onChooseTab: (choosenTab: string) => void;
  choosenTab: string;
  searchCustomer: (searchTerm: string) => void;
  searchedCustomers: IReservations;
  acceptReservation: (customerId: number) => void;
  declineReservation: (customeId: number) => void;
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
  const [choosenTab, setChoosenTab] = useState("all");

  const onChooseTab = (choosenTab: string = "all") => {
    setChoosenTab(choosenTab);
    return choosenTab;
  };

  const searchCustomer = useCallback(
    (searchTerm: string): void => {
      const filteredReservations = (reservations || []).filter(
        (customer) =>
          customer?.name?.includes(searchTerm) ||
          customer?.lastName?.includes(searchTerm) ||
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

  const declineReservation = useCallback(
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

      setReservations(updatedReservations);
      setSearchedCustomer(updateSearchList);
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
    declineReservation,
  };

  return (
    <ReservationsContext.Provider value={ctx}>
      {props?.children}
    </ReservationsContext.Provider>
  );
}
