import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IOtherOffers, IProjects, IProvince, IServices, IUser } from "../Interfaces/appInterfaces";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../DB/firebaseConnection";

export const useFetchProvinces = () => {

    const [ProvinceData, SetProvinceData] = useState<IProvince[]>([]);
    const [DataError, SetDataError] = useState<unknown>(null);
    const [isLoading, SetisLoading] = useState<boolean>(false);
    try {
        useEffect(() => {
            const colRef = collection(db, "Provinces");
            var tempData: IProvince[] = [];
            SetisLoading(true);
            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                tempData = [];
                snapshot?.docs.forEach((doc) => {
                    tempData.push(
                        {
                            Id: doc.id, province: doc.data()?.ProvinceName, Towns: doc.data()?.Towns
                        }
                    );
                    SetProvinceData(tempData);
                    SetisLoading(false);
                });
            })
            return () => unsubscribe();
        }, []);

    } catch (error) {
        SetisLoading(false);
        SetDataError(error);
    }
    finally {
        return { ProvinceData, DataError, isLoading };
    }
}

export const useFetchServices = () => {

    const [ServiceData, SetServiceData] = useState<IServices[]>([]);
    const [serviceError, SetserviceError] = useState<unknown>(null);
    const [isLoadingservies, SetisLoadingservies] = useState<boolean>(false);
    try {
        useEffect(() => {
            const colRef = collection(db, "Services");
            var tempData: IServices[] = [];
            SetisLoadingservies(true);
            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                tempData = [];
                snapshot?.docs.forEach((doc) => {
                    tempData.push(
                        {
                            Id: doc.id, ServiceType: doc.data()?.ServiceType, actualTask: doc.data()?.actualTask
                        }
                    );
                    SetServiceData(tempData);
                    SetisLoadingservies(false);
                });
            })
            return () => unsubscribe();
        }, []);

    } catch (error) {
        SetisLoadingservies(false);
        SetserviceError(error);
    }
    finally {
        return { ServiceData, serviceError, isLoadingservies };
    }
}

export const useFetchUserAccount = (ukey: string | null) => {

    const [UserData, SetUserData] = useState<IUser[]>([]);
    const [accountError, SetaccountError] = useState<unknown>(null);
    const [isGettingAccount, SetisGettingAccount] = useState<boolean>(false);
    try {
        useEffect(() => {
            getUserData(ukey, SetUserData, SetaccountError, SetisGettingAccount);
        }, [ukey]);

    } catch (error) {
        SetisGettingAccount(false);
        SetaccountError(error);
    }
    finally {
        return { UserData, accountError, isGettingAccount };
    }
}

const getUserData = async (ukey: string | null, SetUserData: Dispatch<SetStateAction<IUser[]>>, SetaccountError: Dispatch<SetStateAction<unknown>>, SetisGettingAccount: Dispatch<SetStateAction<boolean>>) => {
    if (await ukey !== null) {
        const colRef = collection(db, "Users");
        var tempData: IUser[] = [];
        SetisGettingAccount(true);
        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            tempData = [];
            snapshot?.docs?.forEach(async (doc) => {
                if (doc?.id?.trim() === await ukey?.trim()) {
                    tempData.push(
                        {
                            Id: doc.id,
                            companyName: doc.data()?.companyName,
                            companyEmail: doc.data()?.companyEmail,
                            phone: doc.data()?.phone,
                            LastName: doc.data()?.LastName,
                            firstName: doc.data()?.firstName,
                            Address: doc.data()?.Address,
                            profileImage: doc.data()?.profileImage,
                            certificate: doc.data()?.certificate,
                            imgfilename: doc.data()?.imgfilename,
                            pdffilename: doc.data()?.pdffilename,
                            isactive: doc.data()?.isactive,
                            membership: doc.data()?.membership,
                            Services: doc.data()?.Services,
                            tncs: doc.data()?.tncs
                        }
                    );
                }
                SetUserData(tempData);
                SetisGettingAccount(false);
            });
        })
        return () => unsubscribe();
    }
}

export const useFetchUserProjects = (ukey: string | null) => {

    const [UserProjects, SetUserProjects] = useState<IProjects[]>([]);
    const [ProjectsError, SetProjectsError] = useState<unknown>(null);
    const [isGettingProjects, SetisGettingProjects] = useState<boolean>(false);
    try {
        useEffect(() => {
            getUserProject(ukey, SetUserProjects, SetProjectsError, SetisGettingProjects);
        }, [ukey]);

    } catch (error) {
        SetisGettingProjects(false);
        SetProjectsError(error);
    }
    finally {
        return { UserProjects, ProjectsError, isGettingProjects };
    }
}

