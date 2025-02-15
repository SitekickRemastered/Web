import Layout from "@theme/Layout";
import { useState, useEffect } from 'react';
import styles from './index.module.css';
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightDots, faCalendarCheck, faUser, faUserClock, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function Status() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const getData = () => {
    fetch("https://game.sitekickremastered.com/metrics/generic?q=online_players,daily_online_players,daily_registrations,total_players,total_chips")
      .then((res) => { return res.json(); })
      .then((data) => { setData(data); setLoading(false); })
      .catch((err) => { console.log(err); setData({}); setLoading(false); });
  }

  useEffect(() => {
    setData({start: "0"});
    getData();
    const interval = setInterval(() => getData(), 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout title={`Metrics`} description="Clickity-click, it's Sitekick!">
      <div className={styles.metricsContainer}>
        <h1 className={styles.title}>Metrics</h1>
        {isLoading ?
        <>
          <img src="/img/loading.png" style={{maxHeight: "55vh"}} alt="Loading image for metrics"/>
        </>
        :
        (Object.keys(data).length) ?
          <>
            <p>This page is updated every 30 seconds!</p>
            <div className="row">
              <div className={clsx("col", styles.metricsCard)}>
                <h2>Players Online</h2>
                <FontAwesomeIcon icon={faUserClock} size="6x" />
                <hr />
                {
                  data["online_players"] == 0 ?
                  <p>There are no players online right now.</p> :
                  <p>There are {data["online_players"]} players online right now!</p>
                }
              </div>
              <div className={clsx("col", styles.metricsCard)}>
                <h2>Total Members</h2>
                <FontAwesomeIcon icon={faUser} size="6x" />
                <hr />
                <p>{data["total_players"]} members have registered since November 29, 2020.</p>
              </div>
              <div className={clsx("col", styles.metricsCard)}>
                <h2>New Players</h2>
                <FontAwesomeIcon icon={faUserPlus} size="6x" />
                <hr />
                {
                  data["daily_registrations"] == 0 ?
                  <p>No new players have registered today.</p> :
                  <p>Today {data["daily_registrations"]} new players registered.</p>
                }
              </div>
              <div className={clsx("col", styles.metricsCard)}>
                <h2>Played Today</h2>
                <FontAwesomeIcon icon={faCalendarCheck} size="6x" />
                <hr />
                {
                  data["daily_online_players"] == 0 ?
                  <p>Noone has logged in today.</p> :
                  <p>{data["daily_online_players"]} players have logged in today.</p>
                }
              </div>
              <div className={clsx("col", styles.metricsCard)}>
                <h2>Total chips</h2>
                <FontAwesomeIcon icon={faArrowUpRightDots} size="6x" />
                <hr />
                <p>There are currently <span>{data["total_chips"]}</span> chips in circulation.</p>
              </div>
            </div>
          </>
          :
          <>
            <p>Failed to get metrics from the server. Please check <a href="/status">sitekickremastered.com/status</a> to see our server status</p>
            <img src="/img/error.jpg" style={{maxHeight: "55vh"}} alt="Badly drawn Dr. Frantic and Sitekick with error text"/>
          </>
        }
      </div>
    </Layout>
  );
}

