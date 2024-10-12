import React, { ForwardedRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ComponentBaseProps } from "../../common-component/CommonTypes.ts";
import { Carousel } from "antd";
import './LineComponent.less';
import defaultData from './base-area.png';
import { VChart } from '@visactor/react-vchart';


export interface lineComponentRef {
    updateConfig: (newConfig: CarouselComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) =>void;

}

const CarouselComponent = React.forwardRef((props, ref: ForwardedRef) => {
    const [config, setConfig] = useState<CarouselComponentProps>({ ...props });
    const eventHandlerMap = useRef<Record<string, Function>>({});
    console.log("获取配置文件:", config)

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({ ...newConfig }),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));
    const chartRef = useRef(null);
    const getData = () =>
        ['2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map(time => ({
            time,
            value: Math.random() * 10
        }));

    const getSpec = () => ({
        type: 'line',
        data: {
            values: getData()
        },
        xField: 'time',
        yField: 'value'
    });

    const [spec, setSpec] = useState(getSpec());
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <VChart ref={chartRef} spec={spec} />
        </div>
    );
});

export default CarouselComponent;