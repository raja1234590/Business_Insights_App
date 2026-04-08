import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { getBusinessProfile } from '../services/api';

export default function ProfileScreen() {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProfile = async () => {
    try {
      const data = await getBusinessProfile();
      setBusiness(data);
    } catch (error) {
      console.log('Error fetching business:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProfile();
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
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{business?.name?.charAt(0) || 'B'}</Text>
        </View>
        <Text style={styles.businessName}>{business?.name}</Text>
        <Text style={styles.category}>{business?.category}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address</Text>
          <Text style={styles.detailValue}>{business?.address}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone Number</Text>
          <Text style={styles.detailValue}>{business?.phone}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{business?.rating} ⭐</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{business?.total_reviews}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
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
    alignItems: 'center',
    padding: SIZES.extraLarge,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...SHADOWS.medium,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding,
    ...SHADOWS.light,
  },
  avatarText: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  businessName: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  category: {
    fontSize: SIZES.medium,
    color: COLORS.surface,
    opacity: 0.8,
    marginTop: SIZES.base / 2,
  },
  detailsContainer: {
    margin: SIZES.padding,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    ...SHADOWS.light,
  },
  detailRow: {
    paddingVertical: SIZES.small,
  },
  detailLabel: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
  },
  detailValue: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    fontWeight: '500',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.background,
    marginVertical: SIZES.base,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZES.padding,
    paddingTop: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
