import React from "react";
import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

const Header = ({type}) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };
  return (
    <div className="header">
      <div className={type === "list" ? "listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <i className="fa-solid fa-bed"></i>
            <span>Stays</span>
          </div>

          <div className="headerListItem">
            <i className="fa-solid fa-plane"></i>
            <span>Flights</span>
          </div>

          <div className="headerListItem">
            <i className="fa-solid fa-car"></i>
            <span>Car rentals</span>
          </div>

          <div className="headerListItem">
            <i className="fa-solid fa-bed"></i>
            <span>Attractions</span>
          </div>

          <div className="headerListItem">
            <i className="fa-solid fa-taxi"></i>
            <span>Airport taxis</span>
          </div>
        </div>
        { type !== "list" &&
          <>
        
        {/* <h1 className="headerTitle">A lifetime of discounts? It's Genius</h1>
        <p className="headerDesc">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
          illo voluptatibus, odio exercitationem eaque vero minima cum unde!
          Numquam provident reprehenderit vel veniam consequatur nobis harum
          voluptatem ducimus sequi repellendus!
        </p>
        <button className="headerBtn">Sign in/ Register</button> */}

        <div className="headerSearch">
          <div className="headerSerachItem">
            <i className="fa-solid fa-magnifying-glass headerIcon"></i>
            <input
              type="text"
              placeholder="where are you going?"
              className="headerSearchInput"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="headerSerachItem calender">
            <i className="fa-regular fa-calendar headerIcon" onClick={()=>setOpenDate(!openDate)}></i>
            <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate,"dd/MM/yyyy")} to ${format(date[0].endDate,"dd/MM/yyyy")}`}</span>
            {openDate &&<DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date"
            />}
          </div>

          <div className="headerSerachItem">
            <i className="fa-solid fa-person headerIcon" onClick={() => setOpenOptions(!openOptions)}></i>
            <span className="headerSearchText" onClick={() => setOpenOptions(!openOptions)}>{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
            {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter childcounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton "
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton childcounternum"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
          </div>

          <div className="headerSearchItem">
            <button className="headerBtn searchbtn" onClick={handleSearch}>Search</button>
          </div>
        </div></>}
      </div>
    </div>
  );
};

export default Header;
