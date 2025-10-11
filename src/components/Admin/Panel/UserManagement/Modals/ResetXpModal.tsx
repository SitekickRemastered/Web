import { useState, useEffect, useContext, type ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import { UmContext } from "..";
import { postRequest } from "@site/src/utils/helpers";

export default function ResetXpModal(): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { gmInfo, playerDetails, closeUmModal } = useContext(UmContext);
  const [dataError, setDE] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!playerDetails.accountId){
      setDE(true);
      return;
    }

    const confirmBtn = document.getElementById("resetXpBox") as HTMLInputElement;

    confirmBtn.addEventListener("change", function() {
      setConfirmed(confirmBtn.checked);
    });
  }, [playerDetails]);

  function closeModal() {
    const confirmBtn = document.getElementById("resetXpBox") as HTMLInputElement;
    confirmBtn.checked = false;
    setConfirmed(false);
    closeUmModal();
  }

  function ResetXp() {
    const data = {
      account_id: playerDetails.accountId
    };

    return postRequest(gmInfo, customFields, data, customFields.RESET_XP, `Failed to reset ${playerDetails.username}'s xp.`).then((res) => {
      if (res)
        alert(`${playerDetails.username}'s xp was reset successfully.`);
      closeModal();
    });
  }

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader" style={{ backgroundColor: "#d4af37" }}>
        <span id="closeModal" className="closeModal" onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">Reset Xp</Heading>
      </div>
      <div id="modalBody" className="modalBody">
        {
          dataError ?
            <p>
              Error: There was an error getting this player's information.<br/>
              Please try again later or contact the server admin.
            </p> :
            <>
              <p className="text-center mb-0"><b>Warning:</b> The button that appears after clicking the checkbox below will reset {playerDetails.username}'s xp.</p>
              <p className="text-center mb-0"><b>This action cannot be undone.</b></p>
              <p className="text-center mb-0">Are you sure you want to reset the xp?</p>
              <br/>

              <div className="text-center mb-0">
                <input type="checkbox" id="resetXpBox" name="resetXpBox" />
                <label htmlFor="resetXpBox"> Yes, I want to reset {playerDetails.username}'s xp</label>
              </div>
              <br/>
              { confirmed && <button type="button" className="d-flex m-auto button--bootstrap yellow" onClick={ () => ResetXp()}>Reset Xp</button> }
            </>
        }
      </div>
    </div>
  );
}