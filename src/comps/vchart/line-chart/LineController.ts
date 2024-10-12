import {ThemeItemType} from "../../../designer/DesignerType.ts";
import {UpdateOptions} from "../../../framework/core/AbstractController.ts";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController.ts";
import ComponentUtil from "../../../utils/ComponentUtil.ts";
import CarouselComponent from "./LineComponent.tsx";
import ObjectUtil from "../../../utils/ObjectUtil.ts";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor.ts";

export class CarouselController extends AbstractDesignerController {

    async create(container: HTMLElement, config): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<CarouselComponentRef>(container, CarouselComponent, config);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig() {
        return this.config;
    }


    changeData(data: string[]) {
        this.config!.data!.staticData = data;
        this.instance?.updateConfig(this.config!);
    }

    update(config, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.updateConfig(this.config!);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }


    registerEvent() {
        const nodeId = this.config?.base?.id!;
        this.instance?.setEventHandler({
            click: () => BPExecutor.triggerComponentEvent(nodeId!, "click", this.config),
        })
    }
}