import {
    ChangeEvent,
    Component,
    CSSProperties,
    ForwardedRef,
    forwardRef,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
import { ComponentBaseProps } from "../../common-component/CommonTypes.ts";
import './BaseButtonComponent.less';
import layerManager from "../../../designer/manager/LayerManager.ts";
import layerListStore from "../../../designer/left/layer-list/LayerListStore.ts";
import { Button } from "antd";
export interface BaseButtonComponentStyle {
    color?: string;
    fontSize?: number;
    fontWeight?: number;
    fontFamily?: string;
    alignItems?: string;
    justifyContent?: string;
    letterSpacing?: number;
    lineHeight?: number;
}

export interface BaseButtonComponentProps extends ComponentBaseProps {
    style?: BaseButtonComponentStyle;
}

export interface BaseButtonComponentRef {
    updateConfig: (newConfig: BaseButtonComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

export const BaseButtonComponent = forwardRef((props: BaseButtonComponentProps, ref: ForwardedRef<BaseButtonComponentRef>) => {
    const [config, setConfig] = useState<BaseButtonComponentProps>({ ...props });
    const { style, data } = config;

    console.log("asdasdasd",style)
    const [edit, setEdit] = useState(false);
    // eslint-disable-next-line @typescript-eslint/ban-types
    const eventHandlerMap = useRef<Record<string, Function>>({});
    const textRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({ ...newConfig }),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));

    const onClick = () => {
        if ('click' in eventHandlerMap.current)
            eventHandlerMap.current['click']();
    }

    /**
     * 只在编辑模式下有效
     * @param e
     */
    const changeContent = (e: ChangeEvent<HTMLInputElement>) => {
        data!.staticData = e.target.value;
        layerManager.layerConfigs[config.base?.id!].name = e.target.value;
        const { layerInstances } = layerListStore;
        const layerInstance = layerInstances[config.base?.id!];
        layerInstance && (layerInstance as Component).setState({ name: e.target.value });
    }

    return (
        <Button color={style?.buttonColor}  variant={style?.variant} onDoubleClick={() => setEdit(true)}
            ref={textRef}
            className={'base-text-component'}
            style={{ ...style,width:'100%',height:'100%' }}
            onKeyDown={(e) => e.stopPropagation()}
            onClick={onClick}>
            {edit ? <input
                ref={(ref) => ref?.select()}
                onChange={changeContent}
                onBlur={() => setEdit(false)}
                autoFocus={true}
                type={'text'}
                defaultValue={data?.staticData} /> : data?.staticData}
        </Button>
    );
});

export default BaseButtonComponent;