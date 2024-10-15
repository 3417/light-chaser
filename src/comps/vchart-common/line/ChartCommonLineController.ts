import {ComponentBaseProps} from "../../common-component/CommonTypes.ts";
import {UpdateOptions} from "../../../framework/core/AbstractController.ts";
import {ChartsBaseDesignController} from "../ChartsBaseDesignController.ts";
import {ThemeItemType} from "../../../designer/DesignerType.ts";
import VChart from "@visactor/vchart";
import { globalMessage } from "../../../framework/message/GlobalMessage.tsx";

export default class ChartCommonLineController extends ChartsBaseDesignController<VChart, T> {

    // 创建图表组件
    async create(container: HTMLElement, config: T): Promise<void> {
        config!['data']['values'] = config!['data']!['staticData']
        super.commonCreate(container, VChart, config);
    }

    // 销毁组件
    destroy(): void {
        this.instance!.release();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }
    // 获取图表配置内容
    getConfig(): T | null {
        return this.config;
    }
    // 更新图表配置
    update(config: T, upOp?: UpdateOptions): void {
        super.commonUpdate(config, VChart, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {
        
    }
}