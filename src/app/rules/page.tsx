import prisma from "@/lib/db/prisma"
import { Model, Rule, SystemFunction } from "@prisma/client";
import { redirect } from 'next/navigation'
import { FaTrash, FaPlus } from 'react-icons/fa';
export default async function RuleComponent() {

    let models = await prisma.model.findMany();
    let systemFunctions = await prisma.systemFunction.findMany();
    let roles = await prisma.role.findMany();

    async function select(formData: FormData) {
        'use server'
        let modelId = formData.get("selectedModel");
        let systemFunctionId = formData.get("selectedSystemFunction");
        let role = formData.get("selectedRole");
        redirect("/rules/" + modelId + "/" + systemFunctionId + "/" + role);
    }

    let rules = await prisma.rule.findMany();
    return (
        <div className="container mx-auto">
            <main className="grid grid-cols-1">

                <div className="grid grid-cols-3 p-1">
                    <div>Model</div>
                    <div>System Function</div>
                    <div>Role</div>
                </div>


                <form action={select}>
                    <div className="grid grid-cols-3 p-1">
                        <select name="selectedModel">
                            {models.map((m: Model) => {
                                return (
                                    <option key={m.id} value={m.id}>
                                        {m.name}
                                    </option>)
                            })}
                        </select>
                        <select name="selectedSystemFunction">
                            {systemFunctions.map((m: Model) => {
                                return (
                                    <option key={m.id} value={m.id}>
                                        {m.name}
                                    </option>)
                            })}
                        </select>
                        <select name="selectedRole">
                            {roles.map((m: Model) => {
                                return (
                                    <option key={m.id} value={m.id}>
                                        {m.name}
                                    </option>)
                            })}
                        </select>
                    </div>
                    <div className="grid grid-cols-3 p-1">
                        <button type="submit">Fetch</button>
                    </div>
                </form>

            </main>


        </div>
    );
};