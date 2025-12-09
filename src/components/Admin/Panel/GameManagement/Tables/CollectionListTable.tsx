import { ReactNode, useState, useEffect, useRef } from "react";
import Heading from "@theme/Heading";
import { addModalListeners, createTable, postRequest, TableButton } from "@site/src/utils/helpers";
import CollectionListModal from "../Modals/CollectionListModal";

import styles from "../index.module.css";

export default function CollectionListTable({ gmInfo, customFields, chipList }): ReactNode {
  const [data, setData] = useState(["cList"]); // Set temp code in array so it can render
  const [listData, setLD] = useState({});
  const tableId = "collectionListTable";

  function fetchCollectionLists() {
    postRequest(gmInfo, customFields, "", customFields.GET_C_LISTS, "Failed to get data for collection lists").then(res => {
      if (!res || !res.collectionLists || res.collectionLists.length == 0) {
        setData([]);
        return;
      }

      Array.prototype.forEach.call(res.collectionLists, (cList) => {
        if (cList.type === 1)
          cList.type = "Manual";
        else if (cList.type === 2)
          cList.type = "Auto Weekly";
        else
          cList.type = "Auto Monthly";
      });
      setData(res.collectionLists);

      const tableHeaders = ["ID", "Name", "Chip(s)", "Start Date", "End Date", "Type", "Actions"];
      const expectedKeys = ["id", "name", "chips", "startDate", "endDate", "type"];
      const buttons : TableButton[] = [
        { text: "🖋️ Edit", style: "button--bootstrap yellow", onClick: editCollectionList },
        { text: "🗑️ Delete", style: "button--bootstrap red", onClick: deleteCollectionList, objKeys: ["id", "name"] }
      ];
      createTable(tableId, tableHeaders, expectedKeys, res.collectionLists, buttons, undefined, chipList);
    });
  }

  function editCollectionList(listData) {
    setLD(listData);
    openModal();
  }

  function deleteCollectionList(cListId, cListName) {

    if (!confirm(`Are you sure you want to delete collection list "${cListName}"? This action cannot be undone.`))
      return;

    const data = {
      collection_list_id: cListId
    };
    return postRequest(gmInfo, customFields, data, customFields.DEL_C_LIST, "Failed to delete chip code.").then((res) => {
      if (res) {
        alert("Collection List " + cListName + " was successfully deleted.");
        fetchCollectionLists();
      }
    });
  }

  const modalElem = useRef<HTMLDivElement>(null);

  function openModal() {
    modalElem.current.style.display = "block";
  }

  function closeModal(refreshList: boolean = false) {
    modalElem.current.style.display = "none";
    setLD({});
    if (refreshList)
      fetchCollectionLists();
  }

  useEffect(() => {
    fetchCollectionLists();
    addModalListeners(modalElem, closeModal);
  }, []);

  return (
    !data || data.length == 0 ?
      <Heading as="h3" className="text-center p-1">The database has no collection lists!</Heading>
      :
      <>
        <button className="d-flex m-1a button--flat blue" onClick={() => openModal()}>Add Collection List</button>
        <div className="d-flex align-items-center flex-col">
          <table id={tableId} className={styles.gameManagementTable} />
        </div>
        <div ref={modalElem} className="modalOverlay">
          <CollectionListModal gmInfo={gmInfo} chipList={chipList} closeModal={closeModal} cListInfo={listData} />
        </div>
      </>
  );
}

