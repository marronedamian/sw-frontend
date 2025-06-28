export const fetchComparisonData = async (category: string, ids: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/star-wars/${category}/compare?ids=${ids}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Error al obtener la comparación");
  }

  return res.json();
};
