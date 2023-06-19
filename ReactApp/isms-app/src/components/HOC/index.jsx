/*
 * Description: This file contains the "Higher-Order Component". It is a design pattern in React to reuse logic and functionality between components.
 * Author: Tu Doan Anh
 * Created Date: 2023-06-16
 */

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

/**
 * This function helps to check the conditions before accessing the route
 */
const ProtectedRoute = ({ component: Component, layout: Layout, ...rest }) => {
  if (true) {
    return <Navigate to="/login" />;
  }

  return (
    <Route
      {...rest}
      element={
        <Layout>
          <Component />
        </Layout>
      }
    />
  );
};

export { ProtectedRoute };

