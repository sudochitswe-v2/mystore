'use client'
import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const route = useRouter();
    const { id } = useParams();
    const [isClient, setIsClient] = useState<boolean>(false);
    const [product, setProduct] = useState<any>(null);
    useEffect(() => {
        setIsClient(true);
        getProduct();
    }, []);
    const getProduct = async () => {
        await axios.get(`/product/api/${id}`).then((res) => {
            console.log("Product Data", res.data);
            setProduct(res.data[0]);
        });
    }
    const goBack = () => {
        route.back();
    }
    return (
        isClient &&
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Product View</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={goBack}>Back</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonItem lines="none">
                <h2>{product?.Name}</h2>
            </IonItem>
            <IonContent className="ion-padding">
                <IonCard>
                    <IonCardContent>
                        <p>Buy Price : {product?.BuyPrice}</p>
                        <p>Sell Price :{product?.SellPrice}</p>
                    </IonCardContent>
                </IonCard>
            </IonContent>

        </IonPage>
    );
}