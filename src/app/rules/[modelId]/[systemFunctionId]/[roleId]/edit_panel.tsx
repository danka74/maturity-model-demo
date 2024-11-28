"use client"

import { DataElement, DataOperation, MaturityLevel, Model, Rule, SystemFunction } from '@prisma/client'
import { useState, useEffect } from 'react'
import { DataType, StateOperation } from './types';

export default function RuleEditPanelComponent({
    data,
}: {
    data: DataType,
}) {

    let stateOperations: StateOperation[] = [];
    let operationsInUse: number[] = [];
    for (const rule of data.rules) {
        if (!operationsInUse.includes(rule.dataOperationId)) {
            operationsInUse.push(rule.dataOperationId);
        }
    }

    return (
        <div className="container mx-auto">
            <main className="grid grid-cols-1">
                <div className="bg-indigo-500 text-white font-bold p-1"><h1>Conformity Rules</h1></div>
                <div className="grid grid-flow-col font-bold p-1">
                    <div>Data Element</div>
                    <div>Data Operations</div>
                </div>

                {data.dataElements.map((de: DataElement) => {
                    return (
                        <div className="grid grid-cols-4 p-1">
                            <div key={de.id}>{de.name}</div>
                            {operationsInUse.map((opId) : React.ReactNode => {
                                const dataOperation = data.dataOperations.find((e) => e.id == opId);

                                return (
                                    <div>{dataOperation?.name}</div>
                                );
                            })}
                        </div>
                    )
                })}
            </main>
        </div>
    )
}