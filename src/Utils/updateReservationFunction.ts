import { CustomerStatusEnum, IReservation } from "../Models/ContextModels";
interface IReservationUpdate {
  id: string;
  status: CustomerStatusEnum;
  isFromUser: boolean;
  reasonOfCancelation?: string;
}
export const updateReservationState = async (
  reservation?: IReservationUpdate
): Promise<any> => {
  try {
    if (!reservation) return;
    const response = await fetch(
      "https://us-central1-myathenspath.cloudfunctions.net/updateReservation",
      {
        method: "POST", // directly using "POST"
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(reservation),
      }
    );

    if (!response.ok) {
      const errorMessage = `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error; // Depending on the usage, you might want to handle the error here instead of rethrowing
  }
};
