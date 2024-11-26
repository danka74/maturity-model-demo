import prisma from "@/lib/db/prisma"
import { Model } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { FaTrash, FaPlus, FaPen, FaPencilRuler } from 'react-icons/fa';
export default async function ModelComponent() {

    async function create(formData: FormData) {
        'use server'
        let name: string | undefined = formData.get("name")?.toString();
        if (name == undefined || name == "")
            return;
        let description: string | undefined = formData.get('description')?.toString();
        await prisma.model.create({
            data: { name, description },
        });
        revalidatePath('/models');
    };

    async function _delete(formData: FormData) {
        'use server'
        let id1 = formData.get("_id");
        let id2 = id1 ? parseInt(id1.toString()) : null;
        if (!id2)
            return;

        await prisma.model.delete({
            where: {
                id: id2,
            },
        });
        revalidatePath('/models');
    };

    let systemFunctions = await prisma.model.findMany();
    return (
        <>
            <div className="container mx-auto">
                <main className="grid grid-cols-1">
                    <div className="bg-indigo-500 text-white font-bold p-1"><h1>Models</h1></div>
                    <div className="grid grid-cols-3 font-bold p-1">
                        <div>Name</div>
                        <div>Description</div>
                        <div></div>
                    </div>
                    {systemFunctions.map((md: Model) => (
                        <div key={md.id} className="grid grid-cols-3 p-1">
                            <div>{md.name}</div>
                            <div>{md.description}</div>
                            <div className="flex flex-rows gap-1">
                                <form action={"/models/" + md.id}>
                                    <button type="submit" className="">
                                        <FaPen/>
                                    </button>
                                </form>
                                <form action={_delete}>
                                    <input name="_id" className="hidden" defaultValue={md.id} />
                                    <button type="submit" className="">
                                        <FaTrash />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </main>

                <form action={create}>
                    <div className="grid grid-cols-3 p-1">
                        <div>
                            <input type="text" id="name" name="name" placeholder="Name" />
                        </div>
                        <div>
                            <input id="description" name="description" placeholder="Description" />
                        </div>
                        <button type="submit" className=""><FaPlus /></button>
                    </div>
                </form>
            </div>
        </>
    );
};