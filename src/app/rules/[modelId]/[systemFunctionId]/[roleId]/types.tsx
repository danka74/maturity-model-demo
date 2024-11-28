import { DataElement, DataOperation, MaturityLevel, Model, Rule, SystemFunction } from "@prisma/client";

export type DataType = {
    model: Model,
    systemFunction: SystemFunction,
    dataElements: DataElement[],
    dataOperations: DataOperation[],
    maturityLevels: MaturityLevel[],
    rules: Rule[],
}

enum OpType  {
    addDataOperation,
    addRule,
} 

export type StateOperation = {
    opType: OpType;
}