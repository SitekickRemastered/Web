import { useContext, useEffect, useState, createContext, type ReactNode, useRef } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { addModalListeners, createTable, postRequest, TableButton } from "@site/src/utils/helpers";
import Heading from "@theme/Heading";
// import BadgeMgmtModal from "./Modals/BadgeMgmtModal";
import BanUserModal, { UnbanUserModal } from "./Modals/BanUserModal";
import BanHistoryModal from "./Modals/BanHistoryModal";
import AltAccountsModal from "./Modals/AltAccountsModal";
import DeleteAccountModal from "./Modals/DeleteAccountModal";
import EditInfoModal from "./Modals/EditInfoModal";
import ResetPassModal from "./Modals/ResetPassModal";
import ResetXpModal from "./Modals/ResetXpModal";
import UserDetails from "./UserDetails";

import styles from "./index.module.css";

export const UmContext = createContext(null);

enum ModalTypes {
  None,
  EditInfo,
  BanUser,
  UnbanUser,
  BanHistory,
  AltAccounts,
  ResetPass,
  ResetXp,
  BadgeMgmt,
  DeleteAcc
}

export default function UserManagement({ gmInfo }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [searchTerm, setST] = useState("");
  const [fromTable, setFT] = useState(false);
  const [currView, setCV] = useState("search");
  const [currModal, setCM] = useState(ModalTypes.None);
  const [playerList, setPL] = useState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [playerDetails, setPD] = useState<any>();

  function getPlayerRequest(noe, getList) {
    const data = { username: noe };
    const requestLink = (getList) ? customFields.GET_LIST: customFields.GET_ONE;
    return postRequest(gmInfo, customFields, data, requestLink, "Failed to get player(s)");
  }

  function searchBtn() {
    const noe = (document.getElementById("email") as HTMLInputElement).value;
    setST(noe);
    const searchType = (document.getElementById("searchType") as HTMLInputElement).value;
    const btn = document.getElementById("searchBtn");
    btn.innerText = "Loading...";
    btn.setAttribute("disabled", "true");

    if (searchType !== "list")
      viewDetails(noe, false);
    else
      getPlayerRequest(noe, searchType == "list").then(data =>listData(data));

    btn.innerHTML = "Search";
    btn.removeAttribute("disabled");
  }

  function listData(data) {
    if (!data) return;
    if (Object.keys(data.players).length == 1)
      viewDetails(gmInfo.type == 0 ? data.players[0].email : data.players[0].username, false);
    else {
      setPL(data.players);
      setCV("list");
    }
  }

  function viewDetails(noe, fromTable) {
    setFT(fromTable);

    getPlayerRequest(noe, false).then(data => {
      if (!data) return;
      setPD(data.player);
      setCV("details");
    });
  }

  const modalElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addModalListeners(modalElem, closeUmModal);
  }, []);

  function openUmModal(currModal, playerDetails?) {
    if (playerDetails)
      setPD(playerDetails);
    setCM(currModal);
    modalElem.current.style.display = "block";
  }

  function closeUmModal(refresh = false) {
    if (refresh) {
      getPlayerRequest(playerDetails?.username ?? "", false).then(data => {
        if (!data) return;
        setPD(data.player);
      });
    }
    modalElem.current.style.display = "none";
  }

  return (
    <div className={styles.searchContainer}>
      <Heading as="h3" className="p-0 m-0">User search:</Heading>
      <p className="text-center">
        List mode will print a list of users with names that contain the search query<br/>
        Single mode will find a user with the exact email or username specified
      </p>

      <div className="inputGroup w-30 pb-1">
        <input className="input--bootstrap" name="email" id="email" type="email" placeholder="Username or Email" />
        <select className={styles.searchDropdown} name="searchType" id="searchType" defaultValue="list">
          <option value="list">List</option>
          <option value="single">Single</option>
        </select>
        <button type="button" id="searchBtn" className={styles.searchBtn} onClick={() => searchBtn()}>Search</button>
      </div>
      <hr className="w-90" />
      <UmContext.Provider value={{
        gmInfo,
        isAdmin: gmInfo.type == 0,
        playerDetails,
        ModalTypes,
        viewDetails,
        openUmModal,
        closeUmModal
      }}>
        { currView == "list" && <AccountTable playerList={playerList} /> }
        { currView == "details" && <UserDetails fromTable={fromTable} searchTerm={searchTerm} openListView={() => setCV("list")}/> }

        <div ref={modalElem} className="modalOverlay">
          { currModal == ModalTypes.EditInfo && <EditInfoModal /> }
          { currModal == ModalTypes.BanUser && <BanUserModal /> }
          { currModal == ModalTypes.UnbanUser && <UnbanUserModal /> }
          { currModal == ModalTypes.BanHistory && <BanHistoryModal /> }
          { currModal == ModalTypes.AltAccounts && <AltAccountsModal /> }
          { currModal == ModalTypes.ResetPass && <ResetPassModal /> }
          { currModal == ModalTypes.ResetXp && <ResetXpModal /> }
          {/*{ currModal == ModalTypes.BadgeMgmt && <BadgeMgmtModal /> */}
          { currModal == ModalTypes.DeleteAcc && <DeleteAccountModal resetView={() => setCV("search")} /> }
        </div>
      </UmContext.Provider>
    </div>
  );
}


function AccountTable({ playerList }): ReactNode {
  const { isAdmin, searchTerm, viewDetails, openUmModal } = useContext(UmContext);

  const tableId = "playerListTable";

  useEffect(() => {
    if (!playerList || playerList.length == 0)
      return;

    const headers = ["Account ID", "Email", "Username", "Sitekick Name", "Actions"];
    const expKeys = ["accountId", "email", "username", "sitekickName"];
    if (!isAdmin) {
      headers.splice(1, 1);
      expKeys.splice(1, 1);
    }
    const buttons : TableButton[] = [
      { text: "👀 View Details", style: "button--bootstrap", onClick: viewDetails, objKeys: ["username"], extraArgs: [true] },
      { text: "🖋️ Edit Info", style: "button--bootstrap yellow", onClick: openUmModal, objKeys: ["id"], extraArgs: [ModalTypes.EditInfo, "-a"] }
    ];

    createTable(tableId, headers, expKeys, playerList, buttons);

  }, [playerList]);

  return (
    !playerList || playerList.length == 0 ?
      <Heading as='h3' className={styles.emptyListText}>No players were found with the Email / Username: "${searchTerm}"</Heading>
      :
      <table id={tableId} className={`${styles.listTable} ${styles.playerListTable}`} />
  );
}