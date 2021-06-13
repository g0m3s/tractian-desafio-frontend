import React, {useEffect, useState} from 'react'
import './style.css'

import LeftSideBar from '../../components/leftSideBar'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {Link} from 'react-router-dom'

function Home () {

    const [actives, setActives] = useState([])
    const [optionsHealth, setOptionsHealth] = useState({
        chart: { width: 380, height: 300, backgroundColor: 'transparent' },
        colors: ['#185ef6'],
        title: { style: { display: 'none' } },
        xAxis: { categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'] },
        yAxis: {
            labels: { enabled: false },
            title: { text: null },
            gridLineWidth: 0,
        },
        series: [
            {
                name: 'Saúde dos Ativos [%]',
                type: 'area',
                data: [68.65, 72.45, 78.21, 66.02, 70.02],
            },
        ],
        credits: { enabled: false },
    })
    const [optionsCollects, setOptionsCollects] = useState({
        chart: { width: 380, height: 300, backgroundColor: 'transparent' },
        colors: ['#185ef6'],
        title: { style: { display: 'none' } },
        xAxis: { categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'] },
        yAxis: {
            labels: { enabled: false },
            title: { text: null },
            gridLineWidth: 0,
        },
        series: [
            {
                name: 'Total de coletas [%]',
                type: 'area',
                data: [7318, 10413, 15090, 18340, 19946],
            },
        ],
        credits: { enabled: false },
    })

    const [activesInOperation, setActivesInOperation] = useState(0)
    const [activesInAlert, setActivesInAlert] = useState(0)
    const [activesInDownTime, setActivesInDownTime] = useState(0)
    const [totalCollectsUptime, setTotalCollectsUptime] = useState(0)

    useEffect(()=> {

        fetch('https://my-json-server.typicode.com/tractian/fake-api/assets')
        .then(async (res) => await res.json())
        .then((json) => {setActives(json)})
        
    },[])

    useEffect(()=>{

        initCounter()

    },[actives])

    function initCounter () {

        console.log(actives)

        var activesInOperationTemp = 0
        var activesInAlertTemp = 0
        var activesInDownTimeTemp = 0
        var totalCollectsUptimeTemp = 0

        actives.map((active, index)=>{

            if(active.status == 'inAlert')
                activesInAlertTemp = activesInAlertTemp + 1
            else if (active.status == 'inOperation')
                activesInOperationTemp = activesInOperationTemp + 1
            else if (active.status == 'inDowntime')
                activesInDownTimeTemp = activesInDownTimeTemp + 1

            totalCollectsUptimeTemp = active.metrics.totalCollectsUptime + totalCollectsUptimeTemp

        })

        setActivesInAlert(activesInAlertTemp)
        setActivesInOperation(activesInOperationTemp)
        setActivesInDownTime(activesInDownTimeTemp)
        setTotalCollectsUptime(totalCollectsUptimeTemp)
        
    }

    return (

        <div className="Home" >

            <LeftSideBar />

            <div className='screenDescription' >
                <p>Visão geral</p>
            </div>

            <section className='sectionHome'>

                <div className='leftSideHome' >

                    <div className='activesReports' >

                        <h3>Relatório dos ativos:</h3>

                        <div className='lineActivesReports' >

                            <div className='boxHome' >

                                <h3>{actives.length} Ativos</h3>

                            </div>

                        </div>

                        <div className='lineActivesReports' >

                            <div className='boxHome' >

                                <p>Em operação</p>
                                <p>{activesInOperation}</p>

                            </div>

                            <div className='boxHome' >

                                <p>Em alerta</p>
                                <p>{activesInAlert}</p>

                            </div>

                            <div className='boxHome' >

                                <p>Parados</p>
                                <p>{activesInDownTime}</p>

                            </div>

                        </div>

                    </div>

                    <div className='activesReports' >

                        <div className='lineActivesReports' >

                            <div className='boxHome maxWidth' >

                                <p>Tempo total de coleta:</p>
                                <p>{totalCollectsUptime}</p>
                                
                            </div>

                        </div>

                    </div>

                    <div className='activesReports' >

                        <div className='lineActivesReports' >

                            <div className='boxHome maxWidth' >

                                <p>Data da última coleta:</p>
                                <p>14/06/21 - 14:35:06</p>
                                
                            </div>

                        </div>

                    </div>

                    <div className='activesReports' >

                        <div className='lineActivesReports' >

                            <div className='boxHome maxWidth' >

                                <p>Total de coletas:</p>
                                <p>65.143</p>
                                
                            </div>

                        </div>

                    </div>


                    <Link to='/ativos' className='buttonSeeAllActives' >Ver todos os ativos</Link>

                </div>

                <div className='rightSideHome' >

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={optionsHealth}
                    />

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={optionsCollects}
                    />

                </div>

            </section>
            

        </div>

    );
}

export default Home;
