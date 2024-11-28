import prisma from "@/lib/db/prisma"
import { DataElement, DataOperation, MaturityLevel, Model, Rule, SystemFunction } from "@prisma/client";
import { FaTrash, FaPlus, FaPen, FaFileImport } from 'react-icons/fa';
import { revalidatePath } from 'next/cache'
import RuleEditPanelComponent from "./edit_panel";
import { DataType } from "./types";

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
    const rules = await prisma.rule.findMany({
        where: {
            systemFunctionId,
            roleId,
        }
    });

    if (!model || !systemFunction) 
        return;
    
    const data: DataType = {
        model,
        systemFunction,
        dataElements,
        dataOperations,
        maturityLevels,
        rules,
    }

    return (
        <RuleEditPanelComponent data={data}></RuleEditPanelComponent>
    );
};