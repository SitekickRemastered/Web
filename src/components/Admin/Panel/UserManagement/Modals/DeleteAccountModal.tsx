import { useState, useEffect, useContext, type ReactNode } from "react";
import Heading from "@theme/Heading";
import { UmContext } from "..";
import { postRequest } from "@site/src/utils/helpers";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function DeleteAccountModal({ resetView }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { gmInfo, playerDetails, closeUmModal } = useContext(UmContext);
  const [dataError, setDE] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!playerDetails.username){
      setDE(true);
      return;
    }

    const confirmBtn = document.getElementById("deleteAccBox") as HTMLInputElement;

    confirmBtn.addEventListener("change", function() {
      setConfirmed(confirmBtn.checked);
    });
  }, [playerDetails]);

  function closeModal() {
    const confirmBtn = document.getElementById("deleteAccBox") as HTMLInputElement;
    confirmBtn.checked = false;
    setConfirmed(false);
    closeUmModal();
  }

  function deleteAccount() {
    const data = {
      account_id: playerDetails.accountId
    };

    return postRequest(gmInfo, customFields, data, customFields.DELETE, "Failed to delete player's account.").then((res) => {
      if (res)
        alert(`${playerDetails.username}'s account was deleted successfully`);
      closeModal();
      resetView();
    });
  }

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader light" style={{ backgroundColor: "#1a1a1a" }}>
        <span id="closeModal" className="closeModal light" onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">Delete Account</Heading>
      </div>
      <div id="modalBody" className="modalBody">
        {
          dataError ?
            <p>
              Error: There was an error getting this player's information.<br/>
              Please try again later or contact the server admin.
            </p> :
            <>
              <p className="text-center mb-0"><b>Warning:</b> The button that appears after clicking the checkbox below will delete {playerDetails.username}'s account.</p>
              <p className="text-center mb-0"><b>This action cannot be undone.</b></p>
              <p className="text-center mb-0">Are you sure you want to delete this account?</p>
              <br/>
              <div className="text-center mb-0">
                <input type="checkbox" id="deleteAccBox" name="deleteAccBox" />
                <label htmlFor="deleteAccBox"> Yes, I want to delete {playerDetails.username}'s account</label>
              </div>
              <br/>
              { confirmed && <button type="button" className="d-flex m-auto button--bootstrap red" onClick={ () => deleteAccount()}>Delete Account</button> }
            </>
        }
      </div>
    </div>
  );
}