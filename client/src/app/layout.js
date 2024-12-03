// src/App.js or src/index.js
"use client"; 
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoleGuard from "@/components/RoleGuard";
import Home from "./page";
import { ProductTable } from "@/components/ProductTable";
import AnalyticsPage from "@/pages/AnalyticsPage";
import AlertsPage from "@/components/alerts";
import CallExpense from "@/components/CallExpense";
import WhiteLabelingPage from "@/components/WhiteLabelingPage";
import AdminPage from "@/components/AdminPage";
import CallDetails from "@/components/CallDetails";
import SettingsPage from "@/components/SettingsPage";
import MainComponent from "@/components/MainComponent";
import ClientSubaccounts from "@/components/ClientSubaccounts";
import Unauthorized from "@/components/Unauthorized";
import { ClerkProvider } from '@clerk/clerk-react';
import AuthContent from "@/components/AuthContent";
import { RoleProvider } from "@/components/RoleContext";
import { AlertsProvider } from "@/components/alertsContext";
import KnowledgeBase from "@/components/KnowledgeBase";

const clerkFrontendApi = 'https://humane-shrew-49.clerk.accounts.dev';
const publishableKey = 'pk_test_aHVtYW5lLXNocmV3LTQ5LmNsZXJrLmFjY291bnRzLmRldiQ';

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        margin: 0,
      },
    },
  },
});

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <ClerkProvider frontendApi={clerkFrontendApi} publishableKey={publishableKey}>
          <ChakraProvider theme={theme}>
            <RoleProvider>
              <AlertsProvider> {/* Wrap the entire application with AlertsProvider */}
                <BrowserRouter>
                  <Refine routerProvider={routerProvider}>
                    <Routes>
                      <Route path="/login" element={<AuthContent />} />
                      <Route path="/unauthorized" element={<Unauthorized />} />
                      <Route path="/" element={<Home />} />
                      <Route path="/call/:id" element={<CallDetails />} />
                      <Route path="/settings" element={<MainComponent />} />
                      <Route path="/knowledge-base" element={<KnowledgeBase />} />
                      <Route path="/products" element={<ProductTable />} />
                      <Route path="/alerts" element={<AlertsPage />} />
                      <Route path="/call-expense" element={<RoleGuard allowedRoles={["Admin", "Agency"]}><CallExpense /></RoleGuard>} />
                      <Route path="/analytics" element={<AnalyticsPage />} />
                      <Route path="/whitelabel" element={<RoleGuard allowedRoles={["Admin", "Agency"]}><WhiteLabelingPage /></RoleGuard>} />
                      <Route path="/admin" element={<RoleGuard allowedRoles={["Admin"]}><AdminPage /></RoleGuard>} />
                      <Route path="/subaccounts" element={<RoleGuard allowedRoles={["Client"]}><ClientSubaccounts /></RoleGuard>} />
                      <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                  </Refine>
                </BrowserRouter>
              </AlertsProvider>
            </RoleProvider>
          </ChakraProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
