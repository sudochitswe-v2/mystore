'use client';
import axios from "axios";
import React, { useEffect, useState } from "react";

import { IonPage, IonContent, IonItem, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { useRouter } from "next/navigation";

export default function ProductPage() {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [products, setProducts] = useState<any>([]);
    const route = useRouter();

    useEffect(() => {
        setIsClient(true);
        getProducts();
    }, []);
    const getProducts = () => {
        axios.get("product/api").then((res) => {
            console.log("Product Data", res.data);
            setProducts(res.data)
        });
    }
    const handleDelete = (id: number) => {
        axios.delete(`product/api/${id}`).then((res) => {
            console.log("Delete product", res.data);
            getProducts();
        })
    }
    const handleEdit = (id: number) => {
        route.push(`/product/edit/${id}`)
    }
    const handleView = (id: number) => {
        route.push(`/product/view/${id}`)
    }
    const handleNew = () => {
        route.push(`product/add`);
    }

    return (
        isClient &&
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Products</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleNew}>New</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {
                    products.map((item: any, index: number) =>
                        <IonItem key={index}>
                            {item?.Name}
                            <IonButtons slot="end">
                                <IonButton onClick={() => handleView(item.Id)}>View</IonButton>
                                <IonButton onClick={() => handleEdit(item.Id)}>Edit</IonButton>
                                <IonButton onClick={() => handleDelete(item.Id)}>Delete</IonButton>
                            </IonButtons>
                        </IonItem>
                    )
                }
            </IonContent>
        </IonPage>
    );

}