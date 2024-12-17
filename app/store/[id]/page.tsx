import ProductDetails from "@/components/ProductDetails";
import React from "react";


export default async function SingleProduct({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id
    return (
        <div>
        <ProductDetails id={id} />
        </div>
    );
    }

