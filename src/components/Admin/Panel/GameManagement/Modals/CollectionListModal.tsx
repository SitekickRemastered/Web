import { ReactNode, useState, useEffect } from "react";
import Heading from "@theme/Heading";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import MultiSelectDropdown from "@site/src/components/MultiSelectDropdown";
import { postRequest } from "@site/src/utils/helpers";

export default function CollectionListModal({ gmInfo, chipList, closeModal, cListInfo }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [selectedChips, setCL] = useState<string[]>();
  const [isEdit, setIE] = useState(false);
  const [listToEdit, setLTE] = useState({
    name: "", chips: [], start_date: "", end_date: ""
  });

  useEffect(() => {
    setIE(cListInfo.name);
    setLTE({
      name: cListInfo.name ?? "",
      chips: cListInfo.chips ?? [],
      start_date: cListInfo.startDate ?? "",
      end_date: cListInfo.ejdData ?? ""
    });
  }, [cListInfo]);


  function sendCListRequest() {
    const name = (document.getElementById("cListName") as HTMLInputElement).value;
    const chipList = JSON.stringify(selectedChips);
    const startDate = (document.getElementById("startDate") as HTMLInputElement).value ?? "NULL";
    const endDate = (document.getElementById("endDate") as HTMLInputElement).value ?? "NULL";

    if (!name) {
      alert("Name must not be null!");
      return;
    }
    if (!chipList || chipList.length === 0) {
      alert("Chip list must not be null!");
      return;
    }

    const data = {
      name: name,
      chips: chipList,
      start_date: startDate,
      end_date: endDate,
      type: "Manual"
    };

    const reqLink = isEdit ? customFields.EDIT_C_LIST : customFields.ADD_C_LIST;
    const resVer = isEdit ? "edit" : "add";

    return postRequest(gmInfo, customFields, data, reqLink, `Failed to ${resVer} collection list`).then((res) => {
      if (res)
        alert(`Collection list was ${resVer}ed successfully`);
      closeModal(true);
    });
  }

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader" style={{ backgroundColor: isEdit ? "#e0a800" : "#3399ff" }}>
        <span id="closeModal" className="closeModal" onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">{ isEdit ? "Edit Collection List" : "Add Collection List"}</Heading>
      </div>
      <div id="modalBody" className="modalBody overflow--visible">
        <div className="row mb-1">
          <div className="col">
            <label htmlFor="cListName" className="input--label">Collection List Name:</label>
            <input className="input--bootstrap" name="cListName" id="cListName" defaultValue={listToEdit.name} />
          </div>
          <div className="col w-50">
            <MultiSelectDropdown options={chipList} label={"Chip List"} value={listToEdit.chips} onChange={(selected) => { setCL(selected); }} />
          </div>
        </div>

        <div className="row mb-2">
          <div className="col">
            <label htmlFor="startDate" className="input--label">Start Date</label>
            <input className="input--bootstrap" name="startDate" id="startDate" type="date" defaultValue={listToEdit.start_date} />
          </div>
          <div className="col">
            <label htmlFor="endDate" className="input--label">End Date</label>
            <input className="input--bootstrap" name="endDate" id="endDate" type="date" defaultValue={listToEdit.end_date} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button type="button" className={`d-flex m-auto button--bootstrap ${ isEdit ? "yellow" : "blue"}`} onClick={() => sendCListRequest()}>
              { isEdit ? "Edit Collection List" : "Create Collection List" }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}