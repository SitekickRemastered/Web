import { ReactNode, useState, useEffect, useRef } from "react";
import Heading from "@theme/Heading";
import { addModalListeners, createTable, postRequest, TableButton } from "@site/src/utils/helpers";
import ChipCodeModal from "../Modals/ChipCodeModal";

import styles from "../index.module.css";

export default function ChipCodeTable({ gmInfo, customFields, chipList }): ReactNode {
  const [data, setData] = useState(["code"]); // Set temp code in array so it can render
  const [codeData, setCD] = useState({});
  const tableId = "chipCodeTable";

  function fetchChipCodes() {
    postRequest(gmInfo, customFields, "", customFields.GET_CODES, "Failed to get data for chip codes").then(res => {
      if (!res || !res.chipCodes || res.chipCodes.length == 0) {
        setData([]);
        return;
      }

      setData(res.chipCodes);

      const tableHeaders = ["ID", "Code", "Chip(s)", "Player Limit", "Global Limit", "Cooldown", "Start Date", "End Date", "Actions"];
      const expectedKeys = ["id", "code", "chips", "playerLimit", "globalLimit", "cooldown", "startDate", "endDate"];
      const buttons : TableButton[] = [
        { text: "🖋️ Edit", style: "button--bootstrap yellow", onClick: editChipCode },
        { text: "🗑️ Delete", style: "button--bootstrap red", onClick: deleteChipCode, objKeys: ["id"] }
      ];
      createTable(tableId, tableHeaders, expectedKeys, res.chipCodes, buttons, undefined, chipList);
    });
  }

  function editChipCode(codeData) {
    setCD(codeData);
    openModal();
  }

  function deleteChipCode(chipCodeId) {

    if (!confirm(`Are you sure you want to delete chip code #${chipCodeId}? This action cannot be undone.`))
      return;

    const data = {
      chip_code_id: chipCodeId
    };
    return postRequest(gmInfo, customFields, data, customFields.DEL_CODE, "Failed to delete chip code.").then((res) => {
      if (res)
        alert("Chip code #" + chipCodeId + " was successfully deleted.");
    });
  }

  const modalElem = useRef<HTMLDivElement>(null);

  function openModal() {
    modalElem.current.style.display = "block";
  }

  function closeModal(refreshList: boolean = false) {
    modalElem.current.style.display = "none";
    setCD({});
    if (refreshList)
      fetchChipCodes();
  }

  useEffect(() => {
    fetchChipCodes();
    addModalListeners(modalElem, closeModal);
  }, []);

  return (
    !data || data.length == 0 ?
      <Heading as="h3" className="text-center p-1">The database has no chip codes!</Heading>
      :
      <>
        <button className="d-flex m-1a button--flat red" onClick={() => openModal()}>Add Chip Code</button>
        <div className="d-flex align-items-center flex-col">
          <table id={tableId} className={styles.gameManagementTable} />
        </div>
        <div ref={modalElem} className="modalOverlay">
          <ChipCodeModal gmInfo={gmInfo} chipList={chipList} closeModal={closeModal} codeInfo={codeData} />
        </div>
      </>
  );
}

