import React, { Component } from 'react';
import { FieldChangeData, LCGUI } from "../../../json-schema/LCGUI.tsx";
import { Control } from "../../../json-schema/SchemaTypes.ts";
import { BaseButtonController } from "./BaseButtonController.ts";
import { ConfigType } from "../../../designer/right/ConfigContent.tsx";
import {
    AlignBottomTwo,
    AlignHorizontalCenterTwo,
    AlignLeftTwo,
    AlignRightTwo,
    AlignTopTwo,
    AlignVerticalCenterTwo
} from "@icon-park/react";
import layerListStore from "../../../designer/left/layer-list/LayerListStore.ts";
import layerManager from "../../../designer/manager/LayerManager.ts";

export const BaseButtonStyleConfig: React.FC<ConfigType<BaseButtonController>> = ({ controller }) => {

    const { data, style, base } = controller.getConfig()!;

    const changeContent = (data: string) => {
        controller.update({ data: { staticData: data } });
        layerManager.layerConfigs[base?.id ?? ''].name = data;
        const { layerInstances } = layerListStore;
        const layerInstance = layerInstances[base?.id ?? ''];
        layerInstance && (layerInstance as Component).setState({ name: data });
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const { dataFragment, id, data } = fieldChangeData;
        if (id === 'baseTextContent')
            changeContent(data as string)
        else
            controller.update(dataFragment!);
    }

    const schema: Control = {
        type: 'grid',
        children: [
            {
                key: 'data',
                children: [
                    {
                        id: 'baseTextContent',
                        key: 'staticData',
                        type: 'text-area',
                        label: '内容',
                        value: data?.staticData,
                    },
                ]
            },
            {
                key: 'style',
                children: [
                    {
                        key: 'fontSize',
                        type: 'number-input',
                        label: '字号',
                        value: style?.fontSize,
                        config: { min: 1 }
                    },
                    {
                        key: 'fontWeight',
                        type: 'number-input',
                        label: '加粗',
                        value: style?.fontWeight || 400,
                        config: {
                            min: 100,
                            max: 900,
                            step: 100
                        }
                    },
                    {
                        key: 'color',
                        type: 'color-picker',
                        label: '颜色',
                        value: style?.color,
                        config: {
                            showText: true,
                        }
                    },
                    {
                        key: 'fontFamily',
                        type: 'select',
                        label: '字体',
                        value: style?.fontFamily,
                        config: {
                            options: [
                                { label: '钉钉进步体', value: 'DingTalk JinBuTi' },
                                { label: '抖音美好体', value: 'DouyinSansBold' },
                                { label: '优设标题黑', value: '优设标题黑' },
                                { label: '庞门正道标题', value: '庞门正道标题体免费版' },
                            ],
                        }
                    },
                    {
                        key: 'letterSpacing',
                        type: 'number-input',
                        label: '字距',
                        value: style?.letterSpacing,
                        config: {
                            min: 0,
                            max: 10,
                            step: 1
                        }
                    },
                    {
                        key: 'lineHeight',
                        type: 'number-input',
                        label: '行距',
                        value: style?.lineHeight,
                        config: {
                            min: 0,
                            max: 10,
                            step: 0.1
                        }
                    },
                    {
                        label: "水平对齐",
                        type: 'group-button',
                        key: 'justifyContent',
                        value: style?.justifyContent,
                        config: {
                            items: [
                                {
                                    value: 'flex-start',
                                    content: <AlignLeftTwo theme="filled" size="16"
                                        strokeWidth={2}
                                        strokeLinecap="square" />
                                },
                                {
                                    value: 'center',
                                    content: <AlignHorizontalCenterTwo theme="filled" size="16"
                                        strokeWidth={2} strokeLinecap="square" />
                                },
                                {
                                    value: 'flex-end',
                                    content: <AlignRightTwo theme="filled" size="16"
                                        strokeWidth={2}
                                        strokeLinecap="square" />
                                }
                            ]
                        }
                    },
                    {
                        label: '垂直对齐',
                        type: 'group-button',
                        key: 'alignItems',
                        value: style?.alignItems,
                        config: {
                            items: [
                                {
                                    value: 'flex-start',
                                    content: <AlignTopTwo theme="filled" size="16"
                                        strokeWidth={2}
                                        strokeLinecap="square" />
                                },
                                {
                                    value: 'center',
                                    content: <AlignVerticalCenterTwo theme="filled" size="16"
                                        strokeWidth={2} strokeLinecap="square" />
                                },
                                {
                                    value: 'flex-end',
                                    content: <AlignBottomTwo theme="filled" size="16"
                                        strokeWidth={2}
                                        strokeLinecap="square" />
                                }
                            ]
                        }
                    },
                    {
                        key: 'ghost',
                        type: 'switch',
                        label: '背景透明',
                        value: style?.ghost
                    },
                    {
                        key: 'buttonColor',
                        type: 'select',
                        label: '按钮颜色',
                        value: style?.buttonColor,
                        config: {
                            options: [
                                { label: 'default', value: 'default' },
                                { label: 'primary', value: 'primary' },
                                { label: 'danger', value: 'danger' },
                            ]
                        }
                    },
                    {
                        key: 'variant',
                        type: 'select',
                        label: '按钮变体',
                        value: style?.variant,
                        config: {
                            options: [
                                { label: 'outlined', value: 'outlined' },
                                { label: 'solid', value: 'solid' },
                                { label: 'dashed', value: 'dashed' },
                                { label: 'link', value: 'link' },
                                { label: 'text', value: 'text' },
                                { label: 'filled', value: 'filled' }
                            ]
                        }
                    }
                ]
            },

        ]
    }

    return (
        <div style={{ padding: 10 }}><LCGUI schema={schema} onFieldChange={onFieldChange} /></div>
    )
}
