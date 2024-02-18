'use client'
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function Page() {
    const [product, setProduct] = useState<any>(null);
    const [isClient, setIsClient] = useState<boolean>(false);
    const { id } = useParams();
    const route = useRouter();
    const nameRef = useRef<HTMLIonInputElement>(null);
    const buyPriceRef = useRef<HTMLIonInputElement>(null);
    const sellPriceRef = useRef<HTMLIonInputElement>(null);

    const getProduct = async () => {
        await axios.get(`/product/api/${id}`).then((res) => {
            console.log("Product Data", res.data[0]);
            setProduct(res.data[0]);
        });
    }

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("id", id.toString());
        formData.append("name", nameRef.current!.value?.toString() || "");
        formData.append("buyPrice", buyPriceRef.current!.value?.toString() || "");
        formData.append("sellPrice", sellPriceRef.current!.value?.toString() || "");
        await axios.patch("/product/api", formData).then(res => {
            console.log("Update", res.data);
            if (res.data.status != "error") {
                route.push("/product");
            } else {
                alert(res.data.error)
            }
        })
    }
    useEffect(() => {
        setIsClient(true);
        getProduct();
    }, []);

    return (
        isClient &&
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit Product</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => route.back()}>Back</IonButton>
                        <IonButton onClick={handleSave}>Save</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonInput
                        value={product?.Name}
                        type="text"
                        label="Name"
                        labelPlacement="stacked"
                        placeholder="Name"
                        ref={nameRef} />
                </IonItem>
                <IonItem>
                    <IonInput
                        value={product?.BuyPrice}
                        type="number"
                        label="Buy Price"
                        labelPlacement="stacked"
                        placeholder="Buy Price"
                        ref={buyPriceRef} />
                </IonItem>
                <IonItem>
                    <IonInput
                        value={product?.SellPrice}
                        type="number"
                        label="Sell Price"
                        labelPlacement="stacked"
                        placeholder="Sell Price"
                        ref={sellPriceRef} />
                </IonItem>
            </IonContent>
        </IonPage>
    );

}