
"use client";

import Link from "next/link";
import serviceDetails from "@/public/data/pageInfo";

export default function ServicesPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>
      <ul className="space-y-4">
        {serviceDetails.map(service => (
          <li key={service.id}>
            <Link
              href={`/services/${service.slug}`}
              className="text-blue-600 hover:underline"
            >
              {service.heading}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
