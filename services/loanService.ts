// Mock loan service with optimized image handling
// Replace with actual Firebase Firestore implementation

import AsyncStorage from '@react-native-async-storage/async-storage';

interface ApplicationData {
  fullName: string;
  nationalId: string;
  address: string;
  employmentType: string;
  monthlyIncome: string;
  cnicImage: string | null;
  selfieImage: string | null;
}

interface LoanApplication {
  id: string;
  userId: string;
  fullName: string;
  nationalId: string;
  address: string;
  employmentType: string;
  monthlyIncome: number;
  status: 'under_review' | 'approved' | 'rejected';
  submittedAt: Date;
  cnicImageUrl?: string;
  selfieImageUrl?: string;
  loanAmount?: number;
  interestRate?: number;
  repaymentDate?: Date;
}

// Helper function to create a placeholder image URL instead of storing large base64 data
const createImagePlaceholder = (type: 'cnic' | 'selfie'): string => {
  if (type === 'cnic') {
    return 'https://images.pexels.com/photos/7876538/pexels-photo-7876538.jpeg?auto=compress&cs=tinysrgb&w=400';
  } else {
    return 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400';
  }
};

export const submitLoanApplication = async (
  userId: string,
  applicationData: ApplicationData
): Promise<void> => {
  // Check if user already has a pending application
  const existingApp = await getUserApplication(userId);
  if (existingApp && existingApp.status === 'under_review') {
    throw new Error('You already have a pending application. Please wait for review.');
  }

  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    const newApplication: LoanApplication = {
      id: 'app_' + Date.now(),
      userId,
      fullName: applicationData.fullName,
      nationalId: applicationData.nationalId,
      address: applicationData.address,
      employmentType: applicationData.employmentType,
      monthlyIncome: parseInt(applicationData.monthlyIncome),
      status: 'under_review',
      submittedAt: new Date(),
      // Use placeholder URLs instead of storing large image data
      cnicImageUrl: applicationData.cnicImage ? createImagePlaceholder('cnic') : undefined,
      selfieImageUrl: applicationData.selfieImage ? createImagePlaceholder('selfie') : undefined,
    };

    // Auto-approve if income >= 50000
    if (newApplication.monthlyIncome >= 50000) {
      newApplication.status = 'approved';
      newApplication.loanAmount = newApplication.monthlyIncome * 0.8;
      newApplication.interestRate = 12.5;
      newApplication.repaymentDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year from now
    }

    // Store user application
    await AsyncStorage.setItem(`userApplication_${userId}`, JSON.stringify(newApplication));

    // Update all applications list
    const existingApps = await AsyncStorage.getItem('allApplications');
    let allApplications = existingApps ? JSON.parse(existingApps) : [];
    
    // Remove any existing application for this user and add the new one
    allApplications = allApplications.filter((app: LoanApplication) => app.userId !== userId);
    allApplications.push(newApplication);
    
    await AsyncStorage.setItem('allApplications', JSON.stringify(allApplications));
    
    console.log('Loan application submitted successfully:', {
      id: newApplication.id,
      userId,
      status: newApplication.status
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    throw new Error('Failed to submit application. Please try again.');
  }
};

export const getUserApplication = async (userId: string): Promise<LoanApplication | null> => {
  try {
    const stored = await AsyncStorage.getItem(`userApplication_${userId}`);
    if (stored) {
      const app = JSON.parse(stored);
      app.submittedAt = new Date(app.submittedAt);
      if (app.repaymentDate) {
        app.repaymentDate = new Date(app.repaymentDate);
      }
      return app;
    }
    return null;
  } catch (error) {
    console.error('Error getting user application:', error);
    return null;
  }
};

export const getLoanStatus = async (userId: string) => {
  const application = await getUserApplication(userId);
  return application;
};

export const canUserApply = async (userId: string): Promise<boolean> => {
  const existingApp = await getUserApplication(userId);
  
  // User can apply if:
  // 1. No previous application
  // 2. Previous application was rejected (can reapply)
  // 3. Previous application was approved (can apply for new loan after some time)
  
  if (!existingApp) {
    return true; // No previous application
  }
  
  if (existingApp.status === 'under_review') {
    return false; // Must wait for review
  }
  
  if (existingApp.status === 'rejected') {
    return true; // Can reapply after rejection
  }
  
  if (existingApp.status === 'approved') {
    // For demo, let's say they can apply again after approval
    // In real app, you might check if previous loan is paid off
    return true;
  }
  
  return false;
};

export const selectLoanAmount = async (userId: string, amount: number): Promise<void> => {
  try {
    const existingApp = await getUserApplication(userId);
    if (!existingApp || existingApp.status !== 'approved') {
      throw new Error('No approved loan application found');
    }

    // Update the application with selected loan amount
    const updatedApp = {
      ...existingApp,
      loanAmount: amount,
      monthlyPayment: Math.round((amount * 0.125 / 12 * Math.pow(1 + 0.125/12, 12)) / (Math.pow(1 + 0.125/12, 12) - 1)),
      status: 'disbursed' as const,
    };

    // Save updated application
    await AsyncStorage.setItem(`userApplication_${userId}`, JSON.stringify(updatedApp));
    
    // Update in all applications list
    const allApps = await AsyncStorage.getItem('allApplications');
    if (allApps) {
      const applications = JSON.parse(allApps);
      const updatedApplications = applications.map((app: any) => 
        app.userId === userId ? updatedApp : app
      );
      await AsyncStorage.setItem('allApplications', JSON.stringify(updatedApplications));
    }

    console.log('Loan amount selected:', { userId, amount });
  } catch (error) {
    console.error('Error selecting loan amount:', error);
    throw new Error('Failed to confirm loan amount');
  }
};