export default function Page({ params }: { params: { id: string } }) {
  const { id } = params; // ✅ Correct — params is synchronous
  return <div>My Post: {id}</div>;
}
