import React from "react";
import { shallow } from "enzyme";
import {PrivateRoute} from '../../routers/PrivateRoute';
import { PublicRoute } from "../../routers/PublicRoute";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe ('Validar rutas Publicas y Privadas', () => {
    test('Validar el componente de Rutas Privadas', () => {
        const isLoggedIn = true;
        const wrapper = shallow(
            <PrivateRoute isAuthenticated={isLoggedIn} children={<DashboardRoutes />}/>)
        expect(wrapper).toMatchSnapshot();
    })
    test('Validar el componente de Rutas Publicas', () => {
        const isLoggedIn = true;
        const wrapper = shallow(
            <PublicRoute isAuthenticated={isLoggedIn} children={<DashboardRoutes />}/>)
        expect(wrapper).toMatchSnapshot();
    })
})