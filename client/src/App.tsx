import { useEffect } from "react";
import { Route, Switch } from "wouter";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import ServerManagementPage from "@/pages/server-management";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route path="/" component={DashboardPage} />
        <Route path="/server/:serverId" component={ServerManagementPage} />
      </Switch>
      <Toaster />
    </AuthProvider>
  );
}

export default App;