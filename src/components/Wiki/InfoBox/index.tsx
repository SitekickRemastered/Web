import clsx from "clsx";
import styles from "./style.module.css";

type InfoBoxItem = {
  title: string;
  imgUrl: string;
  imgAlt: string;
  caption: string;
  categories: object;
};

function InfoBoxDataGroup({ categoryTitle, categoryChildren, prevChild }) {
  console.log(typeof categoryChildren)
  console.log(typeof prevChild)
  return (
    <>
      { prevChild && !(categoryChildren instanceof Object) && !(prevChild instanceof Object) ?
        <></>
        :
        <div className={styles.separator} />
      }
      {
        !(categoryChildren instanceof Object) ?
          <div className={styles.infoboxData}>
            <InfoboxDataRow title={categoryTitle} data={[categoryChildren]} />
          </div>
          :
          <div className={styles.infoboxGroup}>
            <div className={styles.heading}>
              <h3>{categoryTitle}</h3>
            </div>
            <div className={styles.infoboxData}>
              {Object.keys(categoryChildren).map((key, idx) => (
                <InfoboxDataRow key={key + idx} title={key} data={[categoryChildren[key]]} />
              ))}
            </div>
          </div>
      }
    </>
  )
}

function InfoboxDataRow({ title, data }) {
  return (
    <div className={styles.infoboxDataRow}>
      <p className={styles.dataHeading}>{title}</p>
      <ul className={styles.dataContent}>
        {data.map((item, idx) => (
          <li key={item + idx}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Creates a wikipedia style info box
 * 
 * Note: For categories with no title / header, use a string:
 * <categoryTitle>: <string>
 * Otherwise, use an object
 * <categoryTitle>: { <key1> : <value1>, <key2> : <value2> ...}
 * 
 * Syntax:
 * 
 *  <InfoBox 
      title={""}
      imgUrl={""}
      imgAlt={""}
      caption={""}
      categories={{
        <categoryTitle>: <categoryChildren (string | object)>,
        ...
      }
    />
 */
export default function InfoBox({ title, imgUrl, imgAlt, caption, categories }: InfoBoxItem) {
  const keys = Object.keys(categories);
  return (
    <div style={{width: "100%"}}>
      <div className="ytvContainer orange infobox">
        <div className={styles.bubbleContainer}>
          <h2 className={styles.bubbleHeading}>{title}</h2>
        </div>
        <div className={clsx(styles.infobox, "ytvContainerInner green")}>
          <div>
            <img src={imgUrl} className={styles.infoboxImg} alt={imgAlt} />
            <p className={styles.infoboxImgCaption}>{caption}</p>
          </div>
          {
            keys.map((key, idx) => (
              <InfoBoxDataGroup 
                key={key + idx} 
                categoryTitle={key} 
                categoryChildren={categories[key]} 
                prevChild={categories[keys[idx - 1]]} 
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

