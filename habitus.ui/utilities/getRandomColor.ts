// TODO Make sure color is suitable for display in graph
export default function getRandomColor() {
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}