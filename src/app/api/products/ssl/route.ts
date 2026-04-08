export async function GET() {
  return Response.json(
    {
      items: [
        {
          plan: "Positive SSL",
          price: "$349/year",
          type: "DV",
          features: ["Tek alan adı", "$350,000 garanti"],
          note: "15 gün iade garantisi ✓",
          special: "En Uygun",
        },
        {
          plan: "Positive SSL Wildcard",
          price: "$5,499/year",
          type: "DV",
          features: ["Sınırsız alt alan adı", "$350,000 garanti"],
          note: "İade yok",
        },
        {
          plan: "Instant SSL Pro",
          price: "$4,799/year",
          type: "OV",
          features: ["Tek alan adı", "$3,500,000 garanti"],
          note: "Onaylandıktan sonra iade yapılmaz",
        },
        {
          plan: "EV SSL",
          price: "$5,999/year",
          type: "EV",
          features: ["Tek domain"],
          note: "Onaylandıktan sonra iade yapılmaz",
        },
      ],
    },
    { status: 200 }
  );
}

