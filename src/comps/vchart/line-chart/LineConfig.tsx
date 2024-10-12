import React from 'react';
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI.tsx";
import {Control} from "../../../json-schema/SchemaTypes.ts";
import {CarouselController} from "./LineController.ts";
import {ConfigType} from "../../../designer/right/ConfigContent.tsx";

export const CarouselConfig: React.FC<ConfigType<CarouselController>> = ({controller}) => {

    const config = controller.getConfig()?.style ?? {};

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        key: 'style',
        type: 'grid',
        children: [
            {
                type:'color-picker',
                key:'background',
                label:'背景色',
                value:config.background
            },
            {
                type: 'switch',
                key: 'autoplay',
                label: '自动播放',
                value: config.autoplay,
            },
            {
                type: 'number-input',
                key: 'autoplaySpeed',
                label: '播放速度',
                value: config.autoplaySpeed,
            },
            {
                type: 'switch',
                key: 'dots',
                label: '显示按钮',
                value: config.dots,
            },
            {
                type: 'switch',
                key: 'fade',
                label: '淡入淡出',
                value: config.fade,
            },
            {
                type: 'number-input',
                key: 'speed',
                label: '动效速度',
                value: config.speed,
            },
        ]
    }


    return (
        <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
    )
}

