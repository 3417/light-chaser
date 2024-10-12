import baseLineImg from "./base-line.png";
import AbstractLineDefinition from "../../antd-common/line/AbstractLineDefinition";
import {AntdLineProps} from "../../antd-common/line/AntdCommonLineController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";


class AntdBaseLineDefinition extends AbstractLineDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Chart基础折线图1111",
            compKey: "ChartBaseLine",
            categorize: "chart",
            subCategorize: "line",
        };
    }

    getChartImg(): string {
        return baseLineImg;
    }

    getInitConfig(): AntdLineProps {
        const values = [
            {"time": "2:00", "value": 8},
            {"name": "4:00", "value": 9},
            {"name": "6:00", "value": 12},
            {"name": "8:00", "value": 13},
            {"name": "10:00", "value": 15},
            {"name": "12:00", "value": 18},
            {"name": "14:00", "value": 20}];
        return {
            base: {
                id: "",
                name: '基础折线图',
                type: 'ChartBaseLine',
            },
            style: {
                data: {values},
                xField: "time",
                yField: "value",
                background:'transparent',
                smooth: false,
                color: "#00d7ff",
                point: {
                    style: {
                        size:4,
                        lineWidth: 0,
                        stroke: "#00d7ff"
                    }
                },
                lineStyle: {
                    lineWidth: 2,
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#969696ff",
                            fontSize: 10,
                        },
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#b1b1b1ff",
                            fontSize: 9,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#9e9e9e7d",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
                    title: null,
                },
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000,
                    },
                },

            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }
}

export default AntdBaseLineDefinition;
