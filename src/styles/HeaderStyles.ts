import { StyleSheet } from 'react-native';

export const HeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: '#44aa00ff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#800000ff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    color: 'white',
    marginRight: 10,
  },
  link: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 20
  },
});
