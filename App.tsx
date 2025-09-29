import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MessagingScreen } from '@/components/messaging';
import '@/theme'; // Import theme configuration

export default function App() {
  return (
    <>
      <MessagingScreen />
      <StatusBar style="auto" />
    </>
  );
}