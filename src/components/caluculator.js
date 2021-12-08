import React, { useState, useEffect, useCallback, useRef} from "react";
import axios from "axios";
import companyLogo from "D:/news-score/src/images/Infiniwell-Logo.jpg";

const respirationCaluculator = (data) => {
  if (data) {
    if (data >= 1 && 7 >= data) {
      return 3;
    } else if (data >= 8 && 9 >= data) {
      return 2;
    } else if (data > 9 && 11 >= data) {
      return 1;
    } else if (data >= 12 && 20 >= data) {
      return 0;
    } else if (data > 20 && 21 >= data) {
      return 1;
    } else if (data > 21 && 24 >= data) {
      return 2;
    } else {
      return 3;
    }
  } else {
    return 0;
  }
};

const spo21Caluculator = (data) => {
  if (data) {
    if (data > 0 && 92 > data) {
      return 3;
    } else if (data >= 92 && 93 >= data) {
      return 2;
    } else if (data >= 94 && 95 >= data) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};


  /*const spo22Caluculator = (data) => {
      if(data) {
          if(data > 0 && 83 >= data) {
              return 3;
          }  else if(data >= 84 && 85 >= data) {
              return 2;
          } else if(data >= 86 && 87 >= data) {
              return 1;
          } else if(data >= 88 && 92 >= data) {
              return 0;
          } else if(data >= 93 && 94 >= data) {
              return 1;
          } else if(data >= 95 && 96 >= data) {
              return 2;
          } else {
              return 3;
          } 
      } else {
          return 0;
      }
  };*/

const blopreCaluculator = (data) => {
  if (data) {
    if (data > 0 && 90 >= data) {
      return 3;
    } else if (data >= 91 && 100 >= data) {
      return 2;
    } else if (data >= 101 && 110 >= data) {
      return 1;
    } else if (data >= 111 && 219 >= data) {
      return 0;
    } else {
      return 3;
    }
  } else {
    return 0;
  }
};

const pulseCaluculator = (data) => {
  if (data) {
    if (data > 0 && 40 >= data) {
      return 3;
    } else if (data >= 41 && 50 >= data) {
      return 1;
    } else if (data >= 51 && 90 >= data) {
      return 0;
    } else if (data >= 91 && 110 >= data) {
      return 1;
    } else if (data >= 111 && 130 >= data) {
      return 2;
    } else {
      return 3;
    }
  } else {
    return 0;
  }
};

const temperatureCaluculator = (data) => {
  if (data) {
    if (data > 0 && 35 >= data) {
      return 3;
    } else if (data >= 35.1 && 36.0 >= data) {
      return 1;
    } else if (data >= 36.1 && 38.0 >= data) {
      return 0;
    } else if (data >= 38.1 && 39.0 >= data) {
      return 1;
    } else {
      return 2;
    }
  } else {
    return 0;
  }
};

const oxygenCaluculator = (data) => {
  if (data) {
    if (data === "oxy") {
      return 2;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

const consciousnessCaluculator = (data) => {
  if (data) {
    if (data === "alert") {
      return 0;
    } else {
      return 3;
    }
  } else {
    return 0;
  }
};


const Caluculator = (props) => {
  const [ip, setIP] = useState('');
  const [state, setState] = useState({
    respiration: 0,
    spo21: 0,
    spo22: 0,
    air_oxygen:"",
    blopre: 0,
    pulse: 0,
    conscious:"",
    temperature: 0,
  });

  const [getTotal, setTotal] = useState({ total: 0 });
  //const [color, setColor] = useState("color:white");
 const color = useRef("white");
  const handleChangeFields = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    calculateScore();
  };

  


  
  const calculateScore = useCallback(() => {
    var totalValue, respiration, spo21, blopre, pulse, temperature, air_oxygen, conscious  = 0;
    respiration = respirationCaluculator(state.respiration);
    spo21 = spo21Caluculator(state.spo21);
    blopre = blopreCaluculator(state.blopre);
    pulse = pulseCaluculator(state.pulse);
    temperature = temperatureCaluculator(state.temperature);
    air_oxygen = oxygenCaluculator(state.air_oxygen);
    conscious = consciousnessCaluculator(state.conscious);
    totalValue = (respiration + spo21 +spo21+ blopre + pulse + temperature + air_oxygen + conscious);
    // logger.info(totalValue);
    if (totalValue >= 1 && 4 >= totalValue) {
      color.current="red";
      //setColor("red");
    } else if (totalValue >= 5 && 6 >= totalValue) {
     // setColor("green");
     color.current="green";
    } else if (totalValue >= 7) {
     // setColor("yellow");
     color.current="yellow";
    } else {
      //setColor("");
      color.current="white";
    }
    setTotal({ ...getTotal, total: totalValue });
    
  },[state])

 
  useEffect(( ) => {
    calculateScore();
  },[calculateScore])


  const resetScore = useCallback(() => {
    setState({
     // ...state,
      respiration: 0,
      spo21: 0,
      spo22: 0,
      blopre: 0,
      pulse: 0,
      temperature: 0,
      air_oxygen: 0,
      conscious: 0,
    });
   // setTotal({ ...getTotal, total: 0 });
  })
  

  
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="logo" align="text-center">
              { <img src={companyLogo} /> }
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <fieldset className="scheduler-border-top">
              <legend className="scheduler-border">Enter Parameters</legend>

              <div className="form-group">
                Respiration Rate
                <div>
                  <input
                    type="text"
                    min="1"
                    max="15"
                    value={state.respiration}
                    className="form-control"
                    onChange={handleChangeFields}
                    name="respiration"
                    placeholder="Respiration Rate"
                  />
                </div>
              </div>
              <div className="form-group">
                SPO2(scale1)
                <div>
                  <input
                    type="text"
                    value={state.spo21}
                    className="form-control"
                    onChange={handleChangeFields}
                    name="spo21"
                    placeholder="SPO2(scale1)"
                  />
                </div>
              </div>
              <div className="form-group">
                SPO2(scale2)
                <div>
                  <input
                    type="text"
                    value={state.spo21}
                    className="form-control"
                    onChange={handleChangeFields}
                    name="spo21"
                    placeholder="SPO2(scale2)"
                  />
                </div>
              </div>
              <div className="form-group">
                Systolic Blood Pressure
                <div>
                  <input
                    type="text"
                    value={state.blopre}
                    className="form-control"
                    onChange={handleChangeFields}
                    name="blopre"
                    placeholder="Blood Pressure"
                  />
                </div>
              </div>
              <div className="form-group">
                Pulse(per minute)
                <div>
                  <input
                    type="text"
                    value={state.pulse}
                    className="form-control"
                    onChange={handleChangeFields}
                    name="pulse"
                    placeholder="Pulse"
                  />
                </div>
              </div>
              <div className="form-group">
                Temperature
                <div>
                  <input
                    type="text"
                    value={state.temperature}
                    className="form-control"
                    onChange={handleChangeFields}
                    name="temperature"
                    placeholder="Temperature"
                  />
                </div>
              </div>
              <div className="form-group">
                Select Air or Oxygen
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    onChange={handleChangeFields}
                    name="air_oxygen"
                    id="exampleRadios1"
                    value="air"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Air
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    onChange={handleChangeFields}
                    name="air_oxygen"
                    id="exampleRadios2"
                    value="oxy"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Oxygen
                  </label>
                </div>
              </div>
              <div className="form-group">
                Consciousness
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    onChange={handleChangeFields}
                    name="conscious"
                    id="exampleRadios3"
                    value="alert" 
                  />
                  <label className="form-check-label" htmlFor="exampleRadios3">
                    Alert
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    onChange={handleChangeFields}
                    name="conscious"
                    id="exampleRadios4"
                    value="CVPU"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios4">
                    CVPU
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="col-md-4" id="scores">
            <fieldset className="scheduler-border-top">
              <legend className="scheduler-border">Calculated Scores</legend>

              <div>
                {" "}
                Respiration Rate
                <div className="" id="">
                  <h5>{respirationCaluculator(state.respiration)} </h5>
                </div>
              </div>
              <br />

              <div>
                SPO2(scale1)
                <div className="" id="">
                  <h5> {spo21Caluculator(state.spo21)}</h5>
                  <br />
                </div>
              </div>

              <div>
                SPO2(scale2)
                <div className="" id="">
                  <h5> {spo21Caluculator(state.spo21)}</h5>
                </div>
                <br />
              </div>

              <div>
                Systolic Blood Pressure
                <div className="" id="">
                  <h5> {blopreCaluculator(state.blopre)} </h5>
                </div>
              </div>
              <br />
              <div>
                Pulse(per minute)
                <div className="" id="">
                  <h5> {pulseCaluculator(state.pulse)} </h5>
                </div>
              </div>
              <br />
              <div>
                Temperature
                <div className="" id="">
                  <h5> {temperatureCaluculator(state.temperature)} </h5>
                </div>
              </div>
              <br />
              <div>
                Air/Oxygen
                <div className="" id="">
                  <h5> {oxygenCaluculator(state.air_oxygen)} </h5>
                </div>
                <br />
              </div>
              <div>
                Consciousness
                <div className="" id="">
                  <h5> {consciousnessCaluculator(state.conscious)}</h5>
                </div>
                <br />
              </div>
            </fieldset>
          </div>

          <div className="col-md-4">
            <div className="row" id="four">
              {/*<div className="form-group" id="five">
                                            <div> Patient Analysis Chart:
                                                <p></p>
                                                
                                            </div>
                                    </div>*/}
            </div>
            <div className="row" id="">
              {/* <div className="col-md-6">
                                        <div className="form-group" id="">
                                            <div className="text-center">
                                                    <table border="1"><tr>
                                                            
                                                            <th>ResRate</th>
                                                            <th>SPo21</th>
                                                            <th>SPo22</th>
                                                            <th>BP</th>
                                                            <th>Pulse</th>
                                                            <th>Temp</th>
                                                            </tr>

                                                            <tr>
                                                            <td>{respirationCaluculator(state.respiration)}</td>
                                                                <td>{spo21Caluculator(state.spo21)} </td> 
                                                                <td>{spo22Caluculator(state.spo22)} </td>
                                                                <td>{blopreCaluculator(state.blopre)} </td>
                                                                <td>{pulseCaluculator(state.pulse)} </td>
                                                                <td>{temperatureCaluculator(state.temperature)} </td>
                                                            </tr></table>
                                            </div>
                                        </div>
                                  </div>*/}
            </div>

            <div className="row" id="two">
              <table border="5">
                <th>
                  <h5>Total News Score</h5>
                </th>

                <tr>
                  <td className={color.current}>
                    <h5>{getTotal.total}</h5>
                  </td>
                </tr>
              </table>
            </div>
            <div className="row" id="button1">
              {/* <button
                type="button"
                onClick={calculateScore}
                className="btn btn-primary"
              >
                Calculate
              </button> */}
            </div>

            <div className="row" id="button2">
              <button
                type="button"
                onClick={resetScore}
                className="btn btn-primary"
              >
                Reset{" "}
              </button>
            </div>
          </div>
        </div>

        <fieldset className="scheduler-border-top" id="info">
          <legend className="scheduler-border-top">General Info</legend>
          <div className="row">
            <div className="col-md-1">
              {/*<div className="form-group" id="flex">Enter Name
                                <div id="inner" contentEditable="true" spellCheck="false"></div>
                            </div>*/}
            </div>
            <div className="col-md-3">
              <div className="form-group">
                Age
                {/*<div id="date-picker-example" className="md-form md-outline input-with-post-icon datepicker" inline="false">
                                </div>*/}
                <input type="text" className="form-control" name="birthdate" />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                Gender
                <div>
                  <select type="menu" className="form-control" placeholder="">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-group">
                Weight
                <div>
                  <input
                    type="text"
                    className="form-control"
                    name="weight"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                Height
                <div>
                  <input
                    type="text"
                    className="form-control"
                    name="height"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};
export default Caluculator;
