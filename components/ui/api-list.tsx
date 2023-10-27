"use client"

import { useOrigin } from "@/hooks/use-origin";
import { useParams, useRouter } from "next/navigation"
import { ApiAlert } from "@/components/ui/api-alert";

interface ApiListProps{
    entityName: string,
    entityIdName: string
}

export const ApiList: React.FC<ApiListProps> = ({
    entityIdName,
    entityName
}) => {

    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const baseurl = `${origin}/api/${params.storeId}`;

    return(
        <>
            <ApiAlert
            title="GET"
            variant="public"
            description={`${baseurl}/${entityName}`}
            />   
            <ApiAlert
            title="GET"
            variant="public"
            description={`${baseurl}/${entityName}/{${entityIdName}}`}
            />   
            <ApiAlert
            title="POST"
            variant="admin"
            description={`${baseurl}/${entityName}`}
            />   
            <ApiAlert
            title="PATCH"
            variant="admin"
            description={`${baseurl}/${entityName}/{${entityIdName}}`}
            />   
            <ApiAlert
            title="DELETE"
            variant="admin"
            description={`${baseurl}/${entityName}/{${entityIdName}}`}
            />   
        </>
    )    
}