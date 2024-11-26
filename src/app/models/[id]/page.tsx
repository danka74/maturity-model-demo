import prisma from "@/lib/db/prisma"
import { DataElement, Model } from "@prisma/client";
import { FaTrash, FaPlus, FaPen, FaFileImport } from 'react-icons/fa';
import { revalidatePath } from 'next/cache'

export default async function ModelInstanceComponent({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const id = (await params).id;
    const modelId = parseInt(id);
    const model = await prisma.model.findUnique({
        where: {
            id: modelId,
        },
    });

    async function create(formData: FormData) {
        'use server'
        let name: string | undefined = formData.get("name")?.toString();
        if (name == undefined || name == "")
            return;
        let card: string | undefined = formData.get("card")?.toString();
        if (card == undefined || card == "")
            return;
        let description: string | undefined = formData.get('description')?.toString();
        await prisma.dataElement.create({
            data: { modelId, name, card, description, },
        });
        revalidatePath('/models');
    };

    async function _delete(formData: FormData) {
        'use server'
        let id1 = formData.get("_id");
        let id2 = id1 ? parseInt(id1.toString()) : null;
        if (!id2)
            return;

        await prisma.dataElement.delete({
            where: {
                id: id2,
            },
        });
        revalidatePath('/models');
    };

    async function bulk(formData: FormData) {
        'use server'

        console.log(formData);

        let rows: string[] | undefined = formData.get("text")?.toString().split('\n');
        if (rows) {
            for (const row of rows) {
                console.log(row);
                let parts = row.split('\t', 3);
                if (parts.length == 3) {
                    let name = parts[0];
                    let card = parts[1];
                    let description = parts[2];
                    await prisma.dataElement.create({
                        data: { modelId, name, card, description, },
                    });
                }
            }
        }
        revalidatePath('/models');
    }

    let dataElements = await prisma.dataElement.findMany({
        where: {
            modelId
        },
    });
    return (
        <>
            <div className="container mx-auto">
                <main className="grid grid-cols-1">
                    <div className="bg-indigo-500 text-white font-bold p-1"><h1>Data model: {model?.name} </h1></div>
                    <div className="grid grid-cols-4 font-bold p-1">
                        <div>Name</div>
                        <div>Cardinality</div>
                        <div>Description</div>
                        <div></div>
                    </div>
                    {dataElements.map((de: DataElement) => (
                        <div key={de.id} className="grid grid-cols-4 p-1">
                            <div>{de.name}</div>
                            <div>{de.card}</div>
                            <div>{de.description}</div>
                            <form action={_delete}>
                                <input name="_id" className="hidden" defaultValue={de.id} />
                                <button type="submit" className="">
                                    <FaTrash />
                                </button>
                            </form>
                        </div>
                    ))}
                </main>

                <form action={create}>
                    <div className="grid grid-cols-4 p-1">
                        <input name="modelId" className="hidden" defaultValue={modelId} />

                        <div>
                            <input type="text" id="name" name="name" placeholder="Name" />
                        </div>
                        <div>
                            <input type="text" id="card" name="card" placeholder="Cardinality" />
                        </div>
                        <div>
                            <input id="description" name="description" placeholder="Description" />
                        </div>
                        <button type="submit" className=""><FaPlus /></button>
                    </div>
                </form>

                <form action={bulk}>
                    <div className="flex flex-auto p-1 items-start">
                        <textarea name="text" id="text" placeholder="Enter data elements in rows with Name, Cardinality, and Description separated by TAB..." className="w-full"></textarea>
                        <button type="submit" className=""><FaFileImport /></button>
                    </div>
                </form>
            </div>
        </>
    );
};