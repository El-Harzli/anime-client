import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@context/authContext';

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  // 🧠 While still checking authentication (initial mount)
  // you can show a loading spinner or return null if needed.
  // But for now, let's assume your refreshUser handles that quickly.
  if (isLoading) return null; // or <Spinner />

  // Not logged in → redirect to home (or login page if you have one)
  // Authenticated → allow nested routes
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
