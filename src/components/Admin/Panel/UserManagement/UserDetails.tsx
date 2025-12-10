import { useContext, useEffect, useState, type ReactNode } from "react";
import Heading from "@theme/Heading";
import { UmContext } from ".";
import { faSquareCheck, faGavel, faLock, faPenToSquare, /*faShield,*/ faTrash, faClone, faBook, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./index.module.css";

// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false;

export default function UserDetails( { fromTable, searchTerm, openListView }): ReactNode {
  const { isAdmin, playerDetails, ModalTypes, openUmModal } = useContext(UmContext);
  const [isBanned, setIsBanned] = useState(false);
  const [banType, setBanType] = useState(0);
  const [hasHistory, setHistory] = useState(playerDetails.banList && playerDetails.banList.length > 0);
  const [hasAlts, setHasAlts] = useState(playerDetails.associatedAccounts && playerDetails.associatedAccounts.length > 0);


  function ActionButton({ colour, modalType, icon, name, isDisabled = false }) {
    return (
      <div className={`row ${styles.actionsCard}`}>
        <button disabled={isDisabled} className={`button--flat ${colour}`} onClick={() => {
          openUmModal(modalType);
        }}>
          <FontAwesomeIcon icon={icon} className={ styles.buttonIcon } /> {name}
        </button>
      </div>
    );
  }

  useEffect(() => {
    setIsBanned(playerDetails.banStatus != "Not banned");
    setBanType(playerDetails.banStatus == "Perma banned" ? 2 : playerDetails.banStatus == "Suspended" ? 1 : 0);
    setHistory(playerDetails.banList && playerDetails.banList.length > 0);
    setHasAlts(playerDetails.associatedAccounts && playerDetails.associatedAccounts.length > 0);
  }, [playerDetails]);

  return (
    !playerDetails || playerDetails.length == 0 ?
      <Heading as="h3" className={styles.emptyListText}>No players were found with the Email / Username: "${searchTerm}"</Heading>
      :
      <>
        { fromTable && <button className="d-flex m-auto mb-1" onClick={() => openListView()}>Back to List</button> }
        <div className="d-flex">
          <div>
            <div id="playerDetailsContainer" className={styles.pdContainer}>
              <div className={styles.pdImg} style={{ backgroundColor: playerDetails.sitekickColour || "#FFCC00" }} />
              <Heading as="h2" className={styles.pdName}>{playerDetails.username}</Heading>
              <div id="infoContainer">
                <div className={styles.pdInfoBlock}>Account ID<span>{playerDetails.accountId}</span></div>
                {isAdmin && <div className={styles.pdInfoBlock}>Email<span>{playerDetails.email}</span></div> }
                <div className={styles.pdInfoBlock}>Username<span>{playerDetails.username}</span></div>
                <div className={styles.pdInfoBlock}>Sitekick Name<span>{playerDetails.sitekickName}</span></div>
                <div className={styles.pdInfoBlock}>Total XP<span>{playerDetails.xp}</span></div>
                <div className={styles.pdInfoBlock}>Verified Status<span>{playerDetails.verified ? "Verified" : "Not Verified"}</span></div>
                <div className={styles.pdInfoBlock}>Banned Status<span>{playerDetails.banStatus}</span></div>
                {isAdmin && <div className={styles.pdInfoBlock}>Account Type<span>{playerDetails.isMain ? "Main" : "Alt"}</span></div> }
                {isAdmin && <div className={styles.pdInfoBlock}>Number of Alts<span>{playerDetails.numAlts}</span></div> }
                <div className={styles.pdInfoBlock}>Date Created<span>{playerDetails.dateCreated}</span></div>
                <div className={styles.pdInfoBlock}>Last Interaction<span>{playerDetails.lastInteraction}</span></div>
              </div>
            </div>
          </div>
          <div className="mx-1" />
          <div>
            <div id="actionCards">
              <div className="row">
                <div className="col">
                  <ActionButton colour="" modalType={ModalTypes.EditInfo} icon={faPenToSquare} name="Edit Info" />
                  { ((!isAdmin && banType != 2) || isAdmin) &&
                    <ActionButton
                      colour={isBanned ? "green" : "red"}
                      modalType={isBanned ? ModalTypes.UnbanUser : ModalTypes.BanUser}
                      icon={isBanned ? faSquareCheck : faGavel}
                      name={(isBanned ? "Unban / Unsuspend" : "Ban / Suspend") + " User"}/>
                  }
                  <ActionButton colour={hasHistory ? "orange" : "white"} modalType={ModalTypes.BanHistory} icon={faBook} name={hasHistory ? "Ban History" : "User has no ban history"} isDisabled={!hasHistory} />
                  {
                    isAdmin &&
                      <>
                        <ActionButton colour={hasAlts ? "pink" : "white"} modalType={ModalTypes.AltAccounts} icon={faClone} name={hasAlts ? "Alternate Accounts" : "User has no alt accounts"} isDisabled={!hasAlts} />
                        <div className="d-flex" style={{ gap: "2rem" }}>
                          <ActionButton colour="blue" modalType={ModalTypes.ResetPass} icon={faLock} name="Reset Password" />
                          <ActionButton colour="gold" modalType={ModalTypes.ResetXp} icon={faStar} name="Reset Xp" />
                        </div>
                        {/*<ActionButton colour="purple" modalType={ModalTypes.BadgeMgmt} icon={faShield} name="Badge Management" />*/}
                        <ActionButton colour="black" modalType={ModalTypes.DeleteAcc} icon={faTrash} name="Delete Account" />
                      </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

