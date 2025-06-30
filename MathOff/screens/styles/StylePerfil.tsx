import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 20 },
  subtitle: { fontSize: 20, fontWeight: '600', marginBottom: 10 },

  scrollArea: { width: '100%', maxHeight: 300 },
  cardsContainer: { paddingBottom: 20 },
  noScore: { fontSize: 16, textAlign: 'center', marginTop: 10 },

  footer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 4,
  },
  statsText: {
    fontSize: 13,
    color: '#555',
  },

  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  cardText: { fontSize: 16 },

  // Card animado de estatísticas
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b5998',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  statsItem: {
    alignItems: 'center',
    flex: 1,
  },
  statsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  statsLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  statsMotivation: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
  },

  clearButton: {
    marginTop: 10,
    backgroundColor: "#E1D045",
    shadowColor: '#000',
    borderWidth: 2,
    borderColor: 'yellow', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  clearText: { color: '#333', fontWeight: 'bold' },

  logoutButton: {
    marginTop: 20,
    backgroundColor: "#E16E46",
    shadowOpacity: 0.1,
    borderWidth: 2,
    borderColor: 'red', 
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
export default styles;