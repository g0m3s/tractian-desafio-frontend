import React, {useEffect, useState} from 'react'
import LeftSideBar from '../../components/leftSideBar'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Modal from '../../components/modal'

import logo from '../../imgs/logoTractian-1.png'
import addIcon from '../../imgs/addIcon.png'
import './style.css'

function Actives () {

    const [units, setUnits] = useState([])
    const [companies, setCompanies] = useState([])
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

        fetch('https://my-json-server.typicode.com/tractian/fake-api/units')
        .then(res => res.json())
        .then(json => {setUnits(json)});
        
    },[])

    useEffect(()=> {

        fetch('https://my-json-server.typicode.com/tractian/fake-api/companies')
        .then(res => res.json())
        .then(json => {setCompanies(json)});

        
    },[])

    return (

        <div className="Actives" >

            <LeftSideBar />

            <div style={{ display: displayModal }} role="dialog" className='divModal' >

                <span onClick={closeModal}>X</span>
                <Modal displayProperty={displayModal} modalData={modalData} screen='units' />

            </div>

            <div className='screenDescription' >
                <p>Unidades</p>
            </div>

            <section className='sectionActives' >

                <div className='leftSide' >

                    {units.map(item => (

                        <div className='defaultBox flexDisplayBetween boxActives' onClick={() => { handleModalInfos(item) }}>

                            <img src={logo} />

                            <h3>Empresa Teste - {item.name}</h3>
                            {/* <h3>{companies[item.companyId - 1].name} - {item.name}</h3> */}

                            <h4>{}</h4>
                            
                        </div>
                        
                    ))}

                </div>

                <div className="rightSide" >lado direito</div>
                
            </section>

            <div className='addButton'>
                <b>+</b>
            </div>

        </div>

    );
}

export default Actives;
