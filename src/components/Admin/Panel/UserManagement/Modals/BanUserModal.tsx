import { useState, useEffect, useContext, type ReactNode } from "react";
import Heading from "@theme/Heading";
import { UmContext } from "..";
import { postRequest } from "@site/src/utils/helpers";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "../index.module.css";

export default function BanUserModal(): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { gmInfo, isAdmin, playerDetails, closeUmModal } = useContext(UmContext);
  const [dataError, setDE] = useState(false);

  useEffect(() => {
    const expInput = (document.getElementById("expiration") as HTMLInputElement);
    expInput.min = new Date().toLocaleDateString("fr-ca");

    if (!playerDetails.username){
      setDE(true);
      return;
    }

    const datePicker = document.getElementById("expiration") as HTMLTextAreaElement;
    const isBannedBox = document.getElementById("permaBanBox") as HTMLInputElement;

    isBannedBox.addEventListener("change", function() {
      datePicker.disabled = this.checked;
    });
  }, [playerDetails]);

  function banUser() {
    const expiration = (document.getElementById("expiration") as HTMLTextAreaElement).value;
    const isBanned = (document.getElementById("permaBanBox") as HTMLInputElement).checked ?? false;
    const reason = (document.getElementById("reason") as HTMLInputElement).value;

    if (!expiration && !isBanned) {
      alert("Must have a valid expiration date (unless player is permanently banned)!");
      return;
    }
    if (reason === null || reason.match(/^ *$/) !== null) {
      alert("Reason must not be empty!");
      return;
    }

    const data = {
      email: isAdmin ? playerDetails.email : "",
      username: playerDetails.username,
      expiration: isBanned ? Date.now() : expiration,
      is_banned: isBanned,
      reason: reason
    };

    return postRequest(gmInfo, customFields, data, customFields.BAN, "Failed to ban player.").then((res) => {
      if (res) {
        alert(`Player ${playerDetails.username} was succesfully banned`);
      }
      closeUmModal(true);
    });
  }

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader" style={{ backgroundColor: "#cc0000" }}>
        <span id="closeModal" className="closeModal" onClick={() => closeUmModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">Ban / Suspend User</Heading>
      </div>
      <div id="modalBody" className="modalBody">
        {
          dataError ?
            <p>
              Error: There was an error getting this player's information.<br/>
              Please try again later or contact the server admin.
            </p> :
            <>
              <p className="text-center mb-0">Enter the information below.</p>
              <div>
                <label htmlFor="expiration" className="input--label">Expiration:</label>
                <input className="input--bootstrap sm" name="expiration" id="expiration" type="date" />
                <br/>
                <input type="checkbox" id="permaBanBox" name="permaBanBox" />
                <label htmlFor="permaBanBox"> Permanently Ban</label>
              </div>
              <br/>
              <label htmlFor="reason" className="input--label">Reason (max 512 characters):</label>
              <textarea className={styles.textareaReason} name= "reason" id="reason" maxLength={512} />
              <br/>
              <button type="button" className="d-flex m-auto button--bootstrap red" onClick={ () => banUser()}>Ban / Suspend User</button>
            </>
        }
      </div>
    </div>
  );
}


export function UnbanUserModal(): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { gmInfo, playerDetails, closeUmModal } = useContext(UmContext);
  const [dataError, setDE] = useState(false);
  const title = "Unban / Unsuspend User";

  useEffect(() => {
    if (!playerDetails.username){
      setDE(true);
      return;
    }
  }, [playerDetails]);


  function unbanUser() {
    const unbanReason = (document.getElementById("unbanReason") as HTMLInputElement).value;

    if (unbanReason === null || unbanReason.match(/^ *$/) !== null) {
      alert("Unban reason must not be empty!");
      return;
    }

    const currentBan = playerDetails.banList.sort((a, b) => Number(b.id) - Number(a.id))[0];

    const data = {
      ban_id: currentBan.id,
      username: playerDetails.username,
      old_expiration: currentBan.expiration,
      ban_reason: currentBan.reason,
      unban_reason: unbanReason
    };

    return postRequest(gmInfo, customFields, data, customFields.UNBAN, "Failed to unban player.").then((res) => {
      if (res)
        alert(playerDetails.username + " was successfully unbanned.");
      closeUmModal(true);
    });
  }

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader" style={{ backgroundColor: "#57cc33" }}>
        <span id="closeModal" className="closeModal" onClick={() => closeUmModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">{ title }</Heading>
      </div>
      <div id="modalBody" className="modalBody">
        {
          dataError ?
            <p>
              Error: There was an error getting this player's information.<br/>
              Please try again later or contact the server admin.
            </p> :
            <>
              <p className="text-center mb-0">Enter the information below.</p>
              <label htmlFor="unbanReason" className="input--label">Unban Reason (max 512 characters):</label>
              <textarea className={styles.textareaReason} name= "unbanReason" id="unbanReason" maxLength={512} />
              <br/>
              <button type="button" className="d-flex m-auto button--bootstrap green" onClick={ () => unbanUser()}>{title}</button>
            </>
        }
      </div>
    </div>
  );
}