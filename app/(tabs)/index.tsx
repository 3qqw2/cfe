import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CreditCard, User, FileText, Settings, LogOut } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const { user, signOut, isLoggedIn } = useAuth();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const handleLogout = async () => {
    await signOut();
    router.replace('/auth');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <CreditCard size={60} color="#3B82F6" />
          <Text style={styles.title}>Pakistani Loan App</Text>
          <Text style={styles.subtitle}>
            {isLoggedIn() ? `Welcome, ${user?.displayName || 'User'}!` : 'Quick and Easy Loans'}
          </Text>
          {isLoggedIn() && (
            <Text style={styles.phoneText}>📱 {user?.phoneNumber}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          {!isLoggedIn() ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/auth')}>
              <User size={24} color="#FFFFFF" />
              <Text style={styles.buttonText}>Login / Register</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}>
              <LogOut size={24} color="#FFFFFF" />
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(tabs)/application')}>
            <FileText size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>
              {isLoggedIn() ? 'Apply for Loan' : 'View Loan Info'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/admin')}>
            <Settings size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Admin Panel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Features:</Text>
          <Text style={styles.featureText}>• Quick approval in minutes</Text>
          <Text style={styles.featureText}>• Competitive rates</Text>
          <Text style={styles.featureText}>• Secure & encrypted</Text>
          <Text style={styles.featureText}>• Pakistani phone verification</Text>
          {isLoggedIn() && (
            <Text style={styles.featureText}>✅ You are logged in!</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  features: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  phoneText: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 5,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
  },
});