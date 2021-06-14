import React, {useEffect, useState} from 'react'

import LeftSideBar from '../../components/leftSideBar'
import Modal from '../../components/modal'
import {Link} from 'react-router-dom'
import './style.css'


function Actives () {

    const [actives, setActives] = useState([])
    const [options, setOptions] = useState({
  
        title: {
            text: 'My chart'
        },
        series: [{
            data: [1, 2, 3]
        }]
    })

    const [displayModal, setDisplayModal] = useState("none");
    const [modalData, setModalData] = useState({});
    const [heightPageWhenOpenModal, setHeightPageWhenOpenModal] = useState(0)

    function handleModalInfos(item) {

        setModalData(item)
        setHeightPageWhenOpenModal(document.body.getBoundingClientRect().top)
        window.scrollTo(0, 0);
        displayModal == "none" ? setDisplayModal("flex") : setDisplayModal("none")

    }

    function closeModal() {

        if (displayModal == "none")
            setDisplayModal("flex")
        else {
            window.scrollTo( -heightPageWhenOpenModal, - heightPageWhenOpenModal)
            setDisplayModal("none");
        }

    }

    useEffect(()=> {

        fetch('https://my-json-server.typicode.com/tractian/fake-api/assets')
        .then(res => res.json())
        .then(json => {setActives(json)});

        var activesInOperation = 0
        var activesInAlert = 0
        var activesInDownTime = 0

        actives.map((active)=>{

            if(active.status == 'inAlert')
                activesInAlert = activesInAlert + 1
            else if (active.status == 'inOperation')
                activesInOperation = activesInOperation + 1
            else if (active.status == 'inDowntime')
                activesInDownTime = activesInDownTime + 1

        })

        setOptions({
            title: {
                text: 'Status de ativos'
            },
            series: [{
                data: [1, 2, 3]
            }]
        })
        
    },[])

    return (

        <div className="Actives" >

            <LeftSideBar />

            <div style={{ display: displayModal }} role="dialog" className='divModal' >

                <span onClick={closeModal}>X</span>
                <Modal displayProperty={displayModal} modalData={modalData} screen='actives' />

            </div>

            <div className='screenDescription' >
                <p>Ativos</p>
            </div>

            <span className='spanTips' >Clique em um item para mais informações</span>

            <section className='sectionActives' >

                <div className='leftSideActives' >

                    {actives.map(item => (

                        <div 
                            className='boxActives'
                            onClick={()=>{handleModalInfos(item)}}
                        >

                            <img src={item.image} />

                            <h3>{item.name} - {item.model}</h3>

                            {
                                item.status == 'inAlert' ?
                                    <div className='lineInfosBoxActives' >
                                        <span className="circleInAlert" ></span>
                                        <p>Em alerta! - <b>{item.healthscore}%</b> de saude</p>
                                    </div>

                                : item.status == 'inDowntime' ?
                                    <div className='lineInfosBoxActives' >
                                        <span className="circleInDowntime" ></span>
                                        <p>Em parada - <b>{item.healthscore}%</b> de saude</p>
                                    </div>

                                :   
                                    <div className='lineInfosBoxActives' >
                                        <span className="circleInOperation" ></span>
                                        <p>Em Operação! - <b>{item.healthscore}%</b> de saude</p>
                                    </div>
                                
                            }
                            
                        </div>
                        
                    ))}

                    <div className='addButton'>
                        <b>+</b>
                    </div>

                </div>
            
                <div className='rightSide' >

                    <h3 >Últimos insights:</h3>

                    <div className='boxTips' >

                        <p>Crescimento contínuo da vibração.</p>
                        <span>13 de junho de 2021 às 15:34</span>

                    </div>

                    <div className='boxTips' >

                        <p>Downtime detectado.</p>
                        <span>13 de junho de 2021 às 07:45</span>

                    </div>

                    <div className='boxTips' >

                        <p>Aumento súbito da velocidade RMS.</p>
                        <span>12 de junho de 2021 às 12:35</span>

                    </div>

                </div>

            </section>

        </div>

    );
}

export default Actives;
