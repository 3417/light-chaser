// vcharts base design controller


import AbstractDesignerController from '../../framework/core/AbstractDesignerController';
import { UpdateOptions } from '../../framework/core/AbstractController';
import { ComponentBaseProps } from '../common-component/CommonTypes.ts';
import ObjectUtil from '../../utils/ObjectUtil';
import VChart from '@visactor/vchart';
import BPExecutor from '../../designer/blueprint/core/BPExecutor';


export abstract class ChartsBaseDesignController<I,C> extends AbstractDesignerController<I,C> {

    protected interval: NodeJS.Timeout | null;
    protected lastReqState: boolean = true;
    protected reConnect: boolean = false;

    changeData(data: any): void {
        // vCharts图表系列更新
        this.instance?.updateData(this.config?.data?.id, data);
        this.config!['data']!['staticData'] = data;
    }

    registerEvent(): void {
        const nodeId = this.config?.base?.id ?? "";
        console.log("获取实例->vcharts组件的实例：", this.instance)
        // TODO:注册相关事件-折现图相关事件
        return;
        this.instance?.on('click', () => {
            BPExecutor.triggerComponentEvent(nodeId!, "globalClick", this.config)
        });
    }

    // 注册vCharts图表
    public commonCreate(container: HTMLElement, Clazz: new (...arg: any[]) => IArguments, config: C): void {
        this.config = config;
        this.container = container;
        this.instance = new Clazz(this.config ?? {} as C, { dom: container });
        this.instance?.renderSync();
        this.registerEvent();
    }

    // 更新组件配置
    public commonUpdate(config: C, Clazz: new (...arg: any[]) => IArguments, upOp?: UpdateOptions): void {
        this.config = ObjectUtil.merge(this.config, config!.style);
        console.log("最后最后所有的数据更新都是走的这...",this.config,config);
        this.config!['data']!['values'] = this.config!['data']!['staticData'];
        upOp = upOp || { reRender: true };
        if (upOp.reRender) {
            this.instance?.updateSpec(this.config ?? {},true);
            this.instance.renderSync();
        }
    }
}