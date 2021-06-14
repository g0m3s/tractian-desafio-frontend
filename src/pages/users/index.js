import React, {useEffect, useState} from 'react'
import LeftSideBar from '../../components/leftSideBar'
import Modal from '../../components/modal'

import userIcon from '../../imgs/userIcon.png'
import './style.css'

function Users () {

    const [users, setUsers] = useState([])

    const [displayModal, setDisplayModal] = useState("none");
    const [modalData, setModalData] = useState({});
    const [heightPageWhenOpenModal, setHeightPageWhenOpenModal] = useState(0)

    const [isloading, setIsloading] = useState(true)

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

        var usersTemp = []

        fetch('https://my-json-server.typicode.com/tractian/fake-api/users')
        .then((res) =>res.json())
        .then(async(json) => {

            usersTemp = json

            usersTemp.map((item, index)=> {

                fetch(`https://my-json-server.typicode.com/tractian/fake-api/units/${item.unitId}`)
                .then((res) => res.json())
                .then((json) => usersTemp[index].unitName = json.name)

            })
            setTimeout(() => {
                setUsers(usersTemp)
            }, 1300);

            setIsloading(false)

        })
        
    },[])

    if (isloading) {

        return (<div></div>)
        
    }else {

        return(

            <div className="Actives" >

                <LeftSideBar />

                <div style={{ display: displayModal }} role="dialog" className='divModal' >

                    <span onClick={closeModal}>X</span>
                    <Modal displayProperty={displayModal} modalData={modalData} screen='users' />

                </div>

                <div className='screenDescription' >
                    <p>Usuários</p>
                </div>

                <span className='spanTips' >Clique em um item para mais informações</span>

                <section className='sectionUsers' >

                    <div className='leftSide' >

                        {users.map(item => (

                            <div className='boxUsers' onClick={() => { handleModalInfos(item) }}>

                                <img src={userIcon} />

                                <h3>{item.name}</h3>
                                <h3>{item.unitName}</h3>
                                <h3>{item.email}</h3>
                                
                            </div>
                            
                        ))}

                    </div>

                    <div className="rightSide" >
                        
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

                <div className='addButton'>
                    <b>+</b>
                </div>

            </div>

        )
    }
}

export default Users;
