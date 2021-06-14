import React, { useEffect, useState} from "react";
import "./style.css";

import ReactCircleModal from 'react-circle-modal'

function Modal (props) {

    const { displayProperty, modalData, screen} = props;

    const [ dataUnity, setDataUnity ] = useState({
        companyId: 0,
        healthscore: 0,
        id: 0,
        image: "",
        metrics: {lastUptimeAt: '', totalCollectsUptime: 0, totalUptime: 0},
        model: "",
        name: "",
        sensors: [],
        specifications: {},
        status: ""
    });

    const [infosActives, setInfosActives] = useState({name: '', image: ''})

    function updateUnitsInfos (newName) {

        const temp = modalData
        temp.name = newName
        setDataUnity(temp)
        alert('Nome alterado! saia desta tela para ver as alterações')
        
    }

    function handleNameUnity (event) {

        if (event.key == 'Enter') {

            var newName = event.target.value
            updateUnitsInfos(newName)

        }
        
    }

    function handleInfosActives (event) {

        const {name, value} = event.target

        setInfosActives({
            ...infosActives, [name]: value
        })
        
    }

    useEffect(()=> {

        setDataUnity(modalData)

    },[modalData])

    switch (screen) {

        case 'units':

            return(

                <div style={{display: displayProperty}} className='Modal'>
        
                    <main>
        
                        <div className='infoModal' >
        
                            <h3>Nome: <b>{dataUnity.name}</b></h3>
        
                            <h3>Empresa: <b>{dataUnity.name}</b></h3>
        
                        </div>
        

                        <ReactCircleModal

                            backgroundColor="#FFF"
                            toogleComponent={onClick => (

                                <p className='textAlterInfosModal' >
                                    Deseja alterar alguma informação?
                                    <br/><b onClick={onClick} >clique aqui</b>
                                </p>

                            )}
                            offsetX={0}
                            offsetY={0}
                        >
                        {(onClick) => (
                            <div className='alterInfoModal' >

                                <span onClick={onClick} >X</span>

                                <input placeholder='Nome da unidade' onKeyDown={handleNameUnity} />
            
                                <select>
                                    <option>Empresa da unidade</option>
                                    <option>Empresa teste</option>
                                </select>

                                <a className='buttonSendAlterModal' onClick={()=>{}} >Alterar</a>
                            
                            </div>
                        )}
                    </ReactCircleModal>
        
                    </main>
        
                </div>
            )
            
            break;

        case 'actives': 

        return(

            <div style={{display: displayProperty}} className='Modal'>
        
                <main>
    
                    <div className='activesInfoModal' >

                        <h3>{dataUnity.name}</h3>

                        <img src={dataUnity.image}/>

                        <div className='infosActive' >

                            <div className='defaultBox2'>
                                <h4>Modelo: <b>{dataUnity.model}</b></h4>
                            </div>
    
                            <div className='defaultBox2'>

                                <h4>Status:</h4>

                                {
                                    dataUnity.status == 'inAlert' ?
                                        <div className='lineInfosBoxActives' >
                                            <span className="circleInAlert" ></span>
                                            <p>Em alerta! - <b>{dataUnity.healthscore}% de saude</b></p>
                                        </div>

                                    : dataUnity.status == 'inDowntime' ?
                                        <div className='lineInfosBoxActives' >
                                            <span className="circleInDowntime" ></span>
                                            <p>Em parada - <b>{dataUnity.healthscore}%</b> de saude</p>
                                        </div>

                                    :   
                                        <div className='lineInfosBoxActives' >
                                            <span className="circleInOperation" ></span>
                                            <p>Em Operação! - <b>{dataUnity.healthscore}%</b> de saude</p>
                                        </div>
                                
                                }

                            </div>

                            <div className='defaultBox2'>

                                <h4>Métricas:</h4>

                                {
                                    dataUnity.metrics ? (

                                        <ul>
                                            <li>Última vez ativo:  
                                                <b>{dataUnity.metrics.lastUptimeAt ? dataUnity.metrics.lastUptimeAt : ''}</b>
                                            </li>
                                            <li>Tempo total de coleta:  
                                                <b>{dataUnity.metrics.totalCollectsUptime ? dataUnity.metrics.totalCollectsUptime : ''}</b>
                                            </li>
                                            <li>Tempo de atividade Total: 
                                                <b>{dataUnity.metrics.totalUptime ? (dataUnity.metrics.totalUptime).toFixed(2) : ''}</b>
                                            </li>
                                        </ul>

                                    )
                                    : ''
                                }
                                

                            </div>
                        
                        </div>
    
                    </div>

                    <ReactCircleModal

                        backgroundColor="#FFF"
                        toogleComponent={onClick => (

                            <p className='textAlterInfosModal' >
                                Deseja alterar alguma informação?
                                <br/><b onClick={onClick} >clique aqui</b>
                            </p>

                        )}
                        offsetX={0}
                        offsetY={0}
                    >
                    {(onClick) => (
                        <div className='alterInfoModal' >

                            <span onClick={onClick} >X</span>

                            <input name='name' placeholder='Nome' onChange={handleInfosActives} />

                            <input name='image' type='file' placeholder='Imagem' onChange={handleInfosActives} />

                            <a className='buttonSendAlterModal' onClick={()=>{}} >Alterar</a>
                        
                        </div>
                    )}
                    </ReactCircleModal>
    
                </main>
        
            </div>
        )

        case 'companies':

            return (

                <div style={{display: displayProperty}} className='Modal'>
        
                    <main>
        
                        <div className='infoModal' >
        
                            <h3>Nome: <b>{dataUnity.name}</b></h3>
        
                        </div>

                        <ReactCircleModal

                            backgroundColor="#FFF"
                            toogleComponent={onClick => (

                                <p className='textAlterInfosModal' >
                                    Deseja alterar alguma informação?
                                    <br/><b onClick={onClick} >clique aqui</b>
                                </p>

                            )}
                            offsetX={0}
                            offsetY={0}
                        >
                            {(onClick) => (
                                <div className='alterInfoModal' >

                                    <span onClick={onClick} >X</span>

                                    <input name='name' placeholder='Nome' onChange={handleInfosActives} />

                                    <a className='buttonSendAlterModal' onClick={()=>{}} >Alterar</a>
                                
                                </div>
                            )}
                        </ReactCircleModal>
        
        
                    </main>
        
                </div>
        )

        case 'users':

            return (

                <div style={{display: displayProperty}} className='Modal'>
        
                    <main>
        
                        <div className='infoModal' >
        
                            <h3>Nome: <b>{dataUnity.name}</b></h3>
        
                            <h3>E-mail: <b>{dataUnity.email}</b></h3>

                            <h3>Unidade: <b>{dataUnity.unitName}</b></h3>
        
                        </div>
        
                        <ReactCircleModal

                            backgroundColor="#FFF"
                            toogleComponent={onClick => (

                                <p className='textAlterInfosModal' >
                                    Deseja alterar alguma informação?
                                    <br/><b onClick={onClick} >clique aqui</b>
                                </p>

                            )}
                            offsetX={0}
                            offsetY={0}
                        >
                            {(onClick) => (
                                <div className='alterInfoModal' >

                                    <span onClick={onClick} >X</span>

                                    <input name='name' placeholder='Nome' onChange={handleInfosActives} />

                                    <input name='email' placeholder='E-mail' onChange={handleInfosActives} />

                                    <a className='buttonSendAlterModal' onClick={()=>{}} >Alterar</a>
                                
                                </div>
                            )}
                        </ReactCircleModal>
        
                    </main>
        
                </div>
        )
    
        default:
            break;
    }

    
}

export default Modal;