import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition.ts";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType.ts";
import baseTextImg from './base-button.png';
import {BaseButtonController} from "./BaseButtonController.ts";
import {BaseTextComponentProps} from "./BaseButtonComponent.tsx";
import {BaseButtonStyleConfig} from "./BaseButtonConfig.tsx";
import React from "react";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo.tsx"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig.tsx"));
const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig.tsx"));
const FilterConfig = React.lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig.tsx"));


export default class BaseButtonDefinition extends AbstractDesignerDefinition<BaseButtonController, BaseTextComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础按钮",
            compKey: "BaseButton",
            categorize: "other",
            width:96,
            height:35
        };
    }

    getChartImg(): string | null {
        return baseTextImg;
    }

    getController(): ClazzTemplate<BaseButtonController> | null {
        return BaseButtonController;
    }

    getInitConfig(): BaseTextComponentProps {
        return {
            base: {
                id: "",
                name: '基础按钮',
                type: 'BaseButton',
            },
            style: {
                color: '#a7a7a7',
                fontSize: 16,
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                letterSpacing: 0,
                ghost:false,
                buttonColor:'default',
                variant:'solid'
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
                staticData: "基础按钮"
            },
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((item: MenuInfo) => item.key !== 'theme');
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            style: BaseButtonStyleConfig,
            animation: AnimationConfig,
            data: DataConfig,
            theme: ThemeConfig,
            filter: FilterConfig
        };
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