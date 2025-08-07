import { BlockType, Extension } from "@framework/structs";

export default class Apple extends Extension {
    id: string = "apple";
    displayName: string = "苹果密度计算器";
    description: string = "输入苹果的重量和体积，计算并返回密度";
    disableBlockInjection: boolean = true;

    @BlockType.Reporter("计算苹果的密度[weight:number=100] [volume:number=50]")
    calculateDensity({ weight, volume }: { weight: number, volume: number }) {
        if (volume <= 0) {
            throw new Error("体积必须大于0");
        }
        return weight / volume;
    }
};