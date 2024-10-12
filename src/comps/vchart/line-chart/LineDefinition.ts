import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition.ts";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType.ts";
import carouselImg from './base-area.png';
import {CarouselController} from "./LineController.ts";
import {CarouselComponentProps} from "./LineComponent.tsx";
import {CarouselConfig} from "./LineConfig.tsx";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

export default class CarouselDefinition extends AbstractDesignerDefinition<CarouselController, CarouselComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "vCharts折线图",
            compKey: "vChartsLine",
            categorize: "map",
        };
    }

    getChartImg(): string | null {
        return carouselImg;
    }

    getController(): ClazzTemplate<CarouselController> | null {
        return CarouselController;
    }

    getInitConfig(): CarouselComponentProps {
        return {
            base: {
                id: "",
                name: '轮播图',
                type: 'carousel',
            },
            style: {
                autoplay: true,
                autoplaySpeed: 3000,
                dots: true,
                fade: false,
                speed: 500,
            },
            filter: {
                enable: false,
                blur: 0,
                brightness: 1,
                contrast: 1,
                opacity: 1,
                saturate: 1,
                hueRotate: 0
            },
            data: {
                sourceType: 'static',
                staticData: [carouselImg, carouselImg]
            }
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((item: MenuInfo) => (item.key !== 'theme'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        const menuMapping = super.getMenuToConfigContentMap();
        menuMapping['style'] = CarouselConfig;
        return menuMapping;
    }


    getEventList(): EventInfo[] {
        return [
            ...super.getEventList(),
            {
                id: "click",
                name: "点击时",
            }
        ]
    }
}