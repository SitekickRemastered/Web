import { useState, useEffect, useContext, type ReactNode } from "react";
import Heading from "@theme/Heading";
import { UmContext } from "..";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { postRequest } from "@site/src/utils/helpers";

export default function EditInfoModal(): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { gmInfo, isAdmin, closeUmModal, playerDetails } = useContext(UmContext);
  const [dataError, setDE] = useState(false);

  useEffect(() => {
    if (!playerDetails) {
      setDE(true);
      return;
    }
  }, []);

  function changeInfo() {
    const newEmail = (isAdmin) ? (document.getElementById("changeEmail") as HTMLInputElement).value : undefined;
    const newUsername = (document.getElementById("changeUsername") as HTMLInputElement).value;
    const newSitekickName = (document.getElementById("changeSitekickName") as HTMLInputElement).value;

    const data = {
      account_id: playerDetails.accountId,
      new_email: (isAdmin && newEmail !== playerDetails.email) ? newEmail : undefined,
      new_username: (newUsername !== playerDetails.username) ? newUsername : undefined,
      new_sitekick_name: (newSitekickName !== playerDetails.sitekickName) ? newSitekickName : undefined
    };

    return postRequest(gmInfo, customFields, data, customFields.CHANGE_INFO, "Failed to change player information.").then((res) => {
      if (res)
        alert(playerDetails.username + "'s information was successfully changed.");
      closeUmModal(true, newEmail ?? newUsername);
    });
  }

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader" style={{ backgroundColor: "#e0a800" }}>
        <span id="closeModal" className="closeModal" onClick={() => closeUmModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">Edit User Info</Heading>
      </div>
      <div id="modalBody" className="modalBody">
        {
          dataError ?
            <p>
              Error: There was an error getting this player's information.<br/>
              Please try again later or contact the server admin.
            </p> :
            <>
              <p className="text-center">Modify the input boxes below and click save to change the user's information.</p>
              {
                isAdmin &&
                  <>
                    <label htmlFor="changeEmail" className="input--label">Email:</label>
                    <input className="input--bootstrap" name="changeEmail" id="changeEmail" type="email" defaultValue={playerDetails.email} key={"EM_" + playerDetails.email} />
                    <br />
                  </>
              }
              <label htmlFor="changeUsername" className="input--label">Username:</label>
              <input className="input--bootstrap" name="changeUsername" id="changeUsername" type="text" defaultValue={playerDetails.username} key={"UN_" + playerDetails.username} />
              <br/>
              <label htmlFor="changeSitekickName" className="input--label">Sitekick Name:</label>
              <input className="input--bootstrap" name="changeSitekickName" id="changeSitekickName" type="text" defaultValue={playerDetails.sitekickName} key={"SKN_" + playerDetails.sitekickName} />
              <br/>
              <button type="button" className="d-flex m-auto button--bootstrap yellow" onClick={() => changeInfo()}>Change player info</button>
            </>
        }
      </div>
    </div>
  );
}

