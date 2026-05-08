/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Policy } from "./pages/Policy";
import { PolicyForm } from "./pages/PolicyForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="policy/new" element={<PolicyForm />} />
          <Route path="policy/edit/:id" element={<PolicyForm />} />
          <Route path="policy/:appId" element={<Policy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
