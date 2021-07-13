const valueMap = {
  1: 'Проблема с ПК',
  2: 'Проблема с 1С',
  3: 'Проблема с принтером',
  4: 'Проблема с телефоном',
  5: 'Оснащение',
  6: 'Другое'
}

export function showType(value) {
    return valueMap[value]
}

