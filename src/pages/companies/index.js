import React, {useEffect, useState} from 'react'
import LeftSideBar from '../../components/leftSideBar'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Modal from '../../components/modal'

import logo from '../../imgs/logoTractian-1.png'
import addIcon from '../../imgs/addIcon.png'
import userIcon from '../../imgs/userIcon.png'
import './style.css'

function Users () {

    const [users, setUsers] = useState([])
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

        fetch('https://my-json-server.typicode.com/tractian/fake-api/companies')
        .then(res => res.json())
        .then(json => {setCompanies(json)});

        
    },[])

    return (

        <div className="Actives" >

            <LeftSideBar />

            <div style={{ display: displayModal }} role="dialog" className='divModal' >

                <span onClick={closeModal}>X</span>
                <Modal displayProperty={displayModal} modalData={modalData} screen='companies' />

            </div>

            <div className='screenDescription' >
                <p>Empresas</p>
            </div>

            <span className='spanTips' >Clique em um item para mais informações</span>

            <section className='sectionCompanies'>

                <div className='leftSide' >

                    {companies.map(item => (

                        <div className='boxCompanies' onClick={() => { handleModalInfos(item) }}>

                            <img src={logo} />

                            <h3>Nome: {item.name}</h3>

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

export default Users;
