import { ReactNode, useState, useEffect, useRef } from "react";
import Heading from "@theme/Heading";
import { addModalListeners, createTable, postRequest, TableButton } from "@site/src/utils/helpers";
import FusionRecipeModal from "../Modals/FusionRecipeModal";

import styles from "../index.module.css";

export default function FusionRecipeTable({ gmInfo, customFields, chipList }): ReactNode {
  const [data, setData] = useState(["fusion"]); // Set temp in array so it can render
  const [fusionData, setFD] = useState({});
  const tableId = "fusionRecipeTable";

  function fetchFusions() {
    postRequest(gmInfo, customFields, "", customFields.GET_FUSIONS, "Failed to get data for fusion recipes").then(res => {
      if (!res || !res.fusionRecipes || res.fusionRecipes.length == 0) {
        setData([]);
        return;
      }

      setData(res.fusionRecipes);

      const tableHeaders = ["Fusion IDs", "Chip(s)", "Reward", "Actions"];
      const expectedKeys = ["id", "chips", "reward"];
      const buttons : TableButton[] = [
        { text: "🖋️ Edit", style: "button--bootstrap yellow", onClick: editFusion },
        { text: "🗑️ Delete", style: "button--bootstrap red", onClick: deleteFusion, objKeys: ["id"] }
      ];
      createTable(tableId, tableHeaders, expectedKeys, res.fusionRecipes, buttons, undefined, chipList);
    });
  }

  function editFusion(fusionData) {
    setFD(fusionData);
    openModal();
  }

  function deleteFusion(fusionId) {

    if (!confirm(`Are you sure you want to delete fusion #${fusionId}? This action cannot be undone.`))
      return;

    const data = {
      fusionId: fusionId
    };
    return postRequest(gmInfo, customFields, data, customFields.DEL_FUSION, "Failed to delete fusion.").then((res) => {
      if (res)
        alert("Fusion #" + fusionId + " was successfully deleted.");
    });
  }

  const modalElem = useRef<HTMLDivElement>(null);

  function openModal() {
    modalElem.current.style.display = "block";
  }

  function closeModal(refreshList: boolean = false) {
    modalElem.current.style.display = "none";
    setFD({});
    if (refreshList)
      fetchFusions();
  }

  useEffect(() => {
    fetchFusions();
    addModalListeners(modalElem, closeModal);
  }, []);

  return (
    !data || data.length == 0 ?
      <Heading as="h3" className="text-center p-1">The database has no fusion recipes!</Heading>
      :
      <>
        <button className="d-flex m-1a button--flat green" onClick={() => openModal()}>Add Fusion Recipe</button>
        <div className="d-flex align-items-center flex-col">
          <table id={tableId} className={`w-50 ${styles.gameManagementTable}`} />
        </div>
        <div ref={modalElem} className="modalOverlay">
          <FusionRecipeModal gmInfo={gmInfo} chipList={chipList} closeModal={closeModal} fusionInfo={fusionData} />
        </div>
      </>
  );
}

