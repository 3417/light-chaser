import React, {Component} from 'react';
import {Liquid} from "@ant-design/charts";
import './index.less';
import EditTools from "../../../edit-tool";

/**
 * 基础柱状图
 */
export default class AntdLiquid extends Component<any, any> {

    render() {
        //todo name属性为演示获取demo数据使用，后续要去掉
        const {dataXDesigner, elemId, name} = this.props;
        const {chartConfigMap} = dataXDesigner;
        const config = chartConfigMap?.get(elemId);
        const {chartProperties, elemBasePeoperties} = config;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...elemBasePeoperties}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Liquid className={'grid-chart-item'} {...chartProperties}/>
            </div>
        );
    }
}
