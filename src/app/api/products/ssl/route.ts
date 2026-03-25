export async function GET() {
  return Response.json(
    {
      items: [
        {
          plan: "Positive SSL",
          price: "$9.99/yıl",
          type: "DV",
          features: ["Tek domain", "$10.000 garanti"],
          note: "15 gün iade garantisi ✓",
          special: "En Uygun",
        },
        {
          plan: "Positive SSL Wildcard",
          price: "$159/yıl",
          type: "DV",
          features: ["Limitsiz subdomain", "$10.000 garanti"],
          note: "İade yok",
        },
        {
          plan: "Instant SSL Pro",
          price: "$139/yıl",
          type: "OV",
          features: ["Tek domain", "$100.000 garanti"],
          note: "Onaylandıktan sonra iade yapılmaz",
        },
        {
          plan: "EV SSL",
          price: "$175/yıl",
          type: "EV",
          features: ["Tek domain"],
          note: "Onaylandıktan sonra iade yapılmaz",
        },
      ],
    },
    { status: 200 }
  );
}

