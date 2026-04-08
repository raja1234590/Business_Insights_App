import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { getInsights } from '../services/api';

const InsightCard = ({ title, value, color }) => (
  <View style={[styles.card, { borderLeftColor: color, borderLeftWidth: 4 }]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={[styles.cardValue, { color }]}>{value}</Text>
  </View>
);

export default function DashboardScreen() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInsights = async () => {
    try {
      const data = await getInsights();
      setInsights(data);
    } catch (error) {
      console.log('Error fetching insights:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchInsights();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Overview</Text>
        <Text style={styles.headerSubtitle}>Your performance at a glance</Text>
      </View>

      <View style={styles.grid}>
        <InsightCard 
          title="Profile Views" 
          value={insights?.profile_views || 0} 
          color={COLORS.primary} 
        />
        <InsightCard 
          title="Search Views" 
          value={insights?.search_views || 0} 
          color={COLORS.secondary} 
        />
        <InsightCard 
          title="Website Clicks" 
          value={insights?.website_clicks || 0} 
          color={COLORS.success} 
        />
        <InsightCard 
          title="Phone Calls" 
          value={insights?.phone_calls || 0} 
          color={COLORS.warning} 
        />
        <InsightCard 
          title="Direction Requests" 
          value={insights?.direction_requests || 0} 
          color={COLORS.accent} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: SIZES.padding,
    paddingTop: SIZES.extraLarge,
  },
  headerTitle: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginTop: SIZES.base / 2,
  },
  grid: {
    padding: SIZES.padding,
    gap: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    ...SHADOWS.light,
  },
  cardTitle: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    marginTop: SIZES.base,
  },
});
