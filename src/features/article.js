import { useParams } from "react-router-dom";

export default function Article() {
  let params = useParams();
  let slug = params.slug;
  return (
    <>
      <h2>Single Article Page</h2>
      <h3>{slug}</h3>
    </>
  )
}