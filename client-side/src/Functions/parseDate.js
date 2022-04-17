export default function parseDate(date) {
  const d = new Date(date);
  //   console.log(d.getDate());
  return d.toLocaleDateString("lt-LT");
}
