import {AbstractOperator} from "./AbstractOperator";
import {SaveType} from "../../designer/DesignerType";
import LocalOperator from "./LocalOperator";
import ServerOperator from "./ServerOperator";

const operatorMap: Record<SaveType, AbstractOperator> = {};
operatorMap[SaveType.LOCAL] = new LocalOperator();
operatorMap[SaveType.SERVER] = new ServerOperator();

export default operatorMap;