const getUserProject = async (ukey: string | null, SetUserProjects: Dispatch<SetStateAction<IProjects[]>>, SetProjectsError: Dispatch<SetStateAction<unknown>>, SetisGettingProjects: Dispatch<SetStateAction<boolean>>) => {
    if (await ukey !== null) {
        const colRef = collection(db, "Projects");
        var tempData: IProjects[] = [];
        SetisGettingProjects(true);
        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            tempData = [];
            snapshot?.docs?.forEach(async (doc) => {
                if (doc.data()?.ownerId.trim() === await ukey?.trim()) {
                    tempData.push(
                        {
                            ProjectId: doc.id,
                            ownerId: doc.data()?.ownerId,
                            owner: doc.data()?.owner,
                            Profpic: doc.data()?.Profpic,
                            task: doc.data()?.task,
                            email: doc.data()?.email,
                            phone: doc.data()?.phone,
                            addrs: doc.data()?.addrs,
                            postTime: doc.data()?.postTime,
                            description: doc.data()?.description,
                            budget: doc.data()?.budget,
                            otherOffers: doc.data()?.otherOffers,
                            bestOffer: doc.data()?.bestOffer,
                            Status: doc.data()?.Status,
                            winnerId: doc.data()?.winnerId,
                            bstOffrId: doc.data()?.bstOffrId,
                            tncs: doc.data()?.tncs,
                        }
                    );
                } else if (ukey == "") {
                    tempData.push(
                        {
                            ProjectId: doc.id,
                            ownerId: doc.data()?.ownerId,
                            owner: doc.data()?.owner,
                            Profpic: doc.data()?.Profpic,
                            task: doc.data()?.task,
                            email: doc.data()?.email,
                            phone: doc.data()?.phone,
                            addrs: doc.data()?.addrs,
                            postTime: doc.data()?.postTime,
                            description: doc.data()?.description,
                            budget: doc.data()?.budget,
                            otherOffers: doc.data()?.otherOffers,
                            bestOffer: doc.data()?.bestOffer,
                            Status: doc.data()?.Status,
                            winnerId: doc.data()?.winnerId,
                            bstOffrId: doc.data()?.bstOffrId,
                            tncs: doc.data()?.tncs,
                        }
                    );
                }
                SetUserProjects(tempData);
                SetisGettingProjects(false);
            });
        })
        return () => unsubscribe();
    }
}

export const useFetchgetContractorProjects = (userKey: string) => {
    const [ContractorProjects, SetContractorProjects] = useState<IProjects[]>([]);
    const [ProjectsError, SetProjectsError] = useState<unknown>(null);
    const [isGettingProjects, SetisGettingProjects] = useState<boolean>(false);
    try {
        useEffect(() => {
            const colRef = collection(db, "Projects");
            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                SetContractorProjects([]);
                snapshot.forEach((doc) => {
                    if (doc.data()?.otherOffers?.length > 0) {
                        doc.data().otherOffers?.forEach((item: any) => {
                            if (item.CompanyKey == userKey) {
                                SetContractorProjects([...ContractorProjects, {
                                    ProjectId: doc.id,
                                    ownerId: doc.data()?.ownerId,
                                    owner: doc.data()?.owner,
                                    Profpic: doc.data()?.Profpic,
                                    task: doc.data()?.task,
                                    email: doc.data()?.email,
                                    phone: doc.data()?.phone,
                                    addrs: doc.data()?.addrs,
                                    postTime: doc.data()?.postTime,
                                    description: doc.data()?.description,
                                    budget: doc.data()?.budget,
                                    otherOffers: doc.data()?.otherOffers,
                                    bestOffer: doc.data()?.bestOffer,
                                    Status: doc.data()?.Status,
                                    winnerId: doc.data()?.winnerId,
                                    bstOffrId: doc.data()?.bstOffrId,
                                    tncs: doc.data()?.tncs,
                                }]);
                            }
                        });
                    }
                });
            });
            return () => unsubscribe();
        }, [userKey]);

    } catch (error: any) {
        SetProjectsError(error.message);
    } finally {
        return { ContractorProjects, ProjectsError, isGettingProjects };
    }
}
