'use client'
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function Page() {
    const [isClient, setIsClient] = useState<boolean>(false);
    const route = useRouter();
    const nameRef = useRef<HTMLIonInputElement>(null);
    const buyPriceRef = useRef<HTMLIonInputElement>(null);
    const sellPriceRef = useRef<HTMLIonInputElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("name", nameRef.current!.value?.toString() || "");
        formData.append("buyPrice", buyPriceRef.current!.value?.toString() || "");
        formData.append("sellPrice", sellPriceRef.current!.value?.toString() || "");
        await axios.post("/product/api", formData).then(res => {
            console.log("Added", res.data);
            if (res.data.status != "error") {
                route.push("/product");
            } else {
                alert(res.data.error)
            }
        })
    }

    return (
        isClient &&
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Add Product</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => route.back()}>Back</IonButton>
                            <IonButton onClick={handleSave}>Save</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem>
                        <IonInput
                            type="text"
                            label="Name"
                            labelPlacement="stacked"
                            placeholder="Name"
                            ref={nameRef} />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            type="number"
                            label="Buy Price"
                            labelPlacement="stacked"
                            placeholder="Buy Price"
                            ref={buyPriceRef} />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            type="number"
                            label="Sell Price"
                            labelPlacement="stacked"
                            placeholder="Sell Price"
                            ref={sellPriceRef} />
                    </IonItem>
                </IonContent>
            </IonPage>
        </>
    );

}