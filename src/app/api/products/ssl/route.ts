export async function GET() {
  return Response.json(
    {
      items: [
        {
          plan: "Positive SSL",
          price: "₺349/yıl",
          type: "DV",
          features: ["Tek domain", "₺350.000 garanti"],
          note: "15 gün iade garantisi ✓",
          special: "En Uygun",
        },
        {
          plan: "Positive SSL Wildcard",
          price: "₺5.499/yıl",
          type: "DV",
          features: ["Limitsiz subdomain", "₺350.000 garanti"],
          note: "İade yok",
        },
        {
          plan: "Instant SSL Pro",
          price: "₺4.799/yıl",
          type: "OV",
          features: ["Tek domain", "₺3.500.000 garanti"],
          note: "Onaylandıktan sonra iade yapılmaz",
        },
        {
          plan: "EV SSL",
          price: "₺5.999/yıl",
          type: "EV",
          features: ["Tek domain"],
          note: "Onaylandıktan sonra iade yapılmaz",
        },
      ],
    },
    { status: 200 }
  );
}

