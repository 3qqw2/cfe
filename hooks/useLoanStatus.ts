import { useState } from 'react';

interface LoanData {
  id?: string;
  status: 'under_review' | 'approved' | 'rejected' | null;
  loanAmount?: number;
  interestRate?: number;
  repaymentDate?: Date;
  fullName?: string;
  monthlyIncome?: number;
  submittedAt?: Date;
}

export function useLoanStatus() {
  const [loanData, setLoanData] = useState<LoanData | null>(null);
  const [loading, setLoading] = useState(false);

  const refetch = () => {
    // Simple mock function
    console.log('Refetching loan status...');
  };

  return { loanData, loading, refetch };
}