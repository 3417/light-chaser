import React from "react";
import {MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import AntdCommonLineController, {AntdLineProps} from "./ChartCommonLineController.ts";
import {ChartsCommonDefinition} from "../ChartsCommonDefinition.ts";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdLineCommonStyleConfig = React.lazy(() => import("./ChartLineCommonConfig.tsx").then((module) => ({default: module.AntdLineCommonStyleConfig})));
const ChartLineCommonFieldMapping = React.lazy(() => import("./ChartLineCommonConfig.tsx").then((module) => ({default: module.ChartLineCommonFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


abstract class AbstractLineDefinition extends ChartsCommonDefinition<AntdCommonLineController, AntdLineProps> {

    getController(): ClazzTemplate<AntdCommonLineController> | null {
        return AntdCommonLineController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList().filter((item: MenuInfo) => item.key !== 'theme');
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdLineCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: ChartLineCommonFieldMapping
        };
    }
}

export default AbstractLineDefinition;
