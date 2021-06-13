import {React} from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/home'
import Actives from './pages/actives'
import Units from './pages/units'
import Users from './pages/users'
import Companies from './pages/companies'

const Routes = () => {

    return (

        <BrowserRouter>

            <Route component={Home} path='/' exact />
            <Route component={Actives} path='/ativos' />
            <Route component={Units} path='/unidades' />
            <Route component={Users} path='/usuarios' />
            <Route component={Companies} path='/empresas' />
        
        </BrowserRouter>

    )

}

export default Routes;