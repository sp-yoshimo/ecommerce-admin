"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ApiAlert } from "@/components/ui/api-alert"
import { AlertModal } from "@/components/modals/alert-modal"


import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useOrigin } from "@/hooks/use-origin"


import * as z from "zod"
import toast from "react-hot-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"
import axios from "axios"



interface SettingsFormProps {
    initialData: Store
}

const formScheme = z.object({
    name: z.string().min(1)
});

type SettingFormValues = z.infer<typeof formScheme>


export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {

    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingFormValues>({
        resolver: zodResolver(formScheme),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("Store updated");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    const onDelete = async() =>{
        try{
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh();
            toast.success("Store deleted.");
        }catch(error){
            toast.error("Make sure you removed all products and categories first.")
        }finally{
            setLoading(false)
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
            isOpen={open}
            onClose={()=> setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash
                        className="h-4 w-4"
                    />
                </Button>
            </div>
            <Separator />
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" space-y-8 w-full"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Store name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>
                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                    >
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert
            title="NEXT_PUBLIC_API_URL"
            description={`${origin}/api/${params.storeId}`}
            variant="public"
            />
        </>

    )
}