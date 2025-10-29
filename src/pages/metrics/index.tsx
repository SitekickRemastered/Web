import { useState, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightDots, faCalendarCheck, faHandsHoldingCircle, faPercent, faStar, faUser, faUserClock, faUserPlus, faUsersLine, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false;

type MetricsItem = {
  title: string;
  icon: IconDefinition;
  keyStr: string;
  emptyText: string;
  text1?: string;
  text2?: string;
};

type ChipMetricsItem = {
  title: string;
  nullIcon: IconDefinition;
  keyStr: string;
  emptyText: string;
  text: string;
}

const MetricsList: MetricsItem[] = [
  {
    title: "Players Online",
    icon: faUserClock,
    keyStr: "online_players",
    emptyText: "There are no players online right now.",
    text1: "There are ",
    text2: " players online right now!"
  },
  {
    title: "Total Members",
    icon: faUser,
    keyStr: "total_players",
    emptyText: "No members have registered.",
    text1: "",
    text2: " members have registered since November 29, 2020."
  },
  {
    title: "New Players",
    icon: faUserPlus,
    keyStr: "daily_registrations",
    emptyText: "No new players have registered today.",
    text1: "Today, ",
    text2: " new player(s) registered."
  },
  {
    title: "Played Today",
    icon: faCalendarCheck,
    keyStr: "daily_online_players",
    emptyText: "No one has logged in today.",
    text1: "",
    text2: " player(s) have logged in today"
  },
  {
    title: "Total Chips",
    icon: faArrowUpRightDots,
    keyStr: "total_chips",
    emptyText: "There are currently no chips in circulation.",
    text1: "There are currently ",
    text2: " chip(s) in circulation."
  },
  {
    title: "Released Chips",
    icon: faHandsHoldingCircle,
    keyStr: "released_chips",
    emptyText: "No chips are in the game.",
    text1: "",
    text2: " chip(s) are in the game!"
  }
];

const ChipMetricsList: ChipMetricsItem[] = [
  {
    title: "Most Wanted Chip",
    nullIcon: faStar,
    keyStr: "most_wanted",
    emptyText: "There are currently no trades.",
    text: " is the most wanted chip in the game!"
  },
  {
    title: "Most Common Chip",
    nullIcon: faUsersLine,
    keyStr: "most_common",
    emptyText: "There are currently no chips that are the most common.",
    text: " is the most common chip in the game!"
  },
  {
    title: "Rarest Chip",
    nullIcon: faPercent,
    keyStr: "rarest_chip",
    emptyText: "There are currently no chips in the game.",
    text: " is the least owned chip!"
  },
];

function MetricsCard(props) {
  return (
    <div className={styles.metricsCard}>
      <Heading as="h2" className="mb-1">{ props.title }</Heading>
      <FontAwesomeIcon icon={props.icon} size="6x" />
      <hr />
      <p className="mb-0">
        {
          props.data[props.keyStr] == 0 ?
            props.emptyText :
            props.text1 + props.data[props.keyStr] + props.text2
        }
      </p>
    </div>
  );
}

function MetricsCardChip(props) {
  const chipDetails = (props.data[props.keyStr]) ? props.data[props.keyStr].split(",") : "";
  const chipIcon = (chipDetails) ? `/img/wiki/chipendium/icons/chip_${chipDetails[0]}_icon.png` : "";
  const iconAlt = (chipDetails) ? `Chip #${chipDetails[1]} icon` : "";
  return (
    <div className={`col ${styles.metricsCard}`}>
      <Heading as="h2" className="mb-1">{ props.title }</Heading>
      {
        (props.data[props.keyStr]) ?
          <img src={useBaseUrl(chipIcon)} className={styles.chipImg} role="img" alt={iconAlt} /> :
          <FontAwesomeIcon icon={props.nullIcon} size="6x" />
      }
      <hr />
      <p className="mb-0">
        {
          props.data[props.keyStr] == 0 ?
            props.emptyText :
            "Chip #" + chipDetails[1] + props.text
        }
      </p>
    </div>
  );
}

export default function Status() {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const url = `${customFields.BASE_URL}${customFields.METRICS}`;
  const token = "online_players,total_players,daily_registrations,daily_online_players,total_chips,released_chips,most_wanted,most_common,rarest_chip";

  const getData = () => {
    fetch(`${url}?q=${token}`)
      .then((res) => { return res.json(); })
      .then((data) => { setData(data); setLoading(false); })
      .catch(() => { setData({}); setLoading(false); });
  };

  useEffect(() => {
    setData({ start: "0" });
    getData();
    const interval = setInterval(() => getData(), 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout title={"Metrics"} description="Clickity-click, it's Sitekick!">
      <div className={styles.metricsContainer}>
        <Heading as="h1" className={styles.title}>Metrics</Heading>
        {isLoading ?
          <img src="/img/loading.png" alt="Loading image for metrics" />
          :
          (Object.keys(data).length) ?
            <>
              <p>This page is updated every 30 seconds!</p>
              <div className={styles.mcContainer}>
                {MetricsList.map((props, idx) => (
                  <MetricsCard key={idx} data={data} {...props} />
                ))}
              </div>
              <div className={styles.mcContainer}>
                {ChipMetricsList.map((props, idx) => (
                  <MetricsCardChip key={idx} data={data} {...props} />
                ))}
              </div>
            </>
            :
            <>
              <p>Failed to get metrics from the server. Please check <Link to="/status">sitekickremastered.com/status</Link> to see our server status</p>
              <img src="/img/error.jpg" alt="Badly drawn Dr. Frantic and Sitekick with error text" />
            </>
        }
      </div>
    </Layout>
  );
}

