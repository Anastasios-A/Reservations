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
type ReservationsContextValue = {
  reservations: IReservation[];
  onChooseTab: (choosenTab: ChoosenTab) => void;
  choosenTab: ChoosenTab;
  searchCustomer: (searchTerm: string) => void;
  searchedCustomers: IReservation[];
  acceptReservation: (customerId: string) => void;
  declineModal: IDeclineModal;
  openDeclineForm: (customerId: string) => void;
  sendDecline: (customerId: string) => void;
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
    useState<IReservation[]>(/* parsedReservations */[]);
  const [searchedCustomers, setSearchedCustomer] = useState<IReservation[]>([]);
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
      let updatedReservation: IReservation = {} as IReservation;
      const updatedReservations = (reservations || []).map((customer) => {
        if (customer.id === selectedCustomerID) {
          updatedReservation = { ...customer, status: CustomerStatusEnum.Accepted };
          return updatedReservation;
        }
        return customer;
      });
      const updateSearchList = (searchedCustomers || []).map((customer) => {
        if (customer.id === selectedCustomerID) {
          return updatedReservation;
        }
        return customer;
      });

      updateReservationState(updatedReservation);
      setReservations(updatedReservations);
      setSearchedCustomer(updateSearchList);
      console.log(reservations);
    },
    [reservations, searchedCustomers]
  );

  const openDeclineForm = (selectedCustomerID: string): void => {
    setDeclineModal({
      declinedReservationId: selectedCustomerID,
      modalIsOpen: true,
    });
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
    (selectedCustomerID: string): void => {
      const updatedReservations = (reservations || []).map((customer) => {
        if (customer.id === selectedCustomerID) {
          return { ...customer, status: CustomerStatusEnum.Declined };
        }
        return customer;
      });
      const updateSearchList = (searchedCustomers || []).map((customer) => {
        if (customer.id === selectedCustomerID) {
          return { ...customer, status: CustomerStatusEnum.Declined };
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
