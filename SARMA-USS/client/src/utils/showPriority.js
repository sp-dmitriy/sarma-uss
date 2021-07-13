const valueMap = {
    1 : 'По возможности',
    2 : 'В течение месяца',
    3 : 'В течение недели',
    4 : 'В течение дня',
    5 : 'Немедленно'
  }
  
  export function showPriority(value) {
      return valueMap[value]
  }
  
