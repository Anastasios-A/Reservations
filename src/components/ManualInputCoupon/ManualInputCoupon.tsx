import { DefaultButton, IIconProps, IconButton, Modal } from "@fluentui/react";
import styles from "./ManualInputCoupon.module.scss";

import { Coupon, ICoupon, IMenuItem, IStore } from "../../Models/ContextModels";
import { useReservationsContext } from "../../store/reservation-context";
import { useState } from "react";
import {
  addCoupon,
  getCoupon,
  updateCoupon,
} from "../../Utils/firebaseFunctions";
const addIcon: IIconProps = { iconName: "add" };
const reduceIcon: IIconProps = { iconName: "remove" };

interface IManualInputCouponProps {
  couponId?: string;
  onDismiss: () => void;
}

export default function ManualInputCoupon(props: IManualInputCouponProps) {
  const [recomendedMenu, setRecomendedMenu] = useState<IMenuItem[]>(
    useReservationsContext().store.recomendedMenu ?? []
  );
  const store: IStore = useReservationsContext().store;

  const updateQuantity = (index: number, action: "increment" | "decrement") => {
    const updatedMenuItems = [...recomendedMenu];
    if (action === "increment") {
      updatedMenuItems[index].quantity =
        (updatedMenuItems[index].quantity || 0) + 1;
    } else {
      if (
        updatedMenuItems[index].quantity &&
        (updatedMenuItems[index].quantity || 0) > 0
      ) {
        updatedMenuItems[index].quantity =
          (updatedMenuItems[index].quantity || 0) - 1;
      }
    }
    setRecomendedMenu(updatedMenuItems);
  };

  return (
    <Modal
      onDismiss={props?.onDismiss}
      isOpen={true}
      styles={{ scrollableContent: styles.scrollable, main: styles.wrapper }}
    >
      {props?.couponId === "new" ? (
        <h2>New Coupon</h2>
      ) : (
        <div className={styles.couponHeader}>{`Coupon:${props?.couponId}`}</div>
      )}

      <div className={styles.itemList}>
        {(recomendedMenu || []).map((menuItem: IMenuItem, index: number) => {
          return (
            <div className={styles.itemWrapper}>
              <IconButton
                styles={{ icon: { fontSize: "25px" } }}
                iconProps={reduceIcon}
                onClick={() => updateQuantity(index, "decrement")}
              />
              <div className={styles.titlePrice}>
                <div className={styles.title}>{menuItem.title}</div>
                <div className={styles.price}>{menuItem.price}</div>
                <div className={styles.quantity}>{menuItem.quantity}</div>
              </div>
              <IconButton
                styles={{ icon: { fontSize: "25px" } }}
                iconProps={addIcon}
                onClick={() => updateQuantity(index, "increment")}
              />
            </div>
          );
        })}
      </div>
      <DefaultButton
        onClick={async () => {
          let coupon: ICoupon = new Coupon();
          if (props.couponId === "new") {
            coupon.shopId = store.id || "";
            coupon.shopName = store.name;
            coupon.userId = "";

            await addCoupon({
              ...coupon,
              menu: recomendedMenu,
              date: new Date(),
            });
          } else {
            coupon = await getCoupon(props.couponId || "");
            if (!coupon.menu?.length) {
              await updateCoupon(props.couponId || "", {
                ...coupon,
                menu: recomendedMenu,
                date: new Date(),
              });
            }
          }
          console.log(coupon);
          props?.onDismiss();
        }}
      >
        Αποθύκευση
      </DefaultButton>
    </Modal>
  );
}
