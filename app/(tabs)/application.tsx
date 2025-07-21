import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, DollarSign, Briefcase } from 'lucide-react-native';

export default function ApplicationScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    address: '',
    employmentType: '',
    monthlyIncome: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.nationalId || !formData.monthlyIncome) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const income = parseInt(formData.monthlyIncome);
    if (income >= 50000) {
      Alert.alert(
        'Congratulations!',
        'Your loan has been auto-approved due to your high income!',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Application Submitted',
        'Your loan application is now under review.',
        [{ text: 'OK' }]
      );
    }

    // Reset form
    setFormData({
      fullName: '',
      nationalId: '',
      address: '',
      employmentType: '',
      monthlyIncome: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Loan Application</Text>
        
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <User size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              value={formData.fullName}
              onChangeText={(text) => updateFormData('fullName', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>ID</Text>
            <TextInput
              style={styles.input}
              placeholder="CNIC / National ID *"
              value={formData.nationalId}
              onChangeText={(text) => updateFormData('nationalId', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <MapPin size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={formData.address}
              onChangeText={(text) => updateFormData('address', text)}
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <Briefcase size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder="Employment Type"
              value={formData.employmentType}
              onChangeText={(text) => updateFormData('employmentType', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <DollarSign size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder="Monthly Income (PKR) *"
              value={formData.monthlyIncome}
              onChangeText={(text) => updateFormData('monthlyIncome', text)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 Tip: Monthly income ≥ 50,000 PKR gets instant approval!
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Application</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginVertical: 20,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 10,
  },
  inputIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
    width: 20,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});