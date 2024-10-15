import React from 'react';
import ChartCommonLineController from "./ChartCommonLineController.ts";
import AntdCommonUtil from "../../antd-common/AntdCommonUtil.ts";
import {Control} from "../../../json-schema/SchemaTypes.ts";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI.tsx";
import {ConfigType} from "../../../designer/right/ConfigContent.tsx";
import {ChartsBaseDesignController} from "../ChartsBaseDesignController.ts";

export function AntdLineCommonStyleConfig(props: ConfigType<ChartCommonLineController>) {
    const {controller} = props;
    const config = controller.getConfig();
    return (
        <>
            <ChartLineCommonGraphics controller={controller}/>
        </>
    );
}

export const ChartLineCommonFieldMapping: React.FC<ConfigType<ChartsBaseDesignController>> = ({controller}) => {
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const config = controller.getConfig();
    const schema: Control = {
        type: 'grid',
        key: 'style',
        children: [
            {
                type: 'select',
                label: 'X字段',
                key: 'xField',
                value: config?.xField,
                config: {
                    options,
                }
            },
            {
                type: 'select',
                label: 'Y字段',
                key: 'yField',
                value: config?.yField,
                config: {
                    options,
                }
            },
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        controller.update(fieldChangeData.dataFragment);
    }

    return <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
}

export function ChartLineCommonGraphics(props: ConfigType<ChartCommonLineController>) {
    const {controller} = props;
    const config = controller.getConfig();
    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        console.log("获取修改的数据：",dataFragment,fieldChangeData)
        controller.update(dataFragment);
    }
    // 定义配置的schema数据
    const schema: Control = {
        type: 'accordion',
        label: '图形',
        key: 'style',
        config: {bodyStyle: {marginTop: 10}},
        children: [
            {
                type: 'sub-accordion',
                label: '线条',
                key:'line',
                children: [
                    {
                        type: 'grid',
                        key: 'style',
                        children: [
                            {
                                key: 'curveType',
                                type: 'select',
                                label: '平滑',
                                tip: '对阶梯图无效',
                                value: config?.line?.style?.curveType,
                                config:{
                                    options: [
                                        {label: 'basis', value: 'basis'},
                                        {label: 'linear', value: 'linear'},
                                        {label: 'monotone', value: 'monotone'},
                                        {label: 'monotoneX', value: 'monotoneX'},
                                        {label: 'monotoneY', value: 'monotoneY'},
                                        {label: 'step', value: 'step'},
                                        {label: 'stepAfter', value: 'stepAfter'},
                                        {label: 'stepBefore', value: 'stepBefore'},
                                        {label: 'linearClosed', value: 'linearClosed'},
                                        {label: 'catmullRom', value: 'catmullRom'},
                                        {label: 'catmullRomClosed', value: 'catmullRomClosed'}
                                    ]
                                }
                            },
                            {
                                children: [
                                    {
                                        key: 'lineWidth',
                                        type: 'number-input',
                                        label: '宽度',
                                        value: config?.line?.style?.lineWidth,
                                        config: {
                                            min: 0,
                                            max: 10,
                                        }
                                    }
                                ]
                            },
                            {
                                key:'stroke',
                                type: 'color-picker',
                                label: '颜色',
                                value: config?.line.style?.stroke,
                                config: {
                                    showText: true
                                }
                            }
                        ]
                    }
                ]
            },
            {
                type: 'sub-accordion',
                label: '数据点',
                key:'point',
                children: [
                    {
                        key: 'style',
                        type: 'grid',
                        children: [
                            {
                                key: 'size',
                                type: 'number-input',
                                label: '尺寸',
                                value: config?.point?.style?.size,
                                config: {
                                    min: 0,
                                    max: 10,
                                }
                            },
                            {
                                key: 'fill',
                                type: 'color-picker',
                                label: '颜色',
                                value: config?.point?.style?.fill,
                                config: {
                                    showText: true
                                }
                            },
                            {
                                key: 'symbolType',
                                type: 'select',
                                label: '形状',
                                value: config?.point?.style?.symbolType,
                                config: {
                                    options: [
                                        {value: 'circle', label: 'circle'},
                                        {value: 'cross', label: 'cross'},
                                        {value: 'diamond', label: 'diamond'},
                                        {value: 'square', label: 'square'},
                                        {value: 'arrow', label: 'arrow'},
                                        {value: 'arrow2Left', label: 'arrow2Left'},
                                        {value: 'arrow2Right', label: 'arrow2Right'},
                                        {value: 'wedge', label: 'wedge'},
                                        {value: 'thinTriangle', label: 'thinTriangle'},
                                        {value: 'triangle', label: 'triangle'},
                                        {value: 'triangleUp', label: 'triangleUp'},
                                        {value: 'triangleDown', label: 'triangleDown'},
                                        {value: 'triangleRight', label: 'triangleRight'},
                                        {value: 'triangleLeft', label: 'triangleLeft'},
                                        {value: 'stroke', label: 'stroke'},
                                        {value: 'star', label: 'star'},
                                        {value: 'wye', label: 'wye'},
                                        {value: 'rect', label: 'rect'},
                                        {value: 'arrowLeft', label: 'arrowLeft'},
                                        {value: 'arrowRight', label: 'arrowRight'},
                                        {value: 'rectRound', label: 'rectRound'},
                                        {value: 'roundLine', label: 'roundLine'},
                                    ]
                                }
                            },
                        ]
                    }
                ]
            },
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}
