export const formatDate = (
  timestamp: number,
  addLeadingZero: boolean = true,
  monthFormat: 'numeric' | 'short' = 'numeric'
) => {
  const date = new Date(timestamp * 1000);
  const day = addLeadingZero ? String(date.getDate()).padStart(2, '0') : String(date.getDate());

  const monthNamesShort = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const month =
    monthFormat === 'numeric' ? String(date.getMonth() + 1).padStart(2, '0') : monthNamesShort[date.getMonth()];

  const year = date.getFullYear();
  return monthFormat === 'numeric' ? `${day}.${month}.${year}` : `${day} ${month} ${year}`;
};
