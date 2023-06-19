/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import * as myRoutes from "./routes";
import DefaultLayout from "./components/Layout/DefaultLayout";
import { ProtectedRoute } from "./components/HOC";

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
                  <ProtectedRoute key={index} path={route.path} component={Page} layout={Layout} />
                );
              })      
              }

            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
