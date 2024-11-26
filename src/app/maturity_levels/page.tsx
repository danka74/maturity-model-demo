import prisma from "@/lib/db/prisma"
import { MaturityLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { FaTrash, FaPlus } from 'react-icons/fa';
export default async function SystemFunctionComponent() {

    async function create(formData: FormData) {
        'use server'
        let name: string | undefined = formData.get("name")?.toString();
        if (name == undefined || name == "")
            return;
        let description: string | undefined = formData.get('description')?.toString();
        await prisma.maturityLevel.create({
            data: { name, description },
        });
        revalidatePath('/maturity_levels');
    };

    async function _delete(formData: FormData) {
        'use server'
        let id1 = formData.get("_id");
        let id2 = id1 ? parseInt(id1.toString()) : null;
        if (!id2)
            return;

        await prisma.maturityLevel.delete({
            where: {
                id: id2,
            },
        });
        revalidatePath('/maturity_levels');
    };

    let maturityLevels = await prisma.maturityLevel.findMany();
    return (
        <>
            <div className="container mx-auto">
                <main className="grid grid-cols-1">
                    <div className="bg-indigo-500 text-white font-bold p-1"><h1>Data Operations</h1></div>
                    <div className="grid grid-cols-3 font-bold p-1">
                        <div>Name</div>
                        <div>Description</div>
                        <div></div>
                    </div>
                    {maturityLevels.map((dop: MaturityLevel) => (
                        <div key={dop.id} className="grid grid-cols-3 p-1">
                            <div>{dop.name}</div>
                            <div>{dop.description}</div>
                            <form action={_delete}>
                                <input name="_id" className="hidden" defaultValue={dop.id} />
                                <button type="submit" className="">
                                    <FaTrash/>
                                </button>
                            </form>
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
                        <button type="submit" className=""><FaPlus/></button>
                    </div>
                </form>
            </div>
        </>
    );
};