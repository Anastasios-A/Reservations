import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import dummyReservationsData from "./DUMMY_RESERVATIONS.json";
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
  acceptReservation: (customerId: string ,subject: undefined) => void;
  declineModal: IDeclineModal;
  openCloseDeclineForm: (customerId: string | undefined) => void;
  sendDecline: (
    customerId?: string ,
    subject?: string,
    message?: string ,
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

// const DUMMY_RESERVATIONS: IReservation[]= dummyReservationsData.map((customer: any) => ({
//           ...customer,
//           date: new Date(customer.date),
//           status: mapStatusToEnum(customer.status) // min to sviseis auto to kahmeno
// }))

const updateCustomerInputs = (
  customerArray: IReservation[],
  selectedCustomerId?: string,
  subject?: string
): IReservation[] => {
  return (customerArray || []).map((customer: IReservation) => {
    if (customer.id === selectedCustomerId) {
      return { ...customer, status: subject===undefined ? CustomerStatusEnum.Accepted: CustomerStatusEnum.Declined};
    }
    return customer;
  });
};

export default function ReservationsContextProvider(
  props: IReservationsContextProviderProps
) {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [searchedCustomers, setSearchedCustomer] = useState<IReservation[]>([]);

  const [choosenTab, setChoosenTab] = useState(ChoosenTab.All);

  const [declineModal, setDeclineModal] = useState<IDeclineModal>({
    declinedReservationId: undefined,
    modalIsOpen: false,
  });


  const fetchData = useCallback(async () => {
    try {
      // Make API call to fetch reservations
      const response: IReservation[] = await getReservations();

      setReservations(
        response.map((customer: any) => ({
          ...customer,
          date: new Date(customer.date),
          status: mapStatusToEnum(customer.status),
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    (selectedCustomerID: string , subject : undefined): void => {
      const updatedReservations: IReservation[] = updateCustomerInputs(
        reservations,
        selectedCustomerID,
       subject
      );
      const updatedSearchList = updateCustomerInputs(
        searchedCustomers,
        selectedCustomerID,
        subject
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

  const sendDecline = useCallback(
    (selectedCustomerID?: string, subject?: string, message?: string ): void => {
      console.log(selectedCustomerID)
        const updatedReservations = updateCustomerInputs(
          reservations,
          selectedCustomerID,
         subject
        );
        const updatedSearchList = updateCustomerInputs(
          searchedCustomers,
          selectedCustomerID,
         subject
        );
        
        console.log(updatedReservations)
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

      setDeclineModal({
        declinedReservationId: undefined,
        modalIsOpen: false,
      });
    },
    [reservations, searchedCustomers ]
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
