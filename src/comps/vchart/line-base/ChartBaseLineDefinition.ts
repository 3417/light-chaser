import baseLineImg from "./base-line.png";
import AbstractLineDefinition from "../../vchart-common/line/AbstractLineDefinition";
import { AntdLineProps } from "../../vchart-common/line/ChartCommonLineController";
import { BaseInfoType } from "../../../framework/core/AbstractDefinition";


class AntdBaseLineDefinition extends AbstractLineDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Chart基础折线图展示",
            compKey: "ChartBaseLine",
            categorize: "vChart",
            subCategorize: "vline",
        };
    }

    getChartImg(): string {
        return baseLineImg;
    }

    getInitConfig() {
        const values = [
            { "time": "2:00", "value": 8 },
            { "time": "4:00", "value": 9 },
            { "time": "6:00", "value": 12 },
            { "time": "8:00", "value": 13 },
            { "time": "10:00", "value": 15 },
            { "time": "12:00", "value": 18 },
            { "time": "14:00", "value": 20 }];
        return {
            base: {
                id: "",
                name: 'Charts基础折线图',
                type: 'ChartBaseLine',
            },
            background: 'transparent',
            type: 'line',
            xField: 'time',
            yField: 'value',
            axes: [
                {
                    orient: 'left',
                    grid: {
                        visible: false,
                        style: {
                            stroke: "black",
                            lineDash: [5, 5]
                        }
                    }
                }
            ],
            data: {
                id: 'line',
                sourceType: 'static',
                staticData: values
            },
            line: {
                style: {
                    curveType: 'basic',
                    lineWidth: 2,
                    stroke: "#00d7ff"
                }
            },
            point: {
                style: {
                    size: 2,
                    fill: '',
                    symbolType: 'circle'
                }
            }
        };
    }
}

export default AntdBaseLineDefinition;
