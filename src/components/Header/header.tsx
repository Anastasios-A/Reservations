import { IconButton } from "@fluentui/react";
import { IIconProps } from "@fluentui/react/lib/Icon";
import CustomerSearch from "../CustomerSearch/customerSearch";
import styles from "./header.module.scss";
import { useState } from "react";


const globalNavButtonProps: IIconProps = { iconName: "GlobalNavButton" };

interface IHeaderProps {
  opOpenSideModal:()=>void
}

export default function Header( props:IHeaderProps ) {

  return (
    <>
      <div className={styles.modalSetting}>
        <IconButton
          styles={{ root: { color: "gray" } }}
          title="settings"
          ariaLabel="settings"
          iconProps={globalNavButtonProps}
          onClick={props.opOpenSideModal}
        />
      </div>

        <header className={styles.header}>
          <h1>Reservations</h1>
          <CustomerSearch />
        </header>
  
    </>
  );
}
