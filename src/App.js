import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import {AiOutlinePlus} from 'react-icons/ai'
import {AiOutlineMinus} from 'react-icons/ai'
const Container = styled.section`
padding-top:10vh;
  header{
    width:100%;
    height:10vh;
    display:grid;
    place-items:center;
    background:linen;
    position:fixed;
    top:0;
    right:0;
    z-index:2000;
    h1{
      font-size:2em;
      color:#619b8a;
      text-align:center;
    }
    p{
      color:#619b8a;
      text-align:center;
    }
  }
  .container{
    width:100%;
    min-height:90vh;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    padding:1em;
  }
  .WY{
    border:none;
  }
  .state-container{
    width:90%;
    margin:auto;
    .state{
      width:100%;
      border-bottom:1px solid linen;
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      min-height:5em;
      max-height:14em;
      .main-content{
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        height:5em;
        .state-name{
          display:flex;
          justify-content:center;
          align-items:center;
          width:20%;
          border-right:1px solid linen;
          flex-direction:column;
          h1{
            text-align:center;
            color:linen;
            font-size:1em;
          }
          p{
            text-align:center;
            color:linen;
            font-size:20px;
          }
        }
        .total-cases{
          display:flex;
          justify-content:space-between;
          align-items:center;
          flex-direction:column;
          border-right:1px solid linen;
          width:35%;
          h1{
            color:linen;
            text-align:center;
            font-size:1em;
          }
          p{
            color:linen;
            text-align:center;
            font-size:20px;
          }
        }
        .cases-today{
          display:flex;
          justify-content:space-between;
          align-items:center;
          flex-direction:column;
          width:35%;
          h1{
            color:linen;
            font-size:1em;
            text-align:center;
          }
          p{
            color:linen;
            text-align:center;
            font-size:20px;
          }
        }
        .button-container{
          width:10%;
          display:grid;
          place-items:center;
          .plus-button{
            display:grid;
            place-items:center;
            background:linen;
            border-radius:50%;
            border:none;
            outline:none;
            width:2em;
            height:2em;
            z-index:1000;
            .plus{
              color:#619b8a;
              font-size:20px;
            }
          }
        }
      }
      .scroll-down-content{
        width:100%;
        height:0;
        overflow:hidden;
        display:grid;
        grid-template-columns:repeat(2, 1fr);
        transition:all .5s linear;
        &.show{
          height:9em;
        }
        .deseased{
          width:100%;
          height:4.5em;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          h1{
            color:linen;
            text-align:center;
            font-size:1em;
          }
          p{
            color:linen;
            font-size:20px;
            text-align:center;
          }
        }
        .population{
          width:100%;
          height:4.5em;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          h1{
            color:linen;
            font-size:1em;
            text-align:center;
          }
          p{
            color:linen;
            font-size:20px;
            text-align:center;
          }
        }
        .vaccination{
          width:100%;
          height:4.5em;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          h1{
            text-align:center;
            font-size:1em;
            color:linen;
          }
          p{
            text-align:center;
            font-size:20px;
            color:linen;
          }
        }
        .link{
          width:100%;
          height:4.5em;
          display:grid;
          place-items:center;
          a{
            color:linen;
            text-decoration:none;
            font-weight:bold;
            font-size:20px;
          }
        }
      }
    }
  }
`
const App = () => {
  const [states, setStates] = useState([])
  const [state, setState] = useState([])
  const [selected, setSelected] = useState(null)
  const toggle = (index) => {
    if(selected === index){
      return setSelected(null)
    }
    setSelected(index)
  }
  useEffect(() => {
    axios.get(`https://api.covidactnow.org/v2/state/CA.json?apiKey=${process.env.REACT_APP_APIKEY}`)
      .then(res => {
        setState(res.data)
      }).catch(error => console.log(error))
  }, [])
  useEffect(() => {
    axios.get(`https://api.covidactnow.org/v2/states.timeseries.json?apiKey=${process.env.REACT_APP_APIKEY}`)
      .then(res => {
          setStates(res.data)
        }).catch(error => console.log(error))
  }, [])
  return (
    <Container>
      <GlobalStyle/>
      <header>
        <h1>US Covid Cases</h1>
        <p>Last Updated: {state.lastUpdatedDate}</p>
      </header>
      <div className="state-container">
        {states.map((item, index) => (
          <div className="state" key={index}>
            <div className="main-content">
              <div className="state-name">
                <h1>State</h1>
                <p>{item.state}</p>
              </div>
              <div className="total-cases">
                <h1>Total Cases</h1>
                <p>{item.actuals.cases.toLocaleString()}</p>
              </div>
              <div className="cases-today">
                <h1>Cases Today</h1>
                <p>{item.actuals.newCases.toLocaleString()}</p>
              </div>
              <div className="button-container">
                <button className="plus-button" onClick={() => toggle(index)}>
                  {selected === index ? <AiOutlineMinus className="plus"/> : <AiOutlinePlus className="plus"/>}
                </button>
              </div>
            </div>
            <div className={selected === index ? "scroll-down-content show" : "scroll-down-content"}>
              <div className="deseased">
                <h1>Deseased</h1>
                <p>{item.actuals.deaths.toLocaleString()}</p>
              </div>
              <div className="population">
                <h1>Population</h1>
                <p>{item.population.toLocaleString()}</p>
              </div>
              <div className="vaccination">
                <h1>Total Vaccinations</h1>
                <p>{item.actuals.vaccinationsCompleted.toLocaleString()}</p>
              </div>
              <div className="link" target="_blank">
                <a href={item.url}>Learn More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default App
