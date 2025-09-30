import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import '@/theme'; // Import theme configuration
import { Calendar } from './components';
import { EVENTS } from './data/fixedEvents';
import type { CalendarEvent } from './data/fixedEvents';

export default function App() {
  // Simple event renderer component
  const renderEvent = (event: CalendarEvent) => (
    <View style={{
      backgroundColor: event.color,
      padding: 4,
      borderRadius: 4,
      margin: 1,
    }}>
      <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
        {event.title}
      </Text>
      <Text style={{ color: 'white', fontSize: 8 }}>
        {event.startTime} - {event.endTime}
      </Text>
    </View>
  );

  return (
    <>
      <StatusBar style="auto" />
      <Calendar 
        events={EVENTS} 
        renderEvent={renderEvent} 
      />
    </>
  );
}