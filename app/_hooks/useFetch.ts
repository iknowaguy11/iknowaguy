import { useEffect, useState } from "react";
import { IProvince, IServices } from "../Interfaces/appInterfaces";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../DB/firebaseConnection";

export const useFetchProvinces=()=>{

    const [ProvinceData,SetProvinceData]=useState<IProvince[]>([]);
    const [DataError,SetDataError]=useState<unknown>(null);
    const [isLoading,SetisLoading]=useState<boolean>(false);
    try {
        useEffect(()=>{
            const colRef = collection(db, "Provinces");
            var tempData: IProvince[] = [];
            SetisLoading(true);
            const unsubscribe= onSnapshot(colRef, (snapshot) => {
                tempData = [];
                snapshot?.docs.forEach((doc) => {
                    tempData.push(
                      {
                        Id:doc.id,province: doc.data()?.ProvinceName,Towns:doc.data()?.Towns
                      }
                    );
                    SetProvinceData(tempData); 
                    SetisLoading(false);
                });
            })
            return () => unsubscribe();
        },[]);

    } catch (error) {
        SetisLoading(false);
        SetDataError(error);
    }
    finally{
        return {ProvinceData,DataError,isLoading};
    } 
}

export const useFetchServices=()=>{

    const [ServiceData,SetServiceData]=useState<IServices[]>([]);
    const [serviceError,SetserviceError]=useState<unknown>(null);
    const [isLoadingservies,SetisLoadingservies]=useState<boolean>(false);
    try {
        useEffect(()=>{
            const colRef = collection(db, "Services");
            var tempData: IServices[] = [];
            SetisLoadingservies(true);
            const unsubscribe= onSnapshot(colRef, (snapshot) => {
                tempData = [];
                snapshot?.docs.forEach((doc) => {
                    tempData.push(
                      {
                        Id:doc.id,ServiceType: doc.data()?.ServiceType,actualTask:doc.data()?.actualTask
                      }
                    );
                    SetServiceData(tempData); 
                    SetisLoadingservies(false);
                });
            })
            return () => unsubscribe();
        },[]);

    } catch (error) {
        SetisLoadingservies(false);
        SetserviceError(error);
    }
    finally{
        return {ServiceData,serviceError,isLoadingservies};
    } 
}