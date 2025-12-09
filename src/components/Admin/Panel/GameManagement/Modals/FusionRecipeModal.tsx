import { ReactNode, useState, useEffect } from "react";
import Heading from "@theme/Heading";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import MultiSelectDropdown from "@site/src/components/MultiSelectDropdown";
import { postRequest } from "@site/src/utils/helpers";

export default function FusionRecipeModal({ gmInfo, chipList, closeModal, fusionInfo }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [selectedChips, setSC] = useState<string[]>();
  const [selectedReward, setSR] = useState<string[]>();
  const [isEdit, setIE] = useState(false);

  useEffect(() => {
    setIE(fusionInfo.id);
    setSC(fusionInfo.chips ?? []);
    setSR(fusionInfo.reward ? [fusionInfo.reward] : []);
  }, [fusionInfo]);


  function sendCListRequest() {
    const chipList = JSON.stringify(selectedChips);
    const reward = JSON.stringify(selectedReward[0]);

    if (!chipList || chipList.length === 0) {
      alert("Chip list must not be null!");
      return;
    }
    if (!reward || Number.isNaN(reward)) {
      alert("Reward must not be null and a number!");
      return;
    }

    const data = {
      chips: chipList,
      reward: parseInt(reward)
    };

    const reqLink = isEdit ? customFields.EDIT_FUSION : customFields.ADD_FUSION;
    const resVer = isEdit ? "edit" : "add";

    return postRequest(gmInfo, customFields, data, reqLink, `Failed to ${resVer} fusion recipe`).then((res) => {
      if (res)
        alert(`Fusion recipe was ${resVer}ed successfully`);
      closeModal(true);
    });
  }

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader" style={{ backgroundColor: isEdit ? "#e0a800" : "#57cc33" }}>
        <span id="closeModal" className="closeModal" onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">{ isEdit ? "Edit Fusion Recipe" : "Add Fusion Recipe"}</Heading>
      </div>
      <div id="modalBody" className="modalBody overflow--visible">
        <div className="row mb-1">
          <div className="col w-50">
            <MultiSelectDropdown options={chipList} label={"Chip List"} value={selectedChips} limit={8} onChange={(selected) => { setSC(selected); }} />
          </div>
          <div className="col w-50">
            <MultiSelectDropdown options={chipList} label={"Reward"} value={selectedReward} limit={1} onChange={(selected) => { setSR(selected); }} />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button type="button" className={`d-flex m-auto button--bootstrap ${ isEdit ? "yellow" : "green"}`} onClick={() => sendCListRequest()}>
              { isEdit ? "Edit Fusion Recipe" : "Create Fusion Recipe" }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}