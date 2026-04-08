import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { getReviews } from '../services/api';

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      console.log('Error fetching reviews:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchReviews();
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.reviewerName}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.ratingContainer}>
        {Array.from({ length: item.rating }).map((_, i) => (
          <Text key={i} style={styles.star}>⭐</Text>
        ))}
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
        renderItem={renderReviewItem}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No reviews found.</Text>
          </View>
        }
      />
    </View>
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
  listContainer: {
    padding: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    ...SHADOWS.light,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  reviewerName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  date: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.base,
  },
  star: {
    fontSize: SIZES.small,
  },
  comment: {
    fontSize: SIZES.font,
    color: COLORS.text,
    lineHeight: 22,
  },
  emptyContainer: {
    padding: SIZES.padding,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: SIZES.medium,
  },
});
