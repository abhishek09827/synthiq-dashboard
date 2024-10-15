// src/App.js or src/index.js
"use client"; 
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import RoleGuard from "@/components/RoleGuard"; // Import RoleGuard
import Home from "./page";
import { ProductTable } from "@/components/ProductTable";
import AnalyticsPage from "@/pages/AnalyticsPage";
import AlertsPage from "@/components/alerts";
import CallExpense from "@/components/CallExpense";
import WhiteLabelingPage from "@/components/WhiteLabelingPage";
import AdminPage from "@/components/AdminPage"; // Import AdminPage
import CallDetails from "@/components/CallDetails";
import SettingsPage from "@/components/SettingsPage";
import MainComponent from "@/components/MainComponent";
import ClientSubaccounts from "@/components/ClientSubaccounts";
import Unauthorized from "@/components/Unauthorized"; // Import Unauthorized Page
import { ClerkProvider } from '@clerk/clerk-react';
import AuthContent from "@/components/AuthContent"; // Import AuthContent
import { RoleProvider } from "@/components/RoleContext"; // Import RoleProvider

// Extend the Chakra UI theme to apply a black background to the entire body
const clerkFrontendApi = 'https://humane-shrew-49.clerk.accounts.dev';
const publishableKey = 'pk_test_aHVtYW5lLXNocmV3LTQ5LmNsZXJrLmFjY291bnRzLmRldiQ';

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "black", // Set the background color to black
        color: "white", // Set the default text color to white
        minHeight: "100vh", // Ensure the body covers full screen height
        margin: 0, // Remove default margin
      },
    },
  },
});

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        {/* Add publishableKey to ClerkProvider */}
        <ClerkProvider frontendApi={clerkFrontendApi} publishableKey={publishableKey}>
          <ChakraProvider theme={theme}>
            {/* Wrap the application with RoleProvider */}
            <RoleProvider>
              <BrowserRouter>
                <Refine routerProvider={routerProvider}>
                  <Routes>
                    {/* Public route for login, using AuthContent for Clerk authentication */}
                    <Route path="/login" element={<AuthContent />} />

                    {/* Unauthorized route */}
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    {/* Private route for dashboard, protected by AuthGuard */}
                    <Route
                      path="/"
                      element={
                        <AuthGuard>
                          <Home /> {/* Render the dashboard page here */}
                        </AuthGuard>
                      }
                    />

                    {/* Route for viewing call details */}
                    <Route
                      path="/call/:id"
                      element={
                        <AuthGuard>
                          <CallDetails /> {/* Render the CallDetails component here */}
                        </AuthGuard>
                      }
                    />

                    {/* Route for the Settings Page */}
                    <Route
                      path="/settings"
                      element={
                        <AuthGuard>
                          <MainComponent /> {/* Render the SettingsPage component here */}
                        </AuthGuard>
                      }
                    />

                    {/* Route for ProductTable */}
                    <Route
                      path="/products"
                      element={
                        <AuthGuard>
                          <ProductTable /> {/* Render the ProductTable component here */}
                        </AuthGuard>
                      }
                    />

                    {/* Route for AlertsPage */}
                    <Route
                      path="/alerts"
                      element={
                        <AuthGuard>
                          <AlertsPage /> {/* Render the AlertsPage component here */}
                        </AuthGuard>
                      }
                    />

                    {/* Route for Call Expense, protected by RoleGuard */}
                    <Route
                      path="/call-expense"
                      element={
                        <AuthGuard>
                          <RoleGuard allowedRoles={["Admin", "Client"]}>
                            <CallExpense /> {/* Render the CallExpense component here */}
                          </RoleGuard>
                        </AuthGuard>
                      }
                    />

                    {/* Route for the new Analytics Page */}
                    <Route
                      path="/analytics"
                      element={
                        <AuthGuard>
                          <AnalyticsPage /> {/* Render the new AnalyticsPage here */}
                        </AuthGuard>
                      }
                    />

                    {/* Route for the WhiteLabeling Page, protected by RoleGuard */}
                    <Route
                      path="/whitelabel"
                      element={
                        <AuthGuard>
                          <RoleGuard allowedRoles={["Admin", "Client"]}>
                            <WhiteLabelingPage /> {/* Render the WhiteLabelingPage component here */}
                          </RoleGuard>
                        </AuthGuard>
                      }
                    />

                    {/* Admin route protected by RoleGuard for admin users */}
                    <Route
                      path="/admin"
                      element={
                        <AuthGuard>
                          <RoleGuard allowedRoles={["Admin"]}>
                            <AdminPage /> {/* Render the AdminPage here */}
                          </RoleGuard>
                        </AuthGuard>
                      }
                    />

                    {/* Route for Client Subaccounts, protected by RoleGuard */}
                    <Route
                      path="/subaccounts"
                      element={
                        <AuthGuard>
                          <RoleGuard allowedRoles={["Client"]}>
                            <ClientSubaccounts /> {/* Render the ClientSubaccounts here */}
                          </RoleGuard>
                        </AuthGuard>
                      }
                    />

                    {/* Redirect all unknown routes to login page */}
                    <Route path="*" element={<Navigate to="/login" />} />
                  </Routes>
                </Refine>
              </BrowserRouter>
            </RoleProvider>
          </ChakraProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
