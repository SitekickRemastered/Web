import { ReactNode, useState, useEffect } from "react";
import Heading from "@theme/Heading";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import MultiSelectDropdown from "@site/src/components/MultiSelectDropdown";
import { postRequest } from "@site/src/utils/helpers";

export default function ChipCodeModal({ gmInfo, chipList, closeModal, codeInfo }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [selectedChips, setCL] = useState<string[]>();
  const [isEdit, setIE] = useState(false);
  const [codeToEdit, setCTE] = useState({
    code: "", chips: [], player_limit: "", global_limit: "", cooldown: "", start_date: "", end_date: ""
  });

  useEffect(() => {
    setIE(codeInfo.code);
    setCTE({
      code: codeInfo.code ?? "",
      chips: codeInfo.chips ?? [],
      player_limit: codeInfo.playerLimit ?? 1,
      global_limit: codeInfo.globalLimit ?? 1,
      cooldown: codeInfo.cooldown ?? "",
      start_date: codeInfo.startDate ?? "",
      end_date: codeInfo.endDate ?? ""
    });
  }, [codeInfo]);


  function setChipCode() {
    const newCode = generateChipCode();
    const code = (document.getElementById("chipCode") as HTMLInputElement);
    code.value = newCode;
  }

  function sendCodeRequest() {
    const code = (document.getElementById("chipCode") as HTMLInputElement).value;
    const chipList = JSON.stringify(selectedChips);
    const playerLimit = (document.getElementById("playerLimit") as HTMLInputElement).value;
    const globalLimit = (document.getElementById("globalLimit") as HTMLInputElement).value;
    const cooldown = (document.getElementById("cooldown") as HTMLInputElement).value;
    const startDate = (document.getElementById("startDate") as HTMLInputElement).value ?? "NULL";
    const endDate = (document.getElementById("endDate") as HTMLInputElement).value ?? "NULL";

    if (!code) {
      alert("Code must not be null!");
      return;
    }
    if (!chipList || chipList.length === 0) {
      alert("Chip list must not be null!");
      return;
    }
    if (!playerLimit || Number.isNaN(playerLimit) || parseInt(playerLimit) <= 0) {
      alert("Player limit must not be null, a number, and greater than 0!");
      return;
    }
    if (!globalLimit || Number.isNaN(globalLimit) || parseInt(globalLimit) <= 0) {
      alert("global limit must not be null, a number, and greater than 0!");
      return;
    }

    const data = {
      code: code,
      chips: chipList,
      player_limit: playerLimit,
      global_limit: globalLimit,
      cooldown: cooldown,
      start_date: startDate,
      end_date: endDate
    };

    const reqLink = isEdit ? customFields.EDIT_CODE : customFields.ADD_CODE;
    const resVer = isEdit ? "edit" : "add";

    return postRequest(gmInfo, customFields, data, reqLink, `Failed to ${resVer} chip code`).then((res) => {
      if (res)
        alert(`Chip code was ${resVer}ed successfully`);
      closeModal(true);
    });
  }

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader" style={{ backgroundColor: isEdit ? "#e0a800" : "#cc0000" }}>
        <span id="closeModal" className="closeModal" onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">{ isEdit ? "Edit Chip Code" : "Add Chip Code"}</Heading>
      </div>
      <div id="modalBody" className="modalBody overflow--visible">
        <div className="row mb-1">
          <div className="col">

            <label htmlFor="chipCode" className="input--label">Secret Code:</label>
            <div className="inputGroup">
              <input className="input--bootstrap" name="chipCode" id="chipCode" type="text" defaultValue={codeToEdit.code} />
              <button type="button" id="generateCode" onClick={() => setChipCode()}>Generate Random Code</button>
            </div>
          </div>
          <div className="col w-50">
            <MultiSelectDropdown options={chipList} label={"Chip List"} value={codeToEdit.chips} onChange={(selected) => { setCL(selected); }} />
          </div>
        </div>

        <div className="row mb-1">
          <div className="col">
            <label htmlFor="playerLimit" className="input--label">Player Limit:</label>
            <input className="input--bootstrap" name="playerLimit" id="playerLimit" type="number" min="1" defaultValue={codeToEdit.player_limit} />
          </div>
          <div className="col">
            <label htmlFor="globalLimit" className="input--label">Global Limit:</label>
            <input className="input--bootstrap" name="globalLimit" id="globalLimit" type="number" min="1" defaultValue={codeToEdit.global_limit} />
          </div>
        </div>

        <div className="row mb-2">
          <div className="col">
            <label htmlFor="cooldown" className="input--label">Cooldown</label>
            <input className="input--bootstrap" name="cooldown" id="cooldown" type="text" defaultValue={codeToEdit.cooldown} />
          </div>
          <div className="col">
            <label htmlFor="startDate" className="input--label">Start Date</label>
            <input className="input--bootstrap" name="startDate" id="startDate" type="date" defaultValue={codeToEdit.start_date} />
          </div>
          <div className="col">
            <label htmlFor="endDate" className="input--label">End Date</label>
            <input className="input--bootstrap" name="endDate" id="endDate" type="date" defaultValue={codeToEdit.end_date} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button type="button" className={`d-flex m-auto button--bootstrap ${ isEdit ? "yellow" : "red"}`} onClick={() => sendCodeRequest()}>
              { isEdit ? "Edit Chip Code" : "Create Chip Code" }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateChipCode(
  length: number = 10,
  includeUpper: boolean = true,
  includeLower: boolean = false,
  includeDigits: boolean = true,
  includeSpecial: boolean = false,
  avoidAmbig: boolean = true
) {

  let chars = "";
  let lowerchars = "abcdefghjkmnpqrstuvwxyz";
  let upperchars = "ABCDEFGHJKMNPQRSTUVWXYZ";
  let digitchars = "23456789";
  const specialchars = "!@#$%^&*";
  if (!avoidAmbig) {
    lowerchars += "ilo";
    upperchars += "ILO";
    digitchars += "10";
  }
  if (includeLower)
    chars += lowerchars;
  if (includeUpper)
    chars += upperchars;
  if (includeDigits)
    chars += digitchars;
  if (includeSpecial)
    chars += specialchars;

  let pass = "";
  const charLen = chars.length;
  for (let x = 0; x < length; x++) {
    pass += chars.charAt(Math.floor(Math.random() * charLen));
  }

  return pass;
}