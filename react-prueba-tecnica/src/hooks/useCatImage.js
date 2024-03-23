import { useEffect, useState } from "react";
const CAT_PREFIX_IMG_URL = "https://cataas.com";

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();
  //Recuperar imagen cada que hay imagen nueva
  useEffect(() => {
    if (!fact) return;
    const threeFirstWords = fact.split(" ", 3).join(" ");

    fetch(
      `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
        // console.log(url);
      });
  }, [fact]);

  return { imageUrl: `${CAT_PREFIX_IMG_URL}${imageUrl}` };
}
