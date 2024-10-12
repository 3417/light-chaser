// vcharts base design controller


import AbstractDesignerController from '../../framework/core/AbstractDesignerController';
import { UpdateOptions } from '../../framework/core/AbstractController';
import { ComponentBaseProps } from '../common-component/CommonTypes.ts';
import ObjectUtil from '../../utils/ObjectUtil';
import VChart from '@visactor/vchart';
import BPExecutor from '../../designer/blueprint/core/BPExecutor';


export abstract class ChartsBaseDesignController extends AbstractDesignerController {

    protected interval: NodeJS.Timeout | null;
    protected lastReqState: boolean = true;
    protected reConnect: boolean = false;

    changeData(data: any): void {
        this.instance?.changeData(data);
        console.log("获取data的值:", data);
        // 执行后续的操作
    }

    registerEvent(): void {
        const nodeId = this.config?.base?.id ?? "";
        // 注册相关事件
        console.log("获取实例->vcharts组件的实例：", this.instance)

        return;
        this.instance?.on('click', () => {
            BPExecutor.triggerComponentEvent(nodeId!, "globalClick", this.config)
        });
    }

    // 注册vCharts图表
    public commonCreate(container: HTMLElement, Clazz: new (...arg: any[]) => IArguments, config: C): void {
        this.config = config;
        this.container = container;
        this.instance = new Clazz(this.config?.style ?? {} as C, { dom: container });
        this.instance?.renderSync();
        this.registerEvent();
    }

    // 更新组件配置
    public commonUpdate(config: C, Clazz: new (...arg: any[]) => IArguments, upOp?: UpdateOptions): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOn = upOn || { reRender: true };
        if (upOn.reRender) this.instance?.update(this.config?.style ?? {});
    }
}