import serviceDetails from "@/public/data/pageInfo";
import Image from "next/image";

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = serviceDetails.find(item => item.slug === slug);

  if (!service) {
    return <h1>Service not found</h1>;
  }
  console.log("services images", service.image)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{service.heading}</h1>
      <Image
        src={service.image}
        alt={service.heading}
        width={600}
        height={400}
        className="rounded-lg"
      />
      <p className="mt-6 text-lg leading-relaxed">{service.details}</p>
    </div>
  );
}
