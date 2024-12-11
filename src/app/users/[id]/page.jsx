"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function Page() {
  const params = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`/api/users/${params.id}`).then((res) =>
      res.json().then((data) => {
        setData(data.data);
      })
    );
  }, [params?.id]);
  console.log(data);
  return (
    <div>
      <p>Firstname : {data?.firstname}</p>
      <p>Lastname : {data?.lastname}</p>
      <p>Email: {data?.email}</p>
    </div>
  );
}
