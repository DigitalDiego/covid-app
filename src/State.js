import React from 'react'
import styled from 'styled-components'
import {AiOutlinePlus} from 'react-icons/ai'
import {AiOutlineMinus} from 'react-icons/ai'
const Container = styled.section`
    width:90%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    border-bottom:1px solid linen;
    margin:auto;
    height:80px;
    .two-items{
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        h1{
            margin-bottom:1em;
            font-size:1em;
            color:linen;
            text-align:center;
        }
        p{
            color:linen;
            text-align:center;
        }
    }
    .state{
        width:20%;
    }
    .total-cases{
        width:30%;
    }
    .todays-cases{
        width:30%;
    }
    .plus-div{
        background:linen;
        width:1.1em;
        height:1.1em;
        display:grid;
        place-items:center;
        border-radius:50%;
        .plus{
            color:linen;
            cursor:pointer;
            color:#619b8a;
        }
    }
    .deseased{
        display:none;
    }
    .link{
        display:none;
        place-items:center;
        a{
            color:linen;
            text-decoration:none;
        }
    }
`
const State = ({state, cases, new_cases, deseased, vaccination_rate, vaccinations, infection_rate, selected, toggle, index}) => {
    return (
        <Container className={state}>
            <div className="two-items state">
                <h1>State</h1>
                <p>{state}</p>
            </div>
            <div className="two-items total-cases">
                <h1>Total Cases</h1>
                <p>{cases.toLocaleString()}</p>
            </div>
            <div className="two-items todays-cases">
                <h1>Today</h1>
                <p>{new_cases.toLocaleString()}</p>
            </div>
            <div className="plus-div" OnClick={() => toggle(index)}>
                {selected === index ? <AiOutlinePlus className="plus"/> : <AiOutlineMinus className="plus"/>}
            </div>
            <div className="more-info">
                <div className="two-items">
                    <h1>Deaths</h1>
                    <p>{deseased}</p>
                </div>
                <div className="two-items">
                    <h1>Vaccinations</h1>
                    <p>{vaccinations}</p>
                </div>
                <div className="two-items">
                    <h1>Vaccination Rate</h1>
                    <p>{vaccination_rate}</p>
                </div>
                <div className="two-items">
                    <h1>Infection Rate</h1>
                    <p>{infection_rate}</p>
                </div>
            </div>
        </Container>
    )
}

export default State
