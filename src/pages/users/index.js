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

    const [usersTemp, setUsersTemp] = useState([])

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
        
        fetch('https://my-json-server.typicode.com/tractian/fake-api/users')
        .then(async(res) => await res.json())
        .then((json) => {

            setUsers(json)

        })
        
    },[])

    // useEffect(()=> {

    //     var usersTemp = users

    //     usersTemp.map((item,index)=> {

    //         fetch(`https://my-json-server.typicode.com/tractian/fake-api/units/${item.unitId}`)
    //         .then(async(res) => await res.json())
    //         .then((json) => users[index].unityName = json.name)

    //     })

    //     // setTimeout(() => {

    //         console.log( usersTemp)
            
    //     // }, 1000);


    //     // fetch('https://my-json-server.typicode.com/tractian/fake-api/users')
    //     // .then(res => res.json())
    //     // .then(json => usersTemp = json)
        
        
    // },[])

    return (

        <div className="Actives" >

            <LeftSideBar />

            <div style={{ display: displayModal }} role="dialog" className='divModal' >

                <span onClick={closeModal}>X</span>
                <Modal displayProperty={displayModal} modalData={modalData} screen='users' />

            </div>

            <div className='screenDescription' >
                <p>Usuários</p>
            </div>

            <section className='sectionActives' >

                <div className='leftSide' >

                    {users.map(item => (

                        <div className='defaultBox flexDisplayBetween boxActives' onClick={() => { handleModalInfos(item) }}>

                            <img src={userIcon} />

                            <h3>{item.companyName} - {item.name}</h3>
                            <h3>E-mail: {item.email}</h3>
                            {/* <h3>{companies[item.companyId - 1].name} - {item.name}</h3> */}

                            {/* <h4>{console.log(item)}</h4> */}
                            
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
