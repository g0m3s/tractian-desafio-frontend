import React, {useState, createRef} from 'react'
import { useEffect } from "react";
import { Link } from "react-router-dom";

import './style.css'
import enterpriseIcon from '../../imgs/enterprise.png'
import userIcon from '../../imgs/user.png'
import unitsIcon from '../../imgs/units.png'
import logoTractian1 from '../../imgs/logoTractian-2.png'

export default function Header (props) {

    const [isChecked,setIsChecked] = useState(false)

    const menuMobile = createRef()

    function showMenuMobile() {

        if (isChecked)
            menuMobile.current.style.display = 'none'
        else
            menuMobile.current.style.display = 'flex'
        
    }

    return (

        <div>

            <header>

                <div className='logo' >

                    <Link to='/'> <img src={logoTractian1} alt="logo TRACTIAN" /> </Link>

                </div>

                <div className='menu' >

                    <ul>

                        <li className='flexDisplayCenter' >

                        <Link to='/ativos' className='flexDisplayBetween' >
                            <p>Ativos</p>
                        </Link>
                        
                    </li>

                    <li className='flexDisplayCenter' >

                        <Link to='/empresas' className='flexDisplayBetween'>
                            <p>Empresas</p>
                        </Link>

                    </li>

                    <li className='flexDisplayCenter' >

                        <Link to='/unidades' className='flexDisplayBetween'>
                            <p>Unidades</p>
                        </Link>

                    </li>
                    
                    <li className='flexDisplayCenter' >

                        <Link to='/usuarios' className='flexDisplayBetween' >
                            <p>Usuários</p>
                        </Link>
                    </li>

                    </ul>
                    
                </div>

                <div className="sandwich" >

                    <input type="checkbox" id="checkbox" onClick={ () => {

                        setIsChecked(!isChecked);
                        showMenuMobile()

                    }} />

                    <label htmlFor="checkbox" >

                        <span></span>
                        <span></span>
                        <span></span>

                    </label>

                </div>

            </header>

            <div className='menu-mobile' ref = {menuMobile} >

                <div className='TractianLogoMobile' >

                    <img src={logoTractian1} alt="logo Tractian" />

                </div>

                <ul className='itensMenuMobile' >

                    <li className='flexDisplayCenter' >

                        <Link to='/ativos' className='flexDisplayBetween' >
                            <img src={userIcon} alt="icone de usuário" />
                            <p>Ativos</p>

                        </Link>
                    </li>

                    <li className='flexDisplayCenter' >

                        <Link to='/empresas' className='flexDisplayBetween'>
                            <img src={enterpriseIcon} alt="enterprise Icon" />
                            <p>Empresas</p>
                        </Link>

                    </li>

                    <li className='flexDisplayCenter' >

                        <Link to='/unidades' className='flexDisplayBetween'>
                            <img src={unitsIcon} alt="icone de unidades" />
                            <p>Unidades</p>

                        </Link>
                    </li>
                    
                    <li className='flexDisplayCenter' >

                        <Link to='/usuarios' className='flexDisplayBetween' >
                            <img src={userIcon} alt="icone de usuário" />
                            <p>Usuários</p>

                        </Link>
                    </li>

                </ul>

            </div>

        </div>

    )
}