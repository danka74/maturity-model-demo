import prisma from "@/lib/db/prisma"
import { DataElement, MaturityLevel, Model } from "@prisma/client";
import { FaTrash, FaPlus, FaPen, FaFileImport } from 'react-icons/fa';
import { revalidatePath } from 'next/cache'

export default async function ModelInstanceComponent({
    params,
}: {
    params: Promise<{
        modelId: string,
        systemFunctionId: string,
        roleId: string,
    }>
}) {
    const modelId: number = parseInt((await params).modelId);
    const systemFunctionId: number = parseInt((await params).systemFunctionId);
    const roleId: number = parseInt((await params).roleId);
    const model = await prisma.model.findUnique({
        where: {
            id: modelId,
        },
    });
    const systemFunction = await prisma.systemFunction.findUnique({
        where: {
            id: systemFunctionId,
        },
    });
    const role = await prisma.role.findUnique({
        where: {
            id: roleId,
        },
    });
    const dataElements = await prisma.dataElement.findMany({
        where: {
            modelId,
        }
    })
    const dataOperations = await prisma.dataOperation.findMany();
    const maturityLevels = await prisma.maturityLevel.findMany();

    return (
        <div className="container mx-auto">
            <main className="grid grid-cols-1">
                <div className="bg-indigo-500 text-white font-bold p-1"><h1>Conformity Rules</h1></div>
                <div className="grid grid-flow-col font-bold p-1">
                    <div>Data Element</div>
                    <div>Data Operation</div>
                    {maturityLevels.map((ml: MaturityLevel) => {
                        return (
                            <div>{ml.name}</div>
                        )
                    })}
                </div>

                {dataElements.map((de: DataElement) => {
                    return (
                        <div className="grid grid-cols-4 p-1">
                            <div>{de.name}</div>
                        </div>
                    )
                })}
            </main>
        </div>
    );
};