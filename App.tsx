import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// The three tip percentages the user can choose from.
type TipOption = 15 | 18 | 20;

// Maps each tip percentage to the decimal rate used in the math.
// PROTOTYPE 0 INTENTIONAL BUG: the 20% entry below uses 0.02 instead of
// 0.20, so selecting 20% undercalculates the tip on purpose. This is the
// class assignment bug and should stay broken until the fix step.
const TIP_RATES: Record<TipOption, number> = {
  15: 0.15,
  18: 0.18,
  20: 0.02, // should be 0.20 — intentional bug, do not fix yet
};

type Results = {
  bill: number;
  tip: number;
  total: number;
};

export default function App() {
  const [billAmount, setBillAmount] = useState('');
  const [selectedTip, setSelectedTip] = useState<TipOption | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCalculate = () => {
    const billValue = parseFloat(billAmount);

    if (billAmount.trim().length === 0 || isNaN(billValue) || billValue <= 0) {
      setErrorMessage('Please enter a valid bill amount.');
      setResults(null);
      return;
    }

    if (selectedTip === null) {
      setErrorMessage('Please select a tip percentage.');
      setResults(null);
      return;
    }

    setErrorMessage('');

    const tipRate = TIP_RATES[selectedTip];
    const tipAmount = billValue * tipRate;
    const total = billValue + tipAmount;

    setResults({ bill: billValue, tip: tipAmount, total });
  };

  const handleReset = () => {
    setBillAmount('');
    setSelectedTip(null);
    setResults(null);
    setErrorMessage('');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>TipTap</Text>
      <Text style={styles.subtitle}>Quick Tip Calculator</Text>

      <Text style={styles.label}>Bill Amount</Text>
      <View style={styles.billInputRow}>
        <Text style={styles.dollarSign}>$</Text>
        <TextInput
          style={styles.billInput}
          placeholder="0.00"
          keyboardType="decimal-pad"
          value={billAmount}
          onChangeText={setBillAmount}
        />
      </View>

      <Text style={styles.label}>Tip Percentage</Text>
      <View style={styles.tipRow}>
        {([15, 18, 20] as TipOption[]).map((option) => {
          const isSelected = selectedTip === option;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.tipButton, isSelected && styles.tipButtonSelected]}
              onPress={() => setSelectedTip(option)}
            >
              <Text
                style={[
                  styles.tipButtonText,
                  isSelected && styles.tipButtonTextSelected,
                ]}
              >
                {option}%
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {errorMessage.length > 0 && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
        <Text style={styles.calculateButtonText}>Calculate Tip</Text>
      </TouchableOpacity>

      {results && (
        <View style={styles.resultsBox}>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Bill Amount</Text>
            <Text style={styles.resultValue}>${results.bill.toFixed(2)}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Tip Amount</Text>
            <Text style={styles.resultValue}>${results.tip.toFixed(2)}</Text>
          </View>
          <View style={[styles.resultRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${results.total.toFixed(2)}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  billInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  dollarSign: {
    fontSize: 18,
    color: '#333',
    marginRight: 6,
  },
  billInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 18,
  },
  tipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  tipButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E7D32',
    alignItems: 'center',
  },
  tipButtonSelected: {
    backgroundColor: '#2E7D32',
  },
  tipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
  tipButtonTextSelected: {
    color: '#fff',
  },
  errorText: {
    color: '#C62828',
    marginBottom: 12,
    textAlign: 'center',
  },
  calculateButton: {
    width: '100%',
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsBox: {
    width: '100%',
    backgroundColor: '#F1F8F2',
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 15,
    color: '#333',
  },
  resultValue: {
    fontSize: 15,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#cde0cf',
    marginTop: 4,
    paddingTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  totalValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  resetButton: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  resetButtonText: {
    color: '#888',
    fontSize: 15,
    fontWeight: '600',
  },
});
