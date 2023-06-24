/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import * as myRoutes from "./routes";
import DefaultLayout from "./components/Layout/DefaultLayout";
import RequiredAuth from "./components/HOC/RequiredAuth";
import {ROLES} from '../src/routes/Roles';

function App() {
  return (
    <>
      <div className="main">
        <Router>
          <div className="App">
            <Routes>
              {
              //Định tuyến cho các Route public
               myRoutes.publicRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;

                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                
                return (
                  <Route key={index} path={route.path} element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })      
              }

              <Route element={<RequiredAuth allowedRoles={[ROLES.Customer, ROLES.Agent, ROLES.Administrator]}/>}>
              {
              //Định tuyến cho các Route public
              myRoutes.privateRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;

                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                
                return (
                  <Route key={index} path={route.path} element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
                );
              })      
              }
              </Route>

            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
