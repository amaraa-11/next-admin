"use client";
import { useEffect, useState } from "react";

export default function Page(params) {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("/api/users/" + params?.id).then((res) =>
      res
        .json()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        })
    );
  }, []);
  return <h2>Hi,Amaraa</h2>;
}
