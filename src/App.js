import "./App.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Card from "./SummaryCard";
function App() {
    // App component starts here
  const locationList = [
    { value: "AB", label: "Islamabad" },
    { value: "BC", label: "Peshawar" },
    { value: "MB", label: "Lahore" },
    { value: "NB", label: "Quetta" },
    { value: "NL", label: "Karachi" },
    { value: "NT", label: "Faisalabad" },
    { value: "NS", label: "Abbotabad" },
    { value: "NU", label: "Mardan" },
    { value: "ON", label: "Swat" },
    { value: "PE", label: "Multan" },
    { value: "QC", label: "Hyderabad" },
    { value: "SK", label: "Rawalpindi" },
    { value: "YT", label: "Sukkr" },
  ];
  const [activeLocation, setActiveLocation] = useState("AB");
  const [lastUpdated, setlastUpdated] = useState("");
  const [summaryData, setSummaryData] = useState({});
  const baseUrl = "https://api.opencovid.ca";
  const getVersion = async () => {
      const res = await fetch(`${baseUrl}/version`);
      const data = await res.json();
      setlastUpdated(data.timeseries);
};
useEffect(() => {
    getSummaryData();
    getVersion();
        }, [activeLocation]);
    const getSummaryData = async (location) => {
        if (activeLocation === "canada") {
            return;
        }
        let res = await fetch(`${baseUrl}/summary?loc=${activeLocation}`);
        let resData = await res.json();
        let summaryData = resData.data[0];
        let formattedData = {};
    
        Object.keys(summaryData).map(
          (key) => (formattedData[key] = summaryData[key].toLocaleString())
        );
        console.log(formattedData)
        setSummaryData(formattedData);
      };

      return (
        <div className="App">
          <h1>COVID 19 Dashboard </h1>
          <div className="dashboard-container">
            <div className="dashboard-menu">
            <Select
            options={locationList}
            onChange={(selectedOption) =>
              setActiveLocation(selectedOption.value)
            }
            defaultValue={locationList.filter(
              (options) => options.value === activeLocation
            )}
            className="dashboard-select"
          />
          <p className="update-date">
            Last Updated : {lastUpdated}
          </p>
            </div>
            <div className="dashboard-summary">
            <Card title="Total Cases" value={summaryData.cases} />
          <Card
            title="Total Tests"
            value={summaryData.tests_completed}
          />
          <Card title="Total Deaths" value={summaryData.deaths  } />
          <Card
            title="Total Vaccinated"
            value={summaryData.vaccine_administration_total_doses}
          />
            </div>
          </div>
        </div>
      );
    }
    export default App;