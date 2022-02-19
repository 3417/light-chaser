import React, {Component} from 'react';
import {Line} from "@ant-design/charts";
import './index.less';
import EditTools from "../../../edit-tool";
import {cloneDeep} from "lodash";

/**
 * 基础柱状图
 */
export default class AntdLine extends Component<any, any> {

    state = {
        data: []
    }

    constructor(props: any) {
        super(props);
        fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
            .then((response) => response.json())
            .then((json) => this.setState({data: json}))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    }


    render() {
        //todo name属性为演示获取demo数据使用，后续要去掉
        const {dataXDesigner, elemId, name} = this.props;
        const {chartConfigMap} = dataXDesigner;
        const config = chartConfigMap?.get(elemId);
        const {chartProperties, elemBasePeoperties} = config;
        chartProperties.data = this.state.data;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...elemBasePeoperties}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Line className={'grid-chart-item'} {...chartProperties}/>
            </div>
        );
    }
}
